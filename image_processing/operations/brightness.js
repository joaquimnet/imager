const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'brightness',
  arguments: 1,
  usage: 'brightness multiplier',
  exec: (input, tags, degrees) => {
    const deg = isNaN(Number(degrees)) ? 1 : Number(degrees);
    return new Promise(async (resolve, reject) => {
      let bodyBuffer;
      try {
        bodyBuffer = await resolveImageInput(input);
      } catch (err) {
        reject(err);
        return;
      }

      // Try to brightness the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .modulate({ brightness: deg })
          .toBuffer({ resolveWithObject: true });
      } catch {
        log.error(
          '[Imager/Brightness] Failed to process image. ' + typeof input ===
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
