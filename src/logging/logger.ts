import { bold, red, green, cyan, yellow } from 'nanocolors';

export class Logger {
  _: any;

  static log(...args: any[]): void {
    console.log(bold(green('[INFO]')), ...args);
  }

  static debug(...args: any[]): void {
    // if (process.env.NODE_ENV === 'development') {
    // }
    console.log(bold(cyan('[DEBUG]')), ...args);
  }

  static error(...args: any[]): void {
    console.log(bold(red('[ERROR]')), ...args);
  }

  static warn(...args: any[]): void {
    console.log(bold(yellow('[WARN]')), ...args);
  }
}
