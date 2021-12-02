import Discord, { Client, Message, MessageAttachment } from "discord.js";

import { commandConfig, log } from "../config";

import filesize from "filesize";
import { hasValidAttachments } from "../util/hasValidAttachments";
import { mentionsMe } from "../util/mentionsMe";

import { commandParser } from "./command-parser";

/* Image Operations */
import { IOperation, operations } from "./operations";

/* Interfaces */
export interface ISharpResult {
  data: Buffer;
  info: {
    width: number;
    height: number;
    size: number;
  };
}

export interface IValidationError {
  operation: string;
  message: string;
}

export function Imager(client: Client) {
  client.on("message", async (msg: Message) => {
    if (mentionsMe(msg) && hasValidAttachments(msg)) {
      const att: MessageAttachment = msg.attachments.first()!;
      const [operationsToPerform, tags] = commandParser(msg.content);
      if (operationsToPerform.length <= 0) {
        log.debug(
          "[Imager/Core] Received valid image but no commands.",
          `[${msg.author.username} / ${att.filename}]`,
        );
        msg.channel.send(
          "You didn't specify any commands. Type `" +
            commandConfig.prefix +
            "image` to see the available commands.",
        );
        return;
      } else {
        log.debug(
          "[Imager/Core] Received valid image and valid operations.",
          `[${msg.author.username} / ${att.filename}]`,
          `[${operationsToPerform.map(
            (op) => `[${[op.operation, op.arguments]}]`,
          )}] [${tags}]`,
        );
      }

      try {
        const result: ISharpResult = await operationsToPerform.reduce<
          Promise<any> | string
        >(
          async (previousOperation, current, i, src) => {
            const operationInput = await previousOperation;

            const currentOperation = operations.get(
              current.operation,
            ) as IOperation;

            const currentResult: ISharpResult = await currentOperation.exec(
              operationInput,
              tags,
              ...current.arguments,
            );

            // If its the last iteration return buffer + info else return buffer
            return src.length - 1 === i ? currentResult : currentResult.data;
          },
          // Initial Value: the attachment url
          att.url,
        );
        // Final image after all operations done
        const resultBuffer = result.data;
        const { width, height, size } = result.info;
        // Send it back to the user
        msg.channel.send(
          `:frame_photo: ${att.filename} | ${width}x${height} | ${filesize(
            size,
          )}`,
          new Discord.Attachment(resultBuffer, att.filename),
        );
      } catch (err) {
        // An operation failed, cancelling.
        msg.channel
          .send(":dizzy_face: Oops, something went wrong.")
          .then(() => {
            if (err.operation) {
              msg.channel
                .send(err.operation + " " + err.message)
                .then(() => msg.channel.stopTyping(true));
            } else {
              log.error(err);
            }
          });
      }
    }
  });
}
