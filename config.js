// Logging
const log = require('loglevel');

if (process.env.NODE_ENV === 'development') {
  log.setLevel('debug');
} else {
  log.setLevel('info');
}

const commandConfig = {
  prefix: '!i ',
  superUser: ['481675930247364620'],
  showCommandNotFoundMessage: false,
  directMessageCommands: 'ignore',
  dmHelp: false,
};

module.exports = { log, commandConfig };
