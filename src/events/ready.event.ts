import { EventHandler } from 'sensum';

import { Logger } from '../logging/logger';

export default new EventHandler({
  name: 'ready',
  enabled: true,
  run(bot) {
    Logger.log(`Logged in as ${bot.user!.tag}!`);
    Logger.log(`Loaded ${bot.commands.size} commands.`);
  },
});
