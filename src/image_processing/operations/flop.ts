import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "flop",
  arguments: 0,
  usage: "flop",
  exec: (input: Buffer | string, tags: ITag[]) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Arguments for sharp().flop()
      const args: any = [];

      // Resolve exec with Buffer or reject
      processImage(input, "flop", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Flop", input, tags, [], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
