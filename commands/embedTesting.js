const Permissions = require('../utils/Permissions');
const Categories = require('../utils/Categories');
const EmbedBuilder = require('../utils/EmbedBuilder');
const permissions = Permissions.appendRoles(Permissions.ADMIN, Permissions.OWNER, Permissions.MOD, Permissions.STAFF);

exports.run = async (client, message, args) => {
    message.channel.send(EmbedBuilder.buildRichEmbed("http://www.google.com", "Testing 123", "Test description", "Cricket", "https://i.imgur.com/lm8s41J.png", "http://i.imgur.com/yVpymuV.png", true));
    message.channel.send({embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "This is an embed",
            url: "http://google.com",
            description: "This is a test embed to showcase what they look like and what they can do.",
            fields: [{
                name: "Fields",
                value: "They can have different fields with small headlines."
            },
                {
                    name: "Masked links",
                    value: "You can put [masked links](http://google.com) inside of rich embeds."
                },
                {
                    name: "Markdown",
                    value: "You can put all the *usual* **__Markdown__** inside of them."
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Example"
            }
        }
    });
};

exports.init = async () => {
    //Pre-Load
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    ranks: permissions,
};

exports.help = {
    name: 'embed',
    category: Categories.UTILITIES,
    description: 'Remove a user from staff',
    usage: '!embed'
};