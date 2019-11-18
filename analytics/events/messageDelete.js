const MessageBroker = require('../../core/broker/Client');

module.exports = async (client, message) => {
  if(message.author.bot) return;
  let author;
  let roles;
  let tag;
  let name;
  let timestamp;

  if(message.guild) {
    author = await client.guilds.last().fetchMember(message.author).then();
    roles = author.roles;
    tag = author.tag;
    name = author.displayName;
    timestamp = message.createdAt;
  }

  MessageBroker.sendMessage({
    type: MessageBroker.MessageType.REMOVE_MESSAGE,
    data: {
      author: author,
      roles: roles,
      tag: tag,
      name: name,
      timestamp: timestamp
    }
  })
};
