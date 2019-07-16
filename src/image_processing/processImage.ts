import sharp from "sharp";

import { ISharpResult } from ".";
import Util from "../util/";

export function processImage(
  input: Buffer | string,
  sharpFunction: string,
  args: any[],
): Promise<ISharpResult> {
  return new Promise<ISharpResult>((resolve, reject) => {
    // Resolve the input
    Util.resolveImageInput(input)
      .then((bodyBuffer: Buffer) => {
        // Try to rotate the image
        return sharp(bodyBuffer)
          [sharpFunction](...args)
          .toBuffer({ resolveWithObject: true });
      })
      .then((result: { data: Buffer; info: sharp.OutputInfo }) => {
        resolve(result);
        return;
      });
  });
}
