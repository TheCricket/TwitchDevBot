const db = require('../database/Database');
const moment = require('moment');

exports.Database = db;

/**
 * Returns all the active tickets in the database
 * @returns {Bluebird<TInstance[] | Model<any, any>[]>}
 */
exports.getActiveTickets = async () => {
  const Query = db.models.Query;
  return await Query.findAll({
    where: {
      Resolved: false
    }
  });
};

/**
 * Adds support admin to the database
 * @param username
 * @returns {Promise<boolean>} True = Added admin; False = Admin already exists
 */
exports.addSupportAdmin = async (username) => {
  const SupportAdmin = db.models.SupportAdmin;
  //Check if they exist
  await SupportAdmin.findOrCreate({
    where: {
      Name: username
    }
  }).then(([user, created]) => {
      return created;
  });
};


/**
 * Removes support admin from the database
 * @param username
 * @returns {Promise<boolean>} True = Deleted Admin; False = Admin doesn't exist
 */
exports.removeSupportAdmin = async (username) => {
  const SupportAdmin = db.models.SupportAdmin;
  await SupportAdmin.destroy({
    where: {
      Name: username
    }
  }).then((rowsDeleted) => {
    return rowsDeleted === 1;
  })
};

/**
 * Find admin and return them if they exist, null if they don't
 * @param username
 * @returns {Bluebird<TInstance | Model<any, any>>}
 */
exports.findSupportAdmin = async (username) => {
  const SupportAdmin = db.models.SupportAdmin;
  return await SupportAdmin.findOne({
    where: {
      Name: username
    }
  });
};

/**
 * Adds a ticket to the database
 * @param username Username of the one creating the ticket
 * @param message
 * @returns {Promise<boolean>}
 */
exports.createTicket = async (username, message) => {
  const Query = db.models.Query;
  const ticket = await Query.create({
    Name: username,
    OpenedAt: moment().format(),
    Message: message
  });

  return ticket !== null;
};

/**
 * Adds a ticket to the database
 * @param ticket Ticket Model
 * @param admin Admin Model
 * @param message
 * @returns {Promise<boolean>}
 */
exports.createReply = async (ticket, admin, message) => {
  const Reply = db.models.Reply;
  const reply = await Reply.create({
    QueryID: ticket.QueryID,
    Message: message,
    RepliedAt: moment().format(),
    RepliedBy: admin.AdminID
  });

  return reply !== null;
};

/**
 * Adds a category to the database
 * @param name
 * @returns {Promise<boolean>} True = Added Category; False = Category already exists
 */
exports.createCategory = async (name) => {
  const Category = db.models.Category;
  const category = await Category.create({
    CategoryName: name
  });

  return category !== null;
};

/**
 * Removes a category from the database
 * @param name
 * @returns {Promise<boolean>} True = Deleted Category; False = Category doesn't exist
 */
exports.removeCategory = async (name) => {
  const Category = db.models.Category;
  await Category.destroy({
    where: {
      CategoryName: name
    }
  }).then((rowsDeleted) => {
    return rowsDeleted === 1;
  })
};
