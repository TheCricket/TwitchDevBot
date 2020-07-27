const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you are asking questions about a specific Twitch Library! You might want to join the "Twitch Libraries Chat" Discord for Focussed help https://discord.gg/8NXaEyV`);
};

exports.conf = {
    enabled: true,
    aliases: ['!libs'],
    ranks: [],
};

exports.help = {
    name: 'libraries',
    category: Categories.HELP,
    description: `Questions about a specific Twitch Library? This command will point you in the right direction!`,
    usage: '!libraries'
};
