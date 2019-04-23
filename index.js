const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const http = require('http');

const client = new Discord.Client();
client.logger = require('./modules/Logger');
require('./modules/functions')(client);
const RSSFeeds = require('./modules/RSSFeeds');
const WebHook = require('node-webhooks');
const EmbedBuilder = require("./utils/EmbedBuilder");

client.commands = new Enmap();
client.aliases = new Enmap();

console.log(`We are in ${process.env.ENV}`);

http.createServer(function(req, res) {
    res.end();
}).listen(8080);

const webHook = new WebHook();
webHook.add('twitchAlerts', 'https://api.twitch.tv/helix/webhooks/hub').then(function() {
    client.logger.log('Added webhooks hub');
}).catch(function(err) {
    client.logger.error(err);
});
webHook.trigger('twitchAlerts', {
   'hub.callback': 'http://167.99.15.68:8080',
    'hub.mode': 'subscribe',
    'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=141981764'
    'hub.lease_seconds': '864000'
});
const emitter = webHook.getEmitter();

emitter.on('*', function(shortname, statusCode, body) {
    const json = JSON.parse(body);
    const data = json.data[0];
    client.channels.get(`${process.env.ENV === 'development' ? '524833530656587777' : '523673395221495808'}`).send(EmbedBuilder.buildRichEmbed('https://www.twitch.tv/twitchdev', data.title, 'TwitchDev is now live!', 'TwitchDev', 'https://static-cdn.jtvnw.net/jtv_user_pictures/twitchdev-profile_image-d2f9d60c77c1505a-70x70.png', data.thumbnail_url));
});

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

RSSFeeds.listen();
init();
