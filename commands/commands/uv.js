const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(
        `Something missing from the Twitch API or other third party product:`
        + "\n"
        + 'Make a suggestion or upvote and existing on on UserVoice - <https://twitch.uservoice.com/forums/310213-developers>'
    );
};

exports.conf = {
    enabled: true,
    aliases: ['!uservoice'],
    ranks: [],
};

exports.help = {
    name: 'uv',
    category: Categories.HELP,
    description: `UserVoice UserVoice does whatever a User Voices`,
    usage: '!uv'
};
