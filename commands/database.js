const Categories = require('../utils/Categories');
const Permissions = require('../utils/Permissions');
const DBAPI = require('../utils/DBAPI');

exports.run = async (client, message, args) => {
  if(args !== []) {
    switch (args[0]) {
      case 'createAdmin':
        if(args.length === 2) {
          if (DBAPI.addSupportAdmin(args[1])) {
            message.reply(`Successfully added ${args[1]} to the support admin team`);
          } else {
            message.reply(`Failed to add ${args[1]}`);
          }
        }
        break;
      case 'deleteAdmin':
        if(args.length === 2) {
          if (DBAPI.addSupportAdmin(args[1])) {
            message.reply(`Successfully removed ${args[1]} from the support admin team`);
          } else {
            message.reply(`Failed to remove ${args[1]}`);
          }
        }
        break;
      case 'createCategory':
        if(args.length === 2) {
          if (DBAPI.createCategory(args[1])) {
            message.reply(`Successfully added ${args[1]}`);
          } else {
            message.reply(`Failed to add ${args[1]}`);
          }
        }
        break;
      case 'removeCategory':
        if(args.length === 2) {
          if (DBAPI.removeCategory(args[1])) {
            message.reply(`Successfully removed ${args[1]}`);
          } else {
            message.reply(`Failed to remove ${args[1]}`);
          }
        }
        break;
      case 'getActiveTickets':
        const activeTickets = DBAPI.getActiveTickets();
        if (activeTickets != null) {
          //Build ticket with replies
        } else {
          message.reply('There are currently no active tickets');
        }
        break;
      case 'connectionStatus':
        DBAPI.Database.connection.authenticate().then((err) => {
          message.reply('Connection has been established successfully');
        }).catch((err) => {
          message.reply(err);
        });
        break;
    }
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: [Permissions.OWNER],
};

exports.help = {
  name: 'db',
  category: Categories.SYSTEM,
  description: 'Database Configuration',
  usage: '!db [param]'
};
