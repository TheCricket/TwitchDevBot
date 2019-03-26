const Discord = require('discord.js');

exports.buildRichEmbed = (link, title, description, author, authorImg, previewImage, blogPost) => {
    const embed = new Discord.RichEmbed()
        .setTitle(title)
        .setAuthor(author)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x6441A4)
        .setDescription(description)
        .setFooter(blogPost ? 'Brought to you by blog.twitch.tv' : 'Brought to you by the dev forums', authorImg)
        //.setImage(previewImage)
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .setURL(link);
    return embed;
};