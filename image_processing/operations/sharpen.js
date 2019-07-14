const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'sharpen',
  arguments: 0,
  usage: 'sharpen',
  exec: input => {
    return new Promise(async (resolve, reject) => {
      let bodyBuffer;
      try {
        bodyBuffer = await resolveImageInput(input);
      } catch (err) {
        reject(err);
        return;
      }

      // Try to sharpen the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .sharpen(1.2, 1, 1.5)
          .toBuffer({ resolveWithObject: true });
      } catch {
        log.error(
          '[Imager/Sharpen] Failed to process image. ' + typeof input ===
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
