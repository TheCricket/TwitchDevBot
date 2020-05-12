const {promises: fs} = require('fs');
const helpDatabasePath = './data/help_database.json';
const regexDatabasePath = './data/regex_database.json';
const helpDatabase = require('../../data/help_database.json');
const regexDatabase = require('../../data/regex_database.json');

let updateFile = (databasePath, database) => {
  return fs.writeFile(databasePath, JSON.stringify(database));
};

module.exports.updateRequests = (data) => {
  helpDatabase.requests = data;
  updateFile(helpDatabasePath, helpDatabase);
};

module.exports.updateActiveRequests = (data) => {
  Object.assign(helpDatabase.active, data);
  updateFile(helpDatabasePath, helpDatabase);
};

module.exports.getTotalRequests = () => {
  return helpDatabase.requests;
};

module.exports.getActiveRequests = () => {
  return helpDatabase.active;
};

module.exports.addRegex = (allow, regex) => {
  allow ? regexDatabase.allow.push(regex) : regexDatabase.deny.push(regex);
  updateFile(regexDatabasePath, JSON.stringify(regexDatabase));
}

module.exports.removeRegex = (regex) => {
  regexDatabase.allow =  regexDatabase.allow.filter(a => a !== regex);
  regexDatabase.deny = regexDatabase.deny.filter(d => d !== regex);
  updateFile(regexDatabasePath, JSON.stringify(regexDatabase));
}

module.exports.getRegex = () => {
  return regexDatabase;
}
