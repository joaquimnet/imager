const { log } = require('../config');

module.exports = (operation, input, tags, operationArguments, err) => {
  const prefix = `[Imager/${operation}]`;
  const tagsList = tags.reduce((acc, cur) => acc + cur.name, '');
  log.error(prefix + ' Operation failed!');
  log.error(
    `${prefix} Tags: [${tagsList}] | Arguments: [${operationArguments}]`
  );
  log.error(`${prefix} Input: `, input);
  log.error(prefix, err);
};
