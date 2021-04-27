const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    console.log('User', message.author.username, message.author.id, 'uncalled');
    client.guilds.last().fetchMember(message.author.id).then(function(member) {
        console.log('Removing the role');
try {
        member.removeRole('805930746254590023');
} catch (e) {
    console.log('err', e);
}
    });
    message.delete();
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: []
};

exports.help = {
    name: 'unhackathon',
    category: Categories.UTILITIES,
    description: 'Add a user to unhackathon',
    usage: '!unhackathon'
};
