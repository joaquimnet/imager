import { config } from 'dotenv';
config();
import { BotClient, defaultCommands } from 'sensum';
import { Intents } from 'discord.js';

import { Imager } from './image_processing/';
import { Logger } from './logging/logger';

const bot = new BotClient({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

defaultCommands.forEach((cmd) => bot.loadCommand(cmd));

// Mention Catcher
Imager(bot);

bot.login().catch((err) => {
  Logger.error(err);
  throw err;
});
