const Discord = require('discord.js');
const {promisify} = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const functions = require('./modules/functions');
const Logger = require('./modules/Logger');

client = new Discord.Client();
client.logger = Logger;
client.commands = new Enmap();
client.aliases = new Enmap();
module.exports.createBot = async(baseDir) => {
  functions(baseDir, client);
  const cmdFiles = await readdir(`./${baseDir}/commands/`);
  cmdFiles.forEach(f => {
    if(!f.endsWith('.js')) return;
    const response = client.loadCommand(f);
    if(response) console.log(`[${process.id}] ${response}`);
  });

  const evtFiles = await readdir(`./${baseDir}/events/`);
  evtFiles.forEach(f => {
    const eventName = f.split('.')[0];
    const event = require(`../${baseDir}/events/${f}`);
    client.on(eventName, event.bind(null, client));
  });

  return client;
};

