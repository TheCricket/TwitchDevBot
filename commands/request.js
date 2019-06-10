const Categories = require('../utils/Categories');

exports.run = async (client, message, args) => {
  //This is a dummy command
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: [],
};

exports.help = {
  name: 'request',
  category: Categories.HELP,
  description: 'Create a request for specific roles',
  usage: '!request <reason>'
};
