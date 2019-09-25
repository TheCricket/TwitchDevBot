const RSSParser = require('rss-parser');
const EmbedBuilder = require('../utils/EmbedBuilder');

let lastBlogPost;
let lastForumPost;
let lastStatusPost;

let botTesting = '524833530656587777';
let announcements = '523673395221495808';

exports.init = function(client) {
    this.parseBlog(client);
    this.parseForums(client);
    this.parseStatus(client);
};

exports.parseBlog = function(client) {
    let parser = new RSSParser();
    parser.parseURL('http://blog.twitch.tv/feed', function(err, feed) {
        if(err) {
            console.log(err);
        } else {
            if (lastBlogPost == null) {
                //Startup
                lastBlogPost = feed.items[0];
            } else if (lastBlogPost.title === feed.items[0].title) {
                //Same post
                client.logger.log('Checked blog posts but found the same one');
            } else {
                //Send message to announcements
                lastBlogPost = feed.items[0];
                try {
                    client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastBlogPost.link, lastBlogPost.title, '', lastBlogPost.creator, '', '', 'Brought to you by blog.twitch.tv'));
                } catch(e) {
                    console.log(e);
                }
            }
        }
    });
};

exports.parseForums = function(client) {
    let par = new RSSParser();
    par.parseURL('https://discuss.dev.twitch.tv/c/announcements.rss', function(err, feed) {
        if(err) {
            console.log(err);
        } else {
            if (lastForumPost == null) {
                //Startup
                lastForumPost = feed.items[0];
            } else if (lastForumPost.title === feed.items[0].title) {
                //Same post
                client.logger.log('Checked forum posts but found the same one');
            } else {
                //Send message to announcements
                lastForumPost = feed.items[0];
                try {
                    client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastForumPost.link, lastForumPost.title, lastForumPost.contentSnippet.substr(0, 237) + '...', lastForumPost.creator, '', '', 'Brought to you by the dev forums'));
                } catch(e) {
                    console.log(e);
                }
            }
        }
    });
};

exports.parseStatus = function(client) {
    let p = new RSSParser();
    p.parseURL('https://devstatus.twitch.tv/history.rss', function(err, feed) {
        if(err) {
            console.log(err);
        } else {
            if (lastStatusPost == null) {
                //Startup
                lastStatusPost = feed.items[0];
            } else if (lastStatusPost.title === feed.items[0].title) {
                client.logger.log('Checked status update posts but found the same one');
            } else {
                lastStatusPost = feed.items[0];
                try {
                    client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastStatusPost.link, lastStatusPost.title, lastStatusPost.contentSnippet.substr(0, 237) + '...', 'TwitchDev', '', '', 'Brought to you by dev.twitch.tv/status'));
                } catch(e) {
                    console.log(e);
                }
            }
        }
    });
};

exports.listen = function(client) {
    exports.init(client);
    setInterval(function() {exports.init(client);}, 60000);
};
