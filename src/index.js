/* Node */
const path = require('path');
const fs = require('fs');

/* Discord */
const Discord = require('discord.js');
const client = new Discord.Client();
const DiscordJSCommand = require('discordjs-command');
const { commandConfig } = require('./config');

/* Image Processing */
const Imager = require('./image_processing');

/* Util */
const moment = require('moment');
const { log } = require('./config');

client.on('ready', () => {
  log.info(`[Discord] Logged in as ${client.user.tag}!`);
});

// Mention Catcher
Imager(client);

// Debugging
client.on('message', msg => {
  if (msg.channel.id === '599309497911083176') {
    log.info(
      `[Console][${moment().format('HH:mm:ss')}] ${
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
commandSystem.ListenForCommands(commands => {
  log.info('[Discord] ' + commands.size + ' commands loaded.');
  log.info(
    `[Discord] DiscordCommand loaded. Prefix: [${commandConfig.prefix}]`
  );
});

// Start Imager
if (process.env.NODE_END === 'production') {
  client.login(process.env.TOKEN);
} else {
  try {
    client.login(require('./TOKEN.json').TOKEN); // eslint-disable-line node/no-unpublished-require
  } catch (err) {
    log.getLogger('critical').error('TOKEN.json not found!');
    fs.writeFileSync('./TOKEN.json', '{\n  "TOKEN": "TOKEN_GOES_HERE"\n}', { encoding: 'utf8' });
    throw new Error('TOKEN.json not found! Can\'t start discord bot.');
  }
}
