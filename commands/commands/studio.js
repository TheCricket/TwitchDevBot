const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you are asking questions about Twitch Studio! You might want to join the Twitch Studio Discord https://discord.gg/THspY76`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'studio',
    category: Categories.HELP,
    description: `Questions about a Twitch Studio? This command will point you in the right direction!`,
    usage: '!studio'
};
