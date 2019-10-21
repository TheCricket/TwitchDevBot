const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
};

module.exports = async (client, packet) => {
  switch(packet.t) {
    case 'MESSAGE_REACTION_ADD':
      addReactionEvent(client, packet);
      break;
    case 'MESSAGE_REACTION_REMOVE':
      removeReactionEvent(client, packet);
      break;
    default:
      break;
  }
};

const addReactionEvent = (client, packet) => {
  const channel = client.channels.get(packet.d.channel_id);
  if(channel.messages.has(packet.d.message_id)) return;
  channel.fetchMessage(packet.d.message_id).then(message => {
    const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
    const reaction = message.reactions.get(emoji);
    if(reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
    client.emit(events.MESSAGE_REACTION_ADD, reaction, client.users.get(packet.d.user_id));
  });
};

const removeReactionEvent = (client, packet) => {
  const channel = client.channels.get(packet.d.channel_id);
  if(channel.messages.has(packet.d.message_id)) return;
  channel.fetchMessage(packet.d.message_id).then(message => {
    const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
    const reaction = message.reactions.get(emoji);
    if(reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
    client.emit(events.MESSAGE_REACTION_REMOVE, reaction, client.users.get(packet.d.user_id));
  });
};
