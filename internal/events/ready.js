module.exports = async client => {
  await client.user.setActivity('for feedback!', { type: "WATCHING" });
};
