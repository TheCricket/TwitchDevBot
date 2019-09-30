const Permissions = require('../utils/Permissions');
const Categories = require('../utils/Categories');
const permissions = Permissions.appendRoles(Permissions.ADMIN, Permissions.OWNER, Permissions.MOD, Permissions.STAFF);

exports.run = async (client, message, args) => {
  if(message.mentions.users.size !== 0) {
    message.mentions.users.forEach(user => {
      client.guilds.last().fetchMember(user).then(function(member) {
        client.guilds.last().roles.forEach(role => {
          if(role.id === args[args.length - 1]) {
            member.addRole(role.id);
          }
        })
      })
    })
  } else {
    client.guilds.last().roles.get(args[0]).members.forEach(member => {
      member.addRole(args[1]);
    });
  }
};

exports.init = async () => {
  //Pre-Load
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: permissions,
};

exports.help = {
  name: 'rank',
  category: Categories.UTILITIES,
  description: 'Give a rank to a group of people',
  usage: '!rank <@Mentions or RankID> <RankID>'
};
