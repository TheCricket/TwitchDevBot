let Bot = require('../core/index');
let client = {};

process.on('message', function(message) {
  if(message.type === `shutdown`) {
    process.exit(0);
  }
});

module.exports.init = async() => {
  client = await Bot.createBot('commands');
  client.login(process.env.commmands_token);
};
