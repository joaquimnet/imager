import Joi from "@hapi/joi";

import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "rotate",
  arguments: 1,
  usage: "rotate degrees",
  exec: (input: Buffer | string, tags: ITag[], degreesInput: string) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Validating the input
      const validation = Joi.number()
        .required()
        .min(-1000)
        .max(1000)
        .validate(degreesInput);

      if (validation.error !== null) {
        reject(
          Util.buildValidationErrorObject("rotate", "degrees", validation.error),
        );
        return;
      }

      // Arguments for sharp().rotate()
      const args = [validation.value, { background: "rgba(0,0,0,0)" }];

      // Resolve exec with Buffer or reject
      processImage(input, "rotate", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Rotate", input, tags, [degreesInput], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
