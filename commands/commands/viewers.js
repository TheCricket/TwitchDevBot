const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you want to know about Viewer counts <https://help.twitch.tv/s/article/understanding-viewer-count-vs-users-in-chat?language=en_US> help article might help you out!`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'viewers',
    category: Categories.HELP,
    description: `Marenpls`,
    usage: '!viewers'
};
