import Joi from "@hapi/joi";

import Util from "../../util/";
import { ITag } from "../tags";

import { ISharpResult } from "..";
import { IOperation } from "../operations";
import { processImage } from "../processImage";

module.exports = {
  name: "saturation",
  arguments: 1,
  usage: "saturation multiplier",
  exec: (input: Buffer | string, tags: ITag[], multiplierInput: string) => {
    return new Promise<ISharpResult>((resolve, reject) => {
      // Validating the input
      const multiplier = Number(multiplierInput);
      const validation = Joi.number()
        .required()
        .min(0)
        .max(5)
        .validate(multiplier);

      if (validation.error !== null) {
        reject(
          Util.buildValidationErrorObject(
            "saturation",
            "multiplier",
            validation.error,
          ),
        );
        return;
      }

      // Arguments for sharp().modulate()
      const args = [{ saturation: multiplier }];

      // Resolve exec with Buffer or reject
      processImage(input, "modulate", args)
        .then((result: ISharpResult) => {
          resolve(result);
        })
        .catch((err: Error) => {
          Util.logOperationError(
            "Saturation",
            input,
            tags,
            [multiplierInput],
            err,
          );
          reject(err);
          return;
        });
    });
  },
} as IOperation;
