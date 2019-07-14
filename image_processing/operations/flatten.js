const sharp = require('sharp');
const colorString = require('color-string');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'flatten',
  arguments: 1,
  usage: 'flatten color',
  exec: (input, tags, color) => {
    return new Promise(async (resolve, reject) => {
      // Resolve input
      let bodyBuffer;
      try {
        bodyBuffer = await resolveImageInput(input);
      } catch (err) {
        reject(err);
        return;
      }

      // Try to flatten the image
      let result;
      try {
        if (colorString.get(color) === null) {
          result = await sharp(bodyBuffer).toBuffer({
            resolveWithObject: true,
          });
        } else {
          result = await sharp(bodyBuffer)
            .flatten({ background: color })
            .toBuffer({ resolveWithObject: true });
        }
      } catch {
        log.error(
          '[Imager/Flatten] Failed to process image. ' + typeof input ===
            'string'
            ? '>> ' + input
            : null
        );
        reject('Failed to process image.');
        return;
      }

      // Resolve promise with {data: The image buffer, info: Info about the image}
      resolve(result);
    });
  },
};
