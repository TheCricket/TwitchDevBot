const Sequelize = require('sequelize');
const Analytics = require('./models/Analytics');
const Logger = require('../modules/Logger');
module.exports.sequelize = new Sequelize('analytics', process.env.db_user, process.env.db_pass, {
  host: process.env.db_host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: msg => Logger.debug(msg)
});

this.sequelize.authenticate().then(() => {
  Logger.log('Connection has been established successfully.');
  Analytics.init();
}).catch(err => {
  Logger.error(`Unable to connect to the database: ${err}`);
});

module.exports = {Analytics};
