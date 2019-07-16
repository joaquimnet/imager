import { log } from "../config";
import { ITag } from "../image_processing/tags";

export function logOperationError(
  operation: string,
  input: string|Buffer,
  tags: ITag[],
  operationArguments: string[],
  err: Error,
) {
  const prefix = `[Imager/${operation}]`;
  const tagsList = tags.reduce((acc, cur) => acc + cur.name, "");
  log.error(prefix + " Operation failed!");
  log.error(
    `${prefix} Tags: [${tagsList}] | Arguments: [${operationArguments}]`,
  );
  log.error(`${prefix} Input: `, input);
  log.error(prefix, err);
}
