/* Discord */
const Discord = require('discord.js');
const client = new Discord.Client();
const DiscordJSCommand = require('discordjs-command');
const { commandConfig } = require('./config');

/* Image Processing */
const grayscale = require('./image_processing/grayscale/grayscale');

/* Util */
const mentionsMe = require('./util/mentionsMe');
const isValidSharpInput = require('./util/isValidSharpInput');
const moment = require('moment');
const filesize = require('filesize');
const { log } = require('./config');
const path = require('path');

client.on('ready', () => {
  log.info(`Logged in as ${client.user.tag}!`);
});

// Mention Catcher
client.on('message', async msg => {
  if (mentionsMe(msg)) {
    msg.channel.send(['Hello there! :D']);
    if (msg.attachments.size < 1) return;
    for (const attachment of msg.attachments.values()) {
      if (isValidSharpInput(attachment.filename)) {
        msg.channel.send(
          "I'm going to proccess your image! >> " + attachment.filename
        );
        try {
          const result = await grayscale(attachment.url);
          const resultBuffer = result.data;
          msg.channel.send(
            [
              'Here is your image!',
              `Dimensions: ${result.info.width}x${result.info.height}`,
              `Size: ${filesize(result.info.size)}`,
            ],
            new Discord.Attachment(resultBuffer, attachment.filename)
          );
        } catch (err) {
          log.error(
            'AN ERROR OCCURRED WHILE TRYING TO PROCCESS AN IMAGE!',
            err
          );
          msg.channel.send("I'm sorry, I couldn't process that image. :(");
        }
      }
    }
  }
});

// Debugging
client.on('message', msg => {
  if (msg.channel.id === '599309497911083176') {
    log.info(
      `[${moment().format('HH:mm:ss')}] ${
        msg.author.username
      }: ${msg.content.replace(/\n/g, '\n           ')}`
    );
  }
});

// Command System
const commandSystem = new DiscordJSCommand(
  client,
  commandConfig,
  path.join(__dirname, 'commands')
);
commandSystem.ListenForCommands();

// Start Imager
client.login(process.env.TOKEN);
