const sharp = require('sharp');
const colorString = require('color-string');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'tint',
  arguments: 1,
  usage: 'tint color',
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

      // Try to tint the image
      let result;
      try {
        if (colorString.get(color) === null) {
          result = await sharp(bodyBuffer).toBuffer({
            resolveWithObject: true,
          });
        } else {
          result = await sharp(bodyBuffer)
            .tint(color)
            .toBuffer({ resolveWithObject: true });
        }
      } catch {
        log.error(
          '[Imager/Tint] Failed to process image. ' + typeof input === 'string'
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
