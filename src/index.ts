/* Node */
import path from "path";

/* Discord */
import Discord from "discord.js";
const client = new Discord.Client();
// Leaving command like this until I write a definition file
// tslint:disable-next-line: no-var-requires
const DiscordJSCommand = require("discordjs-command");
import { commandConfig, log, TOKEN } from "./config";

/* Image Processing */
import { Imager } from "./image_processing/";

/* Util */
import moment from "moment";

client.on("ready", () => {
  log.info(`[Discord] Logged in as ${client.user.tag}!`);
});

// Mention Catcher
Imager(client);

// Debugging
client.on("message", (msg) => {
  if (msg.channel.id === "600423584694796298") {
    log.info(
      `[Console][${moment().format("HH:mm:ss")}] ${
        msg.author.username
      }: ${msg.content.replace(/\n/g, "\n           ")}`,
    );
  }
});

// Command System
const commandSystem = new DiscordJSCommand(
  client,
  commandConfig,
  path.join(__dirname, "commands"),
);
commandSystem.ListenForCommands((commands: Map<string, object>) => {
  log.info("[Discord] " + commands.size + " commands loaded.");
  log.info(
    `[Discord] DiscordCommand loaded. Prefix: [${commandConfig.prefix}]`,
  );
});

// Start Imager
try {
  client.login(TOKEN);
} catch (err) {
  log.getLogger("critical").error("Error trying to log bot into discord!");
  throw err;
}
