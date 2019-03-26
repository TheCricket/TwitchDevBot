module.exports = async client => {
    client.user.setActivity(`!help`, {type: "PLAYING"});
};