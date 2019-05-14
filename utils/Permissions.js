module.exports.userHasRole = (member, roles) => {
    return member.roles.some(role => {
        return roles.includes(role.name);
    });
};

module.exports.appendRoles = (...args) => {
    let retVal = [];
    args.forEach(n => retVal.push(...(Array.isArray(n) ? n : [ n ])));
    return retVal;
};

module.exports.OWNER = 'Owner';
module.exports.STAFF = ['Twitch Staff', 'Amazon Staff'];
module.exports.ADMIN = 'Admin';
module.exports.MOD = 'Moderator';
module.exports.DEV = 'Verified Developer';
module.exports.BROADCASTER = 'Broadcaster';
module.exports.VANITY = ['PubSub King', 'TwitchCon 2019', 'Dev Tour 2019', 'Capitol Royale Hackathon 2018', 'Dev Day / TwitchCon 2018', 'Twitch Prime King'];
