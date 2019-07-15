const path = require('path');
const fs = require('fs');

/**
 * Find all files inside a dir, recursively.
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    if (isDirectory) {
      return [...files, ...getAllFiles(name)];
    } else {
      return /^_/.test(file) || !/\.js$/.test(file)
        ? [...files]
        : [...files, name];
    }
  }, []);

module.exports = getAllFiles;
