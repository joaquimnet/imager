const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'rotate',
  arguments: 1,
  usage: 'rotate degrees',
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

      // Try to rotate the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .rotate(deg, { background: 'rgba(0,0,0,0)' })
          .toBuffer({ resolveWithObject: true });
      } catch {
        log.error(
          '[Imager/Rotate] Failed to process image. ' + typeof input ===
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
