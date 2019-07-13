const { log } = require('../../config.js');

const sharp = require('sharp');
const request = require('request-promise-native');

/* grayscale.js assumes the input is a valid url with a sharp accepting extension */
module.exports = url => {
  return new Promise(async (resolve, reject) => {
    // Try to fetch image
    let bodyBuffer;
    try {
      bodyBuffer = await request({ url, encoding: null });
    } catch {
      reject('Failed to fetch image.');
      return;
    }

    // Try to grayscale the image
    let result;
    try {
      result = await sharp(bodyBuffer)
        .grayscale()
        .toBuffer({ resolveWithObject: true });
    } catch {
      log.error('Failed to process image. >> ' + url);
      reject('Failed to process image.');
      return;
    }

    // Resolve promise with {data: The image buffer, info: Info about the image}
    resolve(result);
  });
};
