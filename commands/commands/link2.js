const Categories = require('../../core/utils/Categories');

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: []
};

exports.help = {
  name: 'link2',
  category: Categories.UTILITIES,
  description: `Have you released an extension? Link your account with this command to give yourself a special badge! If you've released a game do '!link game' instead :)`,
  usage: '!link2 <type>'
};
