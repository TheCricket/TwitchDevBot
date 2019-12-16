const amqp = require('amqplib/callback_api');
const Logger = require('../modules/Logger');
const MessageType = require('./MessageType');
let channel;

/*amqp.connect(process.env.host, (error0, connection) => {
  if(error0) throw error0;
  connection.createChannel(process.env.queue, (error1, channel) => {
    if(error1) throw error1;
    channel.assertQueue(process.env.queue, {durable: false});
    this.channel = channel;
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});*/

module.exports.sendMessage = (data) => {
  Logger.log(`Sending ${data} to master`);
  channel.sendToQueue(process.env.queue, Buffer.from(data));
};
module.exports = {MessageType};
