const Categories = require('../utils/Categories');
const EmbedBuilder = require('../utils/EmbedBuilder');

exports.run = async (client, message, args) => {
  const member = await client.guilds.last().fetchMember(message.author);
  const embed = EmbedBuilder.buildRichEmbed('', '', message.content.substr('!mock '.length), '', member.user.avatarURL, '', member.displayName);
  const mocked = message.channel.send(embed);
  message.delete();
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: [],
};

exports.help = {
  name: 'mock',
  category: Categories.UTILITIES,
  description: 'Make the bot say something',
  usage: '!mock'
};
