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
  name: 'ticket',
  category: Categories.HELP,
  description: 'Create a Ticket for us to help you out',
  usage: '!ticket <reason>'
};
