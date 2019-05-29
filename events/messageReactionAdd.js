module.exports = async (client, reaction) => {
  const message = reaction.message;
  if(message.author.username === 'TwitchDevBot') {
    if(message.embeds[0].description.toLowerCase().includes('react')) {
      if(message.embeds[0].description.toLowerCase().includes('unsubscribe')) {
        if(message.embeds[0].description.toLowerCase().includes('notifications')) {
          client.guilds.last().roles.array().forEach(role => {
            if(role.name === 'Notifications') {
              client.guilds.last().fetchMember(reaction.users.array()[0]).then(member => {
                member.removeRole(role);
              });
            }
          })
        }
      } else if(message.embeds[0].description.toLowerCase().includes('subscribe')) {
        if(message.embeds[0].description.toLowerCase().includes('notifications')) {
          client.guilds.last().roles.array().forEach(role => {
            if(role.name === 'Notifications') {
              client.guilds.last().fetchMember(reaction.users.array()[0]).then(member => {
                member.addRole(role);
              });
            }
          })
        }
      }
    }
  }
};
