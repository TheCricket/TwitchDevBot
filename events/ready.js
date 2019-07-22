module.exports = async client => {
    await client.user.setActivity(`!help`, { type: "PLAYING" });
};
