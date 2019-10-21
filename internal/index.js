let Bot = require('../core/index');

process.on('message', function(message) {
  if(message.type === `shutdown`) {
    process.exit(0);
  }
});

module.exports.init = async() => {
  let client = await Bot.createBot('internal');
  client.login(process.env.slack_token);
};
