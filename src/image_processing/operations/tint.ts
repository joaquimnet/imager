import Joi from "@hapi/joi";
import colorString from "color-string";

import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "tint",
  arguments: 1,
  usage: "tint color",
  exec: (input: Buffer | string, tags: ITag[], colorInput: string) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Validating the input
      const validation = Joi.object()
        .required()
        .validate(colorString.get(colorInput));

      if (validation.error !== null) {
        reject(
          Util.buildValidationErrorObject("tint", "color", validation.error),
        );
        return;
      }

      // Arguments for sharp().tint() ~~ validation passed, this will get parsed by sharp
      const args = [colorInput];

      // Resolve exec with Buffer or reject
      processImage(input, "tint", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Tint", input, tags, [colorInput], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
