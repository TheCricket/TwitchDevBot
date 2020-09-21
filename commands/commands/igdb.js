const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you are asking questions about the IGDB API! You might want to join the IGDB Discord (#api channel) for Focussed help https://discord.gg/JKsh9R7`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'igdb',
    category: Categories.HELP,
    description: `Questions about the IGDB API? This command will point you in the right direction!`,
    usage: '!igdb'
};
