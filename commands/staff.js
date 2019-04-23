const Permissions = require('../utils/Permissions');
const Categories = require('../utils/Categories');
const permissions = Permissions.appendRoles(Permissions.ADMIN, Permissions.OWNER, Permissions.MOD, Permissions.STAFF);

exports.run = async (client, message, args) => {
    message.mentions.users.forEach(user => {
        client.guilds.last().fetchMember(user).then(function(member) {
            client.guilds.last().roles.forEach(role => {
                if(role.name === Permissions.STAFF[0]) {
                    member.addRole(role.id);
                }
            })
        });
    });
};

exports.init = async () => {
    //Pre-Load
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    ranks: permissions,
};

exports.help = {
    name: 'staff',
    category: Categories.UTILITIES,
    description: 'Add a user to staff',
    usage: '!staff @user'
};