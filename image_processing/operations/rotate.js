const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');
const logOperationError = require('../../util/logOperationError');

module.exports = {
  name: 'rotate',
  arguments: 1,
  usage: 'rotate degrees',
  exec: (input, tags = [''], degrees = 0) => {
    return new Promise((resolve, reject) => {
      // Validating the input
      let inputDegrees = Number(degrees);
      if (isNaN(inputDegrees)) {
        inputDegrees = 0;
      } else {
        inputDegrees = Math.floor(inputDegrees);
        if (inputDegrees > 1000 || inputDegrees < -1000) {
          inputDegrees = 0;
        }
      }

      // Resolve the input
      resolveImageInput(input)
        .then(bodyBuffer => {
          // Try to rotate the image
          return sharp(bodyBuffer)
            .rotate(inputDegrees, { background: 'rgba(0,0,0,0)' })
            .toBuffer({ resolveWithObject: true });
        })
        .then(result => {
          // Resolve promise with {data: The image buffer, info: Info about the image}
          return resolve(result);
        })
        .catch(err => {
          logOperationError('Rotate', input, tags, [degrees], err);
          reject(err);
          return;
        });
    });
  },
};
