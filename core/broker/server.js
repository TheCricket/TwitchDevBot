const amqp = require('amqplib/callback_api');
const moment = require('moment');
const Logger = require('../modules/Logger');
const MessageType = require('./MessageType');
const Database = require('../db/index');

module.exports.init = () => {
  amqp.connect(process.env.host, (error0, connection) => {
    if(error0) throw error0;

    connection.createChannel((error1, channel) => {
      if(error1) throw error1;

      channel.assertQueue(process.env.queue, {durable: false});
      channel.consume(process.env.queue, (msg) => {
        switch(msg.content['type']) {
          case MessageType.REMOVE_MEMBER:
            updateMemberCount(false);
            break;
          case MessageType.ADD_MEMBER:
            updateMemberCount(true);
            break;
          case MessageType.TICKET_CREATED:
            addTicket();
            break;
          case MessageType.REQUEST_CREATED:
            addRequest();
            break;
          default:
            Logger.warn(`Someone sent a message with type ${msg.content['type']}`);
            break;
        }
        Logger.log(`Received ${msg.content.toString()}`);
      });
    })
  })
};

const updateMemberCount = (adding) => {
  Database.Analytics.findAll({
    where: {
      date: moment().format('yyyy-MM-dd')
    }
  }).then((analytics) => {
    Database.Analytics.update({
      userCount: adding? analytics[0].userCount + 1 : analytics[0].userCount - 1
    }, {
      where: {
        date: moment().format('yyyy-MM-dd')
      }
    }).then(() => {
      Logger.log(`Updated member count for ${moment().format('yyyy-MM-dd')}`);
    });
  });
};

const updateStaffMembers = (adding) => {
  Database.Analytics.findAll({
    where: {
      date: moment().format('yyyy-MM-dd')
    }
  }).then((analytics) => {
    Database.Analytics.update({
      staffMembers: adding? analytics[0].staffMembers + 1 : analytics[0].staffMembers - 1
    }, {
      where: {
        date: moment().format('yyyy-MM-dd')
      }
    }).then(() => {
      Logger.log(`Updated staff count for ${moment().format('yyyy-MM-dd')}`);
    });
  });
};

const addRequest = () => {
  Database.Analytics.findAll({
    where: {
      date: moment().format('yyyy-MM-dd')
    }
  }).then((analytics) => {
    Database.Analytics.update({
      requestsCreated: analytics[0].requestsCreated + 1
    }, {
      where: {
        date: moment().format('yyyy-MM-dd')
      }
    }).then(() => {
      Logger.log(`Updated requests count for ${moment().format('yyyy-MM-dd')}`);
    });
  });
};

const addTicket = () => {
  Database.Analytics.findAll({
    where: {
      date: moment().format('yyyy-MM-dd')
    }
  }).then((analytics) => {
    Database.Analytics.update({
      ticketsCreated: analytics[0].ticketsCreated + 1
    }, {
      where: {
        date: moment().format('yyyy-MM-dd')
      }
    }).then(() => {
      Logger.log(`Updated ticket count for ${moment().format('yyyy-MM-dd')}`);
    });
  });
};
