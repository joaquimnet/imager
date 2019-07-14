const Discord = require('discord.js');

const { log, commandConfig } = require('../config');

const mentionsMe = require('../util/mentionsMe');
const hasValidAttachments = require('../util/hasValidAttachments');
const filesize = require('filesize');

const commandParser = require('./command-parser');

/* Image Operations */
const operations = require('./operations');

module.exports = client => {
  client.on('message', async msg => {
    if (mentionsMe(msg) && hasValidAttachments(msg)) {
      // Start typing
      msg.channel.startTyping();
      // DO PROCESSING
      const att = msg.attachments.first();
      const [operationsToPerform, tags] = commandParser(msg.content);
      if (operationsToPerform.length <= 0) {
        log.debug(
          '[Imager/Core] Received valid image but no commands.',
          `[${msg.author.username} / ${att.filename}]`
        );
        msg.channel.send(
          "You didn't specify any commands. Type `" +
            commandConfig.prefix +
            'image` to see the available commands.'
        );
        msg.channel.stopTyping(true);
        return;
      }
      try {
        // This reduce will resolve to {data: buffer, info: {width, height, size}}
        const result = await operationsToPerform.reduce(
          async (previousPromise, current, i, src) => {
            const operationInput = await previousPromise;

            const currentResult = await operations
              .get(current.operation)
              .exec(operationInput, tags, ...current.arguments);

            // If its the last iteration return buffer + info else return buffer
            return src.length - 1 === i ? currentResult : currentResult.data;
          },
          // Initial Value: the attachment url
          att.url
        );

        // Final image after all operations done
        const resultBuffer = result.data;
        const { width, height, size } = result.info;

        // Send it back to the user
        msg.channel.send(
          `**${att.filename} | ${width}x${height} | ${filesize(size)}**`,
          new Discord.Attachment(resultBuffer, att.filename)
        );
        msg.channel.stopTyping(true);
      } catch (err) {
        // An operation failed, cancelling.
        msg.channel.send("I'm sorry, I couldn't process that image. :(");
        msg.channel.stopTyping(true);
      }
    }
  });
};
