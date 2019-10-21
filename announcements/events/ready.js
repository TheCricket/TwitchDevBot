module.exports = async client => {
  await client.user.setActivity(`Twitch.tv/TwitchDev`, { type: "STREAMING" });
};
