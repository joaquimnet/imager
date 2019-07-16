import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "grayscale",
  arguments: 0,
  usage: "grayscale",
  exec: (input: Buffer | string, tags: ITag[]) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Arguments for sharp().grayscale()
      const args: any = [];

      // Resolve exec with Buffer or reject
      processImage(input, "grayscale", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Grayscale", input, tags, [], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
