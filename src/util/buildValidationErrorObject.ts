import { ValidationError } from "@hapi/joi";
import { IValidationError } from "../image_processing/";

export function buildValidationErrorObject(
  operation: string,
  argName: string,
  error: ValidationError,
): IValidationError {
  return {
    operation,
    message: error.details[0].message.replace('"value"', argName),
  };
}
