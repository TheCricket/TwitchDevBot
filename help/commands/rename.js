const Permissions = require('../../core/utils/Permissions');
const Categories = require('../../core/utils/Categories');
const ranks = Permissions.appendRoles(Permissions.ADMIN, Permissions.OWNER, Permissions.MOD, Permissions.STAFF);

exports.run = async (client, message, args) => {
  if(args.length > 1) {
    message.channel.send('Please keep the channel name to 1 word')
  } else if(args.length === 0) {
    message.channel.send('Please include a name');
  } else {
    await message.channel.setName(`${args[0]}-${message.channel.name.split('-')[1]}`); 
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: ranks,
};

exports.help = {
  name: 'rename',
  category: Categories.UTILITIES,
  description: 'Rename a request',
  usage: '!rename [Name]'
};
