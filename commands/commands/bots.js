const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you found us on a quest for help with view/follow bots. You're in luck. While we can't help you directly, you will find your answers here: https://help.twitch.tv/s/article/how-to-handle-view-follow-bots`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'bots',
    category: Categories.HELP,
    description: `Issues with bots following you? This command will point you in the right direction!`,
    usage: '!bots'
};
