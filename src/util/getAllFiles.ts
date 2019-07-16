import fs from "fs";
import path from "path";

/**
 * Find all files inside a dir, recursively.
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
export function getAllFiles(dir: string): string[] {
  return fs.readdirSync(dir).reduce<string[]>((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    if (isDirectory) {
      return [...files, ...getAllFiles(name)];
    } else {
      return /^_/.test(file) || !/\.(js|ts)$/.test(file)
        ? [...files]
        : [...files, name];
    }
  }, []);
}
