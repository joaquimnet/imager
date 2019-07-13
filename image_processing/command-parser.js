const loop = require('../util/loop');

const validOperations = require('./operations.list.js');

module.exports = command => {
  const operations = [];
  // Split at spaces
  const argArray = command.split(/ +/);
  argArray.forEach((v, index) => {
    const potentialOperation = v.toLowerCase();
    if (validOperations.has(potentialOperation)) {
      const newOperation = { operation: potentialOperation, arguments: [] };
      loop(validOperations.get(potentialOperation), i => {
        newOperation.arguments.push(argArray[index + i + 1]);
      });
      operations.push(newOperation);
    }
  });
  return operations;
};
