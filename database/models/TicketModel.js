const moment = require('moment');
module.exports = (sequelize, type) => {
  return sequelize.define('ticket', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user: type.STRING,
    assigned_to: type.STRING,
    created_at: {
      type: type.DATE,
      defaultValue: moment().date()
    },
    closed_at: {
      type: type.DATE,
      defaultValue: null
    },
    message_history: type.STRING,
  });
};
