const request = require('request-promise-native');

module.exports = input => {
  return new Promise(async (resolve, reject) => {
    let bodyBuffer;
    if (typeof input === 'string') {
      // must be an url, right?
      // Try to fetch image
      try {
        bodyBuffer = await request({ url: input, encoding: null });
      } catch {
        reject('Failed to fetch image.');
        return;
      }
    } else if (Buffer.isBuffer(input)) {
      // must be a image buffer, right?
      bodyBuffer = input;
    } else {
      // invalid input
      reject('Invalid input');
      return;
    }
    // Resolve with buffer
    resolve(bodyBuffer);
  });
};
