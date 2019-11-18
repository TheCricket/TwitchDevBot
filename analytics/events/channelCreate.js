const MessageBroker = require('../../core/broker/Client');

module.exports = async (client, channel) => {
  MessageBroker.sendMessage({
    type: MessageBroker.MessageType.CHANNEL_CREATE,
    data: {
      name: client.guilds.last().channels.filter(guildChannel => guildChannel.id === channel.id).last().name,
      createdAt: channel.createdAt,
      type: channel.type === 'voice'
    }
  });
};
