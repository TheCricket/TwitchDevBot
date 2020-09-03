const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you are asking questions about OBS! You might want to join the OBS Discord https://discord.com/invite/obsproject`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'obs',
    category: Categories.HELP,
    description: `Questions about a OBS or help with OBS? This command will point you in the right direction!`,
    usage: '!obs'
};
