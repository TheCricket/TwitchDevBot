import Permissions from '../utils/Permissions';
import Categories from '../utils/Categories';

const permissions = Permissions.appendRoles(Permissions.ADMIN, Permissions.OWNER, Permissions.MOD, Permissions.STAFF);

exports.run = async (client, message, args) => {
    message.mentions.users.forEach(user => {
        client.guilds.last().fetchMember(user).then(function(member) {
            client.guilds.last().roles.forEach(role => {
                if(role.name === Permissions.STAFF[0]) {
                    member.removeRole(role.id);
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
    aliases: [],
    ranks: permissions,
};

exports.help = {
    name: 'unstaff',
    category: Categories.UTILITIES,
    description: 'Remove a user from staff',
    usage: '!unstaff @user'
};
