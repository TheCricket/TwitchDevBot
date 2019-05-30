const Sequelize = require('sequelize');
const TicketModel = require('./models/TicketModel');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgresql'
});

const Ticket = TicketModel(sequelize, Sequelize);

sequelize.sync({force: true}).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Ticker
};
