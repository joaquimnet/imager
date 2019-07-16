import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "sharpen",
  arguments: 0,
  usage: "sharpen",
  exec: (input: Buffer | string, tags: ITag[]) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Arguments for sharp().sharpen()
      const args: any = [1.2, 1, 1.5];

      // Resolve exec with Buffer or reject
      processImage(input, "sharpen", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Sharpen", input, tags, [], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
