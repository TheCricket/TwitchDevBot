const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('../index').sequelize;
const Logger = require('../../modules/Logger');
const Model = Sequelize.Model;

//Members Graph - Probably will end up not using
class Members extends Model {}
Members.init({
  joinedAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  messageCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  roles: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize, modelName: 'members'
});

//Main Analytics
class Activity extends Model {}
Activity.init({
  userCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  messageCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  avgOnlineUsers: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  staffMembers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ticketsCreated: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  requestsCreated: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: moment().format('yyyy-MM-dd')
  }
}, {
  sequelize, modelName: 'activity'
});

class Channels extends Model {}
Channels.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  messageCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  archived: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  archivedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  isVoice: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize, modelName: 'channels'
});

module.exports = {Members, Activity, Channels};
module.exports.init = () => {
  Members.sync({force: true}).then(() => {
    Logger.log('Members synced');
  });

  Activity.sync({force: true}).then(() => {
    Logger.log('Activity synced');
  });

  Channels.sync({force: true}).then(() => {
    Logger.log('Channels synced');
  })
};
