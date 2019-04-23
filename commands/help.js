const Categories = require('../utils/Categories');

exports.run = (client, message, args) => {
    if(!args[0]) {
        const commandNames = client.commands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        let output = `= Command List =\n\n[Use !help <commandname> for details]\n`;
        const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
        sorted.forEach(c => {
          const cat = c.help.category;
          if(currentCategory !== cat) {
              output += `\u200b\n== ${cat} ==\n`;
              currentCategory = cat;
          }
          output += `!${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
        });
        message.channel.send(output, {code:"asciidoc", split: {char: "\u200b"}});
    } else {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(', ')}\n= ${command.help.name} =`, {code:"asciidoc"});
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    ranks: []
};

exports.help = {
    name: 'help',
    category: Categories.SYSTEM,
    description: 'Displays all the available commands',
    usage: '!help [command]'
};