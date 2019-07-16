import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

const blurOptions = { weak: 0.9, medium: 2, strong: 5, extreme: 10 };

module.exports = {
  name: "blur",
  arguments: 1,
  usage: "blur [weak/medium/strong/extreme]",
  exec: (input: Buffer | string, tags: ITag[], strength: string) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Validating the input
      if (!["weak", "medium", "strong", "extreme"].includes(strength)) {
        strength = "medium";
      }

      // Arguments for sharp().blur()
      const args = [blurOptions[strength]];

      // Resolve exec with Buffer or reject
      processImage(input, "blur", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Rotate", input, tags, [strength], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
