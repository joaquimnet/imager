/* Node */
const path = require('path');

/* Log */
const { log } = require('../config');

/* Util */
const getAllFiles = require('../util/getAllFiles');

/* Image Operations */
const operations = new Map();
getAllFiles(path.join(__dirname, 'operations')).forEach(operationPath => {
  try {
    const op = require(operationPath);
    operations.set(op.name, op);
    log.trace('Loading', op.name);
  } catch (err) {
    log.error('Failed to import image operation: ' + operationPath);
    log.debug(err);
  }
});

log.info('[Imager] ' + operations.size + ' image operations loaded.');

module.exports = operations;
