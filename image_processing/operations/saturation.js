const sharp = require('sharp');

// const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');
const logOperationError = require('../../util/logOperationError');

module.exports = {
  name: 'saturation',
  arguments: 1,
  usage: 'saturation multiplier',
  exec: (input, tags = [''], multiplier = 1) => {
    const deg = isNaN(Number(multiplier)) ? 1 : Number(multiplier);
    return new Promise(async (resolve, reject) => {
      let bodyBuffer;
      try {
        bodyBuffer = await resolveImageInput(input);
      } catch (err) {
        reject(err);
        return;
      }

      // Try to saturation the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .modulate({ saturation: deg })
          .toBuffer({ resolveWithObject: true });
      } catch (err) {
        logOperationError(this, input, tags, [multiplier], err);
        reject('Failed to process image.');
        return;
      }

      // Resolve promise with {data: The image buffer, info: Info about the image}
      resolve(result);
    });
  },
};
