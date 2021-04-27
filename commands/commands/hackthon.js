const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    console.log('User', message.author.username, message.author.id, 'called');
    client.guilds.last().fetchMember(message.author.id).then(function(member) {
        member.addRole('805930746254590023');
    });
//    console.log('Roles', message.member.roles);
/*
    if (message.user.roles.find(r => r.id == '805930746254590023')) {
        user.removeRole('805930746254590023');
    } else {
        user.addRole('805930746254590023');
    }
*/
    message.delete();
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: []
};

exports.help = {
    name: 'hackathon',
    category: Categories.UTILITIES,
    description: 'Add a user to hackathon',
    usage: '!hackathon'
};
