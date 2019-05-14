import Categories from '../utils/Categories';

exports.run = async (client, message, args) => {
    message.channel.send(`Hey there! Looks like you found us on a quest for answers. You're in luck. Our friends over at TwitchSupport have the answer for you. You can contact them at http://link.twitch.tv/help`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'support',
    category: Categories.HELP,
    description: `Account specific issues? This command will point you in the right direction!`,
    usage: '!support'
};
