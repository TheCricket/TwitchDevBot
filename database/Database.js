const Sequelize = require('sequelize');
const modelFolder = require('./models');
const models = {};

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgresql'
});

for(const model in modelFolder) {
  models[model] = connection.define(model, modelFolder[name]);
}

connection.sync({force: true}).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  connection, models
};
