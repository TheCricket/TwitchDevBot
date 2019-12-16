const Permissions = require('../../core/utils/Permissions');

module.exports = async (client, message) => {
  if(message.author.bot) return;

  if(message.guild) {
    if ((!message.content.startsWith('-')) && (!message.content.startsWith('!'))) return;

    const args = message.content.slice(1).trim().split(' ');
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    message.flags = [];
    while (args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1));
    }
    if (cmd.conf.ranks.length !== 0) {
      client.guilds.last().fetchMember(message.author).then(function (member) {
          if (Permissions.userHasRole(member, cmd.conf.ranks)) {
            client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
            cmd.run(client, message, args);
          } else {
            console.log("NO!");
          }
        }
      );
    } else {
      client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
      cmd.run(client, message, args);
    }
  } else {

  }
};
