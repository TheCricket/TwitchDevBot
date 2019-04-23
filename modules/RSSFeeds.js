const RSSParser = require('rss-parser');
const EmbedBuilder = require('../utils/EmbedBuilder');

let lastBlogPost;
let lastForumPost;
let lastStatusPost;

let botTesting = '524833530656587777';
let announcements = '523673395221495808';

exports.init = () => {
    this.parseBlog();
    this.parseForums();
    this.parseStatus();
};

exports.parseBlog = () => {
    let parser = new RSSParser();
    parser.parseURL('http://blog.twitch.tv/feed', function(err, feed) {
        if(lastBlogPost == null) {
            //Startup
            lastBlogPost = feed.items[0];
        } else if(lastBlogPost.title === feed.items[0].title) {
            //Same post
            client.logger.log('Checked blog posts but found the same one');
        } else {
            //Send message to announcements
            lastBlogPost = feed.items[0];
            client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastBlogPost.link, lastBlogPost.title, '', lastBlogPost.creator, '', '', 'Brought to you by blog.twitch.tv'));
        }
    });
};

exports.parseForums = () => {
    let par = new RSSParser();
    par.parseURL('https://discuss.dev.twitch.tv/c/announcements.rss', function(err, feed) {
        if(lastForumPost == null) {
            //Startup
            lastForumPost = feed.items[0];
        } else if(lastForumPost.title === feed.items[0].title) {
            //Same post
            client.logger.log('Checked forum posts but found the same one');
        } else {
            //Send message to announcements
            lastForumPost = feed.items[0];
            client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastForumPost.link, lastForumPost.title, lastForumPost.contentSnippet.substr(0, 237) + '...', lastForumPost.creator, '', '', 'Brought to you by the dev forums'));
        }
    });
};

exports.parseStatus = () => {
    let p = new RSSParser();
    p.parseURL('https://devstatus.twitch.tv/history.rss', function(err, feed) {
        if(lastStatusPost == null) {
            //Startup
            lastStatusPost = feed.items[0];
        } else if(lastStatusPost.title === feed.items[0].title) {
            client.logger.log('Checked status update posts but found the same one');
        } else {
            lastStatusPost = feed.items[0];
            client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastStatusPost.link, lastStatusPost.title, lastStatusPost.contentSnippet.substr(0, 237) + '...', 'TwitchDev', '', '', 'Brought to you by dev.twitch.tv/status'));
        }
    });
};

exports.listen = () => {
    this.init;
    setInterval(this.init, 600000);
};