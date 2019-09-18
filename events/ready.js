const Updater = require('../utils/updateTitle');
module.exports = async client => {
    setInterval(() => {
        Updater.updateTime(client)
    }, 60 * 1000);
    Updater.updateTime(client);
    //await client.user.setActivity(`!help`, { type: "PLAYING" });
};
