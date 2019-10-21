const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    const msg = await message.channel.send('Ping?');
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'ping',
    category: Categories.MISC,
    description: 'Ping? ... Pong!',
    usage: '!ping'
};
