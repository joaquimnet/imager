const mentionsMe = require('../util/mentionsMe');
const hasValidAttachments = require('../util/hasValidAttachments');

const commandParser = require('./command-parser');

module.exports = (msg) => {
  if (mentionsMe(msg) && hasValidAttachments(msg)) {
    // DO PROCESSING
    const operations = commandParser(msg.content);
  }
};