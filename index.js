const http= require('http');
const { readdir0 } = require('fs');
const { promisify } = require('util');
const Discord = require('discord.js');
const modules = require('./modules/Logger');
const RSSFeeds = require('./modules/RSSFeeds');
const functions = require('./modules/functions');
const Enmap = require('enmap');

const readdir = promisify(readdir0.readdir);
const client = new Discord.Client();
client.logger = modules;
functions(client);
client.commands = new Enmap();
client.aliases = new Enmap();

console.log(`We are in ${process.env.ENV}`);

http.createServer(function(req, res) {
    res.end();
}).listen(8080);

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

RSSFeeds.listen(client);
init();
