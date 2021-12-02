import { EventHandler } from 'sensum';

import { Logger } from '../logging/logger';

export default new EventHandler({
  name: 'error',
  enabled: true,
  run(bot, err) {
    Logger.error(err);
  },
});
