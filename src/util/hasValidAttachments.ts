import { Message } from "discord.js";

import { isValidSharpInput } from "./isValidSharpInput";

export function hasValidAttachments(msg: Message): boolean {
  if (msg.attachments.size < 1) {
    return false;
  }
  for (const attachment of msg.attachments.values()) {
    if (isValidSharpInput(attachment.filename)) {
      return true;
    }
  }
  return false;
}
