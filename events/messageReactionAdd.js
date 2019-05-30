module.exports = async (client, reaction) => {
  const message = reaction.message;
  if(message.author.username === 'TwitchDevBot') {
    if(message.embeds[0].description.toLowerCase().includes('react')) {
      if(message.embeds[0].description.toLowerCase().includes('unsubscribe')) {
        if(message.embeds[0].description.toLowerCase().includes('notifications')) {
          client.guilds.last().roles.array().forEach(role => {
            if(role.name === 'Notifications') {
              removeRankForUsers(client, reaction, role);
            }
          })
        }
      } else if(message.embeds[0].description.toLowerCase().includes('subscribe')) {
        if(message.embeds[0].description.toLowerCase().includes('notifications')) {
          client.guilds.last().roles.array().forEach(role => {
            if(role.name === 'Notifications') {
              giveRankForUsers(client, reaction, role);
            }
          })
        }
      }
    }
  }
};

const giveRankForUsers = (client, reaction, role) => {
  reaction.message.reactions.forEach(react => {
    react.users.array().forEach(user => {
      client.guilds.last().fetchMember(user).then(member => {
        member.addRole(role);
        reaction.remove(user);
      })
    })
  });
};

const removeRankForUsers = (client, reaction, role) => {
  reaction.message.reactions.forEach(react => {
    react.users.array().forEach(user => {
      client.guilds.last().fetchMember(user).then(member => {
        member.removeRole(role);
        reaction.remove(user);
      })
    })
  });
};
