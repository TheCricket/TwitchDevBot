const Categories = require('../../core/utils/Categories');
const MessageBroker = require('../core/broker/Client');

exports.run = async (client, message, args) => {
  let guild = client.guilds.last();
  let FileUtils = require('../FileUtils');

  if(!FileUtils.getActiveRequests().includes(message.author.id)) {
    let requestNum = FileUtils.getTotalRequests() + 1;
    guild.createChannel(`request-${requestNum}`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: guild.id,
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }
      ]
    }).then(channel => {
      guild.channels.forEach(ch => {
        if (ch.id === '588511676962308097') channel.setParent(ch);
      });
      guild.roles.forEach(role => {
        if (role.hasPermission('ADMINISTRATOR') || role.hasPermission('KICK_MEMBERS')) {
          channel.overwritePermissions(role, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
        }
      });
    });
    FileUtils.updateRequests(requestNum);
    let active = FileUtils.getActiveRequests();
    active.push({
      creator: message.author.id,
      requestNum: requestNum
    });
    FileUtils.updateActiveRequests(active);
    MessageBroker.sendMessage({
      type: MessageBroker.MessageType.REQUEST_CREATED,
      data: ''
    });
  } else {
    message.channel.send('You already have an active request. You can find it at the top of the channel list');
  }
};

exports.conf = {
  enabled: true,
  aliases: ['req'],
  ranks: [],
};

exports.help = {
  name: 'request',
  category: Categories.HELP,
  description: 'Need a rank? Have an issue? Let us know!',
  usage: '-request'
};
