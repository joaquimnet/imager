import { Message } from "discord.js";

export function mentionsMe(msg: Message): boolean {
  return msg.mentions.users.has(msg.client.user.id);
}
