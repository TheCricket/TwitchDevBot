const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Discord = require('discord.js');
const modules = require('./modules/Logger');
const RSSFeeds = require('./modules/RSSFeeds');
const functions = require('./modules/functions');
const TwitchAPI = require('./utils/TwitchAPI');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const Enmap = require('enmap');
require('dotenv').config();

const app = express();
const port = 3000;
app.listen(port, () => console.log(`TwitchDevBot listening on port ${port}!`));

const client = new Discord.Client();
client.logger = modules;
functions(client);
client.commands = new Enmap();
client.aliases = new Enmap();

console.log(`We are in ${process.env.ENV}`);

app.get('/auth', (req, res) => {
    if(req.query.code !== null) {
        const url = TwitchAPI.fetchAccessTokenURL(req.query.code, req.query.state);
        axios.post(url);
        res.redirect('https://link.twitch.tv/devchat');
    } else {
        const json = req.body;
        const access_token = json.access_token;
        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };
        const type = req.query.state.split('+')[0];
        const discordID = req.query.state.split('+')[1];
        if (type === 'extensions') {
            axios.get('https://api.twitch.tv/helix/analytics/extensions', config).then((response) => {
                const json = JSON.parse(response.data);
                if (json.data !== []) {
                    client.fetchUser(discordID).then((user) => {
                        logger.log(`Adding role to ${user.tag}`);
                        client.guilds.last().fetchMember(user).then((member) => {
                            client.guilds.last().roles.forEach(role => {
                                if(role.name === 'Extension Developer') {
                                    member.addRole(role.id);
                                }
                            });
                        });
                    });
                }
            });
        } else {
            axios.get('https://api.twitch.tv/helix/analytics/games', config).then((response) => {
                const json = JSON.parse(response.data);
                if (json.data !== []) {
                    client.fetchUser(discordID).then((user) => {
                        logger.log(`Adding role to ${user.tag}`);
                        client.guilds.last().fetchMember(user).then((member) => {
                            client.guilds.last().roles.forEach(role => {
                                if(role.name === 'Game Developer') {
                                    member.addRole(role.id);
                                }
                            });
                        });
                    });
                }
            });
        }
    }
});

const init = async () => {
    const cmdFiles = await readdir('./commands/');
    client.logger.log( `Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
       if(!f.endsWith('.js')) return;
       const response = client.loadCommand(f);
       if(response) console.log(response);
    });

    const evtFiles = await readdir('./events/');
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
