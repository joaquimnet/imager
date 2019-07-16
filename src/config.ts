/* Node */
import fs from "fs";
import path from "path";

// Logger Config
import log from "loglevel";

if (process.env.NODE_ENV === "development") {
  log.setLevel("debug");
} else {
  log.setLevel("info");
}

import chalk, { Chalk } from "chalk";
import prefix from "loglevel-plugin-prefix";

prefix.reg(log);

prefix.apply(log, {
  format(level, name, timestamp) {
    const colors = {
      TRACE: chalk.magenta,
      DEBUG: chalk.cyan,
      INFO: chalk.blue,
      WARN: chalk.yellow,
      ERROR: chalk.red,
    };
    return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](
      level,
    )}`;
  },
});

prefix.apply(log.getLogger("critical"), {
  format(level, name, timestamp) {
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
  },
});

/* discordjs-command config */
const commandConfig = {
  directMessageCommands: "ignore",
  dmHelp: false,
  prefix: "!i ",
  showCommandNotFoundMessage: false,
  superUser: ["481675930247364620"],
  typescript: true,
};

/* Discord Token config */
let TOKEN: string = "";
if (process.env.NODE_END === "production") {
  TOKEN = process.env.TOKEN as string;
} else {
  try {
    TOKEN = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "TOKEN.json"), {
        encoding: "utf8",
      }),
    ).TOKEN;
  } catch (err) {
    log.getLogger("critical").error("TOKEN.json not found!");
    fs.writeFileSync("./TOKEN.json", '{\n  "TOKEN": "TOKEN_GOES_HERE"\n}', {
      encoding: "utf8",
    });
    throw err;
  }
}

export { log, commandConfig, TOKEN };
