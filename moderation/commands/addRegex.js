const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  ranks: [],
};

exports.help = {
  name: 'ping',
  category: Categories.MISC,
  description: 'Ping? ... Pong!',
  usage: '!ping'
};
