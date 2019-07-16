import { loop } from "../util/loop";

import { IOperation, operations } from "./operations";
import { ITag, tagMap } from "./tags";

interface INewOperation {
  operation: string;
  arguments: string[];
}

export function commandParser(command: string): [INewOperation[], ITag[]] {
  const parsedOperations: INewOperation[] = [];
  const parsedTags: ITag[] = [];
  // Split at spaces
  const argArray = command.split(/ +/);
  argArray.forEach((v, index) => {
    const potentialOperation = v.toLowerCase();
    // If this is a valid operation registered through operations.js
    if (operations.has(potentialOperation)) {
      const newOperation: INewOperation = {
        arguments: [],
        operation: potentialOperation,
      };

      // Gather necessary arguments
      const argumentCount = (operations.get(potentialOperation) as IOperation)
        .arguments;

      loop(argumentCount, (i) => {
        newOperation.arguments.push(argArray[index + i + 1]);
      });

      parsedOperations.push(newOperation);
    }
    // If this is a valid tag name, push said tag to the tag array
    if (tagMap.has(potentialOperation)) {
      parsedTags.push(tagMap.get(potentialOperation) as ITag);
    }
  });
  return [parsedOperations, parsedTags];
}
