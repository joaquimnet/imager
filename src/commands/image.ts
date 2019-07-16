import { Message } from "discord.js";

module.exports = {
  name: "image",
  description: "Information about image transformation.",
  execute(message: Message) {
    message.channel.send(":construction: WIP");
  },
};
