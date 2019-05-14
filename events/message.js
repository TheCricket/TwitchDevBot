import Permissions from '../utils/Permissions';

module.exports = async (client, message) => {
  if(message.author.bot) return;

  if(message.content.toLowerCase().includes('twitch') && message.content.toLowerCase().includes('sings')) {
    message.channel.send(`Hey there ${message.author}! We don't provide support for TwitchSings. To get support for it head on over to <https://link.twitch.tv/help> and our friends at TwitchSupport will help you out!`);
    return;
  }

  if(!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if(!cmd) return;

  if(cmd && !message.guild && cmd.conf.guildOnly) {
      return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
  }
  message.flags = [];
  while(args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1));
  }
  if(cmd.conf.ranks.length !== 0) {
    client.guilds.last().fetchMember(message.author).then(function (member) {
      let bool = Permissions.userHasRole(member, cmd.conf.ranks);
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
};
