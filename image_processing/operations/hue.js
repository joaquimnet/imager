const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'hue',
  arguments: 1,
  usage: 'hue degrees',
  exec: (input, tags, degrees) => {
    const deg = isNaN(Number(degrees)) ? 0 : Number(degrees);
    return new Promise(async (resolve, reject) => {
      let bodyBuffer;
      try {
        bodyBuffer = await resolveImageInput(input);
      } catch (err) {
        reject(err);
        return;
      }

      // Try to hue the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .modulate({ hue: deg })
          .toBuffer({ resolveWithObject: true });
      } catch {
        log.error(
          '[Imager/Hue] Failed to process image. ' + typeof input === 'string'
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
