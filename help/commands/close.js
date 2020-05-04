const Categories = require('../../core/utils/Categories');
const Permissions = require('../../core/utils/Permissions');
const FileUtils = require('../FileUtils');

const ranks = Permissions.appendRoles(Permissions.STAFF, Permissions.ADMIN, Permissions.MOD, Permissions.OWNER);

exports.run = async (client, message, args) => {
  if(args.length > 0) {
    let requestNum = args[0];
    client.guilds.last().channels.forEach(channel => {
      if(channel.parentID === '588511676962308097' && channel.name.includes(requestNum)) {
        let active = FileUtils.getActiveRequests();
        for(let c = 0; c < active.length; c++) {
          if(active[c].requestNum === requestNum) {
            FileUtils.updateActiveRequests(active);
            active.splice(c, c);
            channel.delete();
          }
        }
      }
    })
  } else {
    let active = FileUtils.getActiveRequests();
    for(let c = 0; c < active.length; c++) {
      if(active[c].requestNum === message.channel.name.split('-')[1]) {
        FileUtils.updateActiveRequests(active);
        active.splice(c, c);
        message.channel.delete();
      }
    }
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  ranks: ranks
};

exports.help = {
  name: 'close',
  category: Categories.UTILITIES,
  description: 'Close a ticket',
  usage: '-close'
};
