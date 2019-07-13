const isValidSharpInput = require('./isValidSharpInput');

module.exports = msg => {
  if (msg.attachments.size < 1) return false;
  for (const attachment of msg.attachments.values()) {
    if (isValidSharpInput(attachment.filename)) {
      return true;
    }
  }
  return false;
};
