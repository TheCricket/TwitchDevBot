module.exports = async client => {
  await client.user.setActivity('your questions!', { type: "Listening" });
};
