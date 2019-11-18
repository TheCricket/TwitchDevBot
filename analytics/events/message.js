module.exports = async (client, message) => {
  if(message.author.bot) return;

  if(message.guild) {
    let author = await client.guilds.last().fetchMember(message.author).then();
    let roles = author.roles;
    let tag = author.tag;
    let name = author.displayName;
    let timestamp = message.createdAt;
  }
};
