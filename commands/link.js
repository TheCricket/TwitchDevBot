const Categories = require('../utils/Categories');
const TwitchAPI = require('../utils/TwitchAPI');

exports.run = async (client, message, args) => {
    if(args != null) {
        switch(args[0]) {
            case 'game':
                message.author.createDM().then((channel) => {
                    channel.send(TwitchAPI.fetchAuthURLForGames(message.author.id))
                });
                break;
            case 'extension':
                message.author.createDM().then((channel) => {
                    channel.send(TwitchAPI.fetchAuthURLForExtensions(message.author.id))
                });
                break;
        }
    }
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'link',
    category: Categories.UTILITIES,
    description: `Link your Twitch Account! You can specifically link your account as 'game' or 'extension' by adding the type or leave it blank to simply link accounts`,
    usage: '!link <type>'
};
