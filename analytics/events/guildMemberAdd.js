const MessageBroker = require('../core/broker/Client');

module.exports = async (client, member) => {
  let memberTag = member.user.tag;
  let memberDisplayName = member.displayName;
  let memberID = member.id;
  let timestamp = member.joinedAt;

  MessageBroker.sendMessage({
    type: MessageBroker.MessageType.ADD_MEMBER,
    data: {
      tag: memberTag,
      displayName: memberDisplayName,
      id: memberID,
      timestamp: timestamp
    }
  });
};
