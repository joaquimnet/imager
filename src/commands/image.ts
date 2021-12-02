import { Command, Permission } from 'sensum';

export default new Command({
  name: 'image',
  description: 'Information about image transformation.',
  permission: Permission.USER,
  run(bot, message) {
    return message.channel.send(':construction: WIP');
  },
});
