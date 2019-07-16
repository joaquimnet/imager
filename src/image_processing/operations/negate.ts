import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "negate",
  arguments: 0,
  usage: "negate",
  exec: (input: Buffer | string, tags: ITag[]) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Arguments for sharp().negate()
      const args: any = [];

      // Resolve exec with Buffer or reject
      processImage(input, "negate", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Negate", input, tags, [], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
