module.exports = msg => {
  return msg.mentions.users.has(msg.client.user.id);
};
