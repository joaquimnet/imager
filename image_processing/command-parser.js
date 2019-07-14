const loop = require('../util/loop');

const validOperations = require('./operations');
const validTags = require('./tags');

module.exports = command => {
  const operations = [];
  const tags = [];
  // Split at spaces
  const argArray = command.split(/ +/);
  argArray.forEach((v, index) => {
    const potentialOperation = v.toLowerCase();
    // If this is a valid operation registered through operations.js
    if (validOperations.has(potentialOperation)) {
      const newOperation = { operation: potentialOperation, arguments: [] };
      // Gather necessary arguments
      loop(validOperations.get(potentialOperation)['arguments'], i => {
        newOperation.arguments.push(argArray[index + i + 1]);
      });
      operations.push(newOperation);
    }
    // If this is a valid tag name, push said tag to the tag array
    if (validTags.has(potentialOperation)) {
      tags.push({
        name: potentialOperation,
        info: validTags.get(potentialOperation),
      });
    }
  });
  return [operations, tags];
};
