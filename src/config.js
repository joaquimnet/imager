// Logger Config
const log = require('loglevel');

if (process.env.NODE_ENV === 'development') {
  log.setLevel('debug');
} else {
  log.setLevel('info');
}

const chalk = require('chalk');
const prefix = require('loglevel-plugin-prefix');

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

prefix.reg(log);

prefix.apply(log, {
  format(level, name, timestamp) {
    return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)}`;
  },
});

prefix.apply(log.getLogger('critical'), {
  format(level, name, timestamp) {
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
  },
});

/* discordjs-command config */
const commandConfig = {
  prefix: '!i ',
  superUser: ['481675930247364620'],
  showCommandNotFoundMessage: false,
  directMessageCommands: 'ignore',
  dmHelp: false,
};

module.exports = { log, commandConfig };
