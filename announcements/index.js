let Bot = require('../core/index');

process.on('message', function(message) {
  if(message.type === `shutdown`) {
    process.exit(0);
  }
});

module.exports.init = async() => {
  let client = await Bot.createBot('announcements');
  client.login(process.env.announcements_token);
};
