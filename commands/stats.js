const { RichEmbed } = require('discord.js');

module.exports = {
  name: 'stats',
  description: 'Show some stats about Popon.',
  aliases: ['status', 'info'],
  execute(message) {
    const guilds = message.client.guilds.size;
    const users = message.client.users.size;
    const uptime = message.client.uptime;
    const uptimeFormatted = new Date(uptime).toISOString().substr(11, 8);
    const ping = Math.trunc(message.client.ping);

    const embedData = {
      color: 13044507,
      footer: {
        text: 'Version ' + require('../package.json').version,
      },
      thumbnail: {
        url: 'https://cdn.discordapp.com/avatars/599257952343425052/113eceebc1864486f825776d23ca9e74.png?size=2048',
      },
      author: {
        name: 'Popon Stats',
        url: 'https://poponbot.herokuapp.com',
        icon_url: 'https://cdn.discordapp.com/avatars/599257952343425052/113eceebc1864486f825776d23ca9e74.png',
      },
      fields: [
        {
          name: 'Servers',
          value: '' + guilds,
          inline: true,
        },
        {
          name: 'Users',
          value: '' + users,
          inline: true,
        },
        {
          name: 'Uptime',
          value: '' + uptimeFormatted,
          inline: true,
        },
        {
          name: 'Ping',
          value: ping + 'ms',
          inline: true,
        },
      ],
    };
    const embed = new RichEmbed(embedData);
    message.channel.send(embed);
  },
};
