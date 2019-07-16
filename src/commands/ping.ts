import { Message } from "discord.js";

module.exports = {
  name: "ping",
  description: "Ping!",
  execute(message: Message) {
    message.channel.send("Pong.");
  },
};
