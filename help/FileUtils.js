const {promises: fs} = require('fs');
const databasePath = './data/help_database.json';
const database = require('../data/help_database.json');

let updateFile = () => {
  return fs.writeFile(databasePath, JSON.stringify(database));
};

module.exports.updateRequests = (data) => {
  database.requests = data;
  updateFile();
};

module.exports.updateActiveRequests = (data) => {
  Object.assign(database.active, data);
  updateFile();
};

module.exports.getTotalRequests = () => {
  return database.requests;
};

module.exports.getActiveRequests = () => {
  return database.active;
};
