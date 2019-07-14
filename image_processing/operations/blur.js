const sharp = require('sharp');

const { log } = require('../../config.js');
const resolveImageInput = require('../../util/resolveImageInput');

module.exports = {
  name: 'blur',
  arguments: 1,
  usage: 'blur [weak/medium/strong/extreme]',
  exec: (input, tags, strength) => {
    return new Promise(async (resolve, reject) => {
      let bodyBuffer;
      try {
        bodyBuffer = await resolveImageInput(input);
      } catch (err) {
        reject(err);
        return;
      }

      // Get blur strength
      const blurOptions = { weak: 0.9, medium: 2, strong: 5, extreme: 10 };
      const blurStrength = blurOptions[strength] || 0.9;

      // Try to blur the image
      let result;
      try {
        result = await sharp(bodyBuffer)
          .blur(blurStrength)
          .toBuffer({ resolveWithObject: true });
      } catch {
        log.error(
          '[Imager/Blur] Failed to process image. ' + typeof input === 'string'
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
