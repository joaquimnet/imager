import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "flip",
  arguments: 0,
  usage: "flip",
  exec: (input: Buffer | string, tags: ITag[]) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Arguments for sharp().flip()
      const args: any = [];

      // Resolve exec with Buffer or reject
      processImage(input, "flip", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Flip", input, tags, [], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
