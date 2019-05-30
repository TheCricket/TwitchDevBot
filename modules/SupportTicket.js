//523675188219609138
const{Ticket} = require('../database/Database');
const EmbedBuilder = require('../utils/EmbedBuilder');

exports.createTicket = function(client, message) {
  let user = client.guilds.last().fetchMember(message.author);
  if(user != null) {
    Ticket.create({
      user: user.displayName,
      assigned_to: 'Unclaimed',
      message_history: `${user.displayName}: "${message.content}"`
    });
  }
};

exports.updateForCase = function(client, id) {
  Ticket.findOne({
    where: {
      id: id
    }
  }).then(ticket => {
    if(ticket.closed_at !== null) {

    } else {
      client.guilds.last().channels.get('523675188219609138').send(`Ticket #${id} Closed`);
    }
  });
};
