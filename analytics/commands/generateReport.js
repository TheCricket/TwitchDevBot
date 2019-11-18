const Categories = require('../../core/utils/Categories');
const Permissions = require('../../core/utils/Permissions');
const EmbedBuilder = require('../../core/utils/EmbedBuilder');

const ranks = Permissions.appendRoles(Permissions.STAFF, Permissions.ADMIN, Permissions.MOD, Permissions.OWNER);

exports.run = async (client, message, args) => {
  const embed = EmbedBuilder.buildRichEmbed('', 'Generated Report', 'All times displayed by this bot are currently in the UTC timezone (GMT±0)',  client.user.username, client.user.avatarURL, client.guilds.last().iconURL, '');
  embed.addField('Members',`Users: ${message.guild.memberCount}\nBots: ${message.guild.members.filter(member => member.user.bot).size}`);
  embed.addField('Top Channels', `Messages: ${dummy}\nVoice: ${dummy}`);
  embed.addField('Messages', ``, true);
  embed.addField('Voice', ``, true);
  embed.addField('Server Info', `Server Created On: \`${message.guild.createdAt}\`\n\nServer Owner: ${message.guild.owner}`);
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: ranks
};

exports.help = {
  name: 'generateReport',
  category: Categories.UTILITIES,
  description: 'Generates a report',
  usage: '%generateReport'
};
