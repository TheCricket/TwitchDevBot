const Categories = require('../../core/utils/Categories');

const redis = require('redis');
const redis_subscribe = redis.createClient();
redis_subscribe.on('error', function (err) {
    console.error('REDIS Error', err);
});

console.log(client);

redis_subscribe.on('message', (chan, message) => {
    if (chan == 'twitch_dev_assign_roles') {
        try {
            var payload = JSON.parse(message);

            client.fetchUser(payload.discord.id).then((user) => {
                console.log(`Adding role to ${user.tag}`);
                client.guilds.last().fetchMember(user).then((member) => {
                    client.guilds.last().roles.forEach(role => {
                        if (payload.extensions && role.name === 'Extension Developer') {
                            member.addRole(role.id);
                            member.createDM().then((channel) => {
                                channel.send('Added role: Extension Developer');
                            });
                        }
                        if (payload.games && role.name === 'Game Developer') {
                            member.addRole(role.id);
                            member.createDM().then((channel) => {
                                channel.send('Added role: Game Developer');
                            });
                        }
                    });
                });
            });
        } catch (e) {
            console.error('Adding Roles Error', e);
        }
    }
});
redis_subscribe.subscribe('twitch_dev_assign_roles');

exports.run = async (c, message, args) => {
    message.author.createDM().then((channel) => {
        if(args.length === 1) {
            id = message.author.id;
            channel.send(`Visit this website for instructions and to get Linked! ${process.env.PUBLIC_LOCATION}`);
        } else {
            id = message.author.id;
            channel.send(`Visit this website for instructions and to get Linked! ${process.env.PUBLIC_LOCATION}`);
        }
    });
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: []
};

exports.help = {
    name: 'link',
    category: Categories.UTILITIES,
    description: `Have you released an extension or are a Game Developer? Link your account with this command to give yourself a special badge! :)`,
    usage: '!link <type>'
};
