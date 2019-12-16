const Discord = require('discord.js');

exports.buildRichEmbed = (link, title, description, author, authorImg, previewImage, footer) => {
    return new Discord.RichEmbed()
    .setTitle(title)
    .setAuthor(author)
    .setImage(previewImage)
    .setColor(0x772CE8)
    .setDescription(description)
    .setFooter(footer, authorImg)
    .setTimestamp()
    .setURL(link);
};
