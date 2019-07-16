/* Node */
import path from "path";

/* Log */
import { log } from "../config";

/* Util */
import { getAllFiles } from "../util/getAllFiles";

/* Interfaces */
import { ISharpResult } from "./index";
import { ITag } from "./tags";

/* Operation Interface */
export interface IOperation {
  name: string;
  arguments: number;
  usage: string;
  exec(
    operationInput: string | Buffer,
    tags: ITag[],
    ...args: string[]
  ): Promise<ISharpResult>;
}

/* Image Operations */
export const operations = new Map() as Map<string, IOperation>;

// Read all files recursively on operations directory
getAllFiles(path.join(__dirname, "operations"))
  // Remove .ts extension
  .map((operationPath) => operationPath.replace(".ts", ""))
  // Load all found operations into operations map
  .forEach((operationPath) => {
    try {
      const op = require(operationPath);
      operations.set(op.name, op);
    } catch (err) {
      log.error("Failed to import image operation: " + operationPath);
      log.debug(err);
    }
  });

log.info("[Imager] " + operations.size + " image operations loaded.");
