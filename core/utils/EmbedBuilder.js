const Discord = require('discord.js');

exports.buildRichEmbed = (link, title, description, author, authorImg, previewImage, footer) => {
    return new Discord.RichEmbed()
    .setTitle(title)
    .setAuthor(author)
    .setColor(0x6441A4)
    .setDescription(description)
    .setFooter(footer, authorImg)
    .setTimestamp()
    .setURL(link);
};
