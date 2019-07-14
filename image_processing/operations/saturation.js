const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'saturation',
  arguments: 1,
  usage: 'saturation multiplier',
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

      // Try to saturation the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .modulate({ saturation: deg })
          .toBuffer({ resolveWithObject: true });
      } catch {
        log.error(
          '[Imager/Saturation] Failed to process image. ' + typeof input ===
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
