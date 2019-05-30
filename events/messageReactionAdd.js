module.exports = async (client, reaction) => {
  const message = reaction.message;
  if(message.author.username === 'TwitchDevBot') {
    if(message.embeds[0].description.toLowerCase().includes('react')) {
      if(message.embeds[0].description.toLowerCase().includes('unsubscribe')) {
        if(message.embeds[0].description.toLowerCase().includes('notifications')) {
          client.guilds.last().roles.array().forEach(role => {
            if(role.name === 'Notifications') {
              removeRankForUsers(client, message, role);
            }
          })
        }
      } else if(message.embeds[0].description.toLowerCase().includes('subscribe')) {
        if(message.embeds[0].description.toLowerCase().includes('notifications')) {
          client.guilds.last().roles.array().forEach(role => {
            if(role.name === 'Notifications') {
              giveRankForUsers(client, message, role);
            }
          })
        }
      }
    }
  }
};

const giveRankForUsers = (client, message, role) => {
  message.reactions.forEach(react => {
    react.users.array().forEach(user => {
      client.guilds.last().fetchMember(user).then(member => {
        member.addRole(role);
      })
    })
  });
};

const removeRankForUsers = (client, message, role) => {
  message.reactions.forEach(react => {
    react.users.array().forEach(user => {
      client.guilds.last().fetchMember(user).then(member => {
        member.addRole(role);
      })
    })
  });
};
