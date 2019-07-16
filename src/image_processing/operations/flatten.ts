import Joi from "@hapi/joi";
import colorString from "color-string";

import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "flatten",
  arguments: 1,
  usage: "flatten color",
  exec: (input: Buffer | string, tags: ITag[], colorInput: string) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Validating the input
      const validation = Joi.object()
        .required()
        .validate(colorString.get(colorInput));

      if (validation.error !== null) {
        reject(
          Util.buildValidationErrorObject("flatten", "color", validation.error),
        );
        return;
      }

      // Arguments for sharp().flatten() ~~ validation passed, this will get parsed by sharp
      const args = [{ background: colorInput }];

      // Resolve exec with Buffer or reject
      processImage(input, "flatten", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError("Flatten", input, tags, [colorInput], err);
          reject(err);
          return;
        });
    });
  },
} as IOperation;
