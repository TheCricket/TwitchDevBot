const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const RSSParser = require('rss-parser');
const EmbedBuilder = require('./utils/EmbedBuilder');

const client = new Discord.Client();
client.logger = require("./modules/Logger");
require('./modules/functions')(client);

client.commands = new Enmap();
client.aliases = new Enmap();

let lastBlogPost;
let lastForumPost;

let botTesting = '524833530656587777';
let announcements = '523673395221495808';

console.log(`We are in ${process.env.ENV}`);

const feeds = () => {
    parseBlog();
    parseForums();
};

const parseBlog = () => {
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
            client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastBlogPost.link, lastBlogPost.title, '', lastBlogPost.creator, '', '', true));
        }
    });
};

const parseForums = () => {
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
            client.channels.get(`${process.env.ENV === 'development' ? botTesting : announcements}`).send(EmbedBuilder.buildRichEmbed(lastForumPost.link, lastForumPost.title, lastForumPost.contentSnippet.substr(0, 237) + '...', lastForumPost.creator, '', '', false));
        }
    });
};

const init = async () => {
    const cmdFiles = await readdir("./commands/");
    client.logger.log( `Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
       if(!f.endsWith('.js')) return;
       const response = client.loadCommand(f);
       if(response) console.log(response);
    });

    const evtFiles = await readdir("./events/");
    client.logger.log( `Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(f => {
        const eventName = f.split('.')[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${f}`);
        client.on(eventName, event.bind(null, client));
    });

    client.login(process.env.TOKEN);
};

feeds();
setInterval(feeds, 600000);

init();