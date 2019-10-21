let Bot = require('../core/index');

process.on('message', function(message) {
  if(message.type === `shutdown`) {
    process.exit(0);
  }
});

module.exports.init = async() => {
  let client = await Bot.createBot('help');
  client.login(process.env.help_token);
};
