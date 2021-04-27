const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send('Hey there! Looks like you found a bug with a third party product or the documentation! You can file an issues on https://github.com/twitchdev/issues');
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'issues',
    category: Categories.HELP,
    description: `File a report about a bug with a third party product or the documentation`,
    usage: '!issues'
};
