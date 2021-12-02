import { EventHandler } from 'sensum';

import { Logger } from '../logging/logger';

export default new EventHandler({
  name: 'warn',
  enabled: true,
  run(bot, err) {
    Logger.warn(err);
  },
});
