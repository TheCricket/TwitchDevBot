module.exports.userHasRole = (member, roles) => {
    if(roles.length === 0) return true;
    let bool = false;
    let iterator = member.roles.values();
    for(let c = 0; c < member.roles.size; c++) {
        let name = iterator.next().value.name;
        if(roles.includes(name)) {
            console.log(`${roles} includes ${name}`);
            bool = true;
        }
    }
    return bool;
};

module.exports.OWNER = 'Owner';
module.exports.STAFF = ['Twitch Staff', 'Amazon Staff', 'TwitchCon Hackathon Staff'];
module.exports.ADMIN = 'Admin';
module.exports.MOD = 'Moderator';
module.exports.DEV = ['Developer', 'Extension Developer', 'Game Developer'];
module.exports.BROADCASTER = 'Broadcaster';
module.exports.VANITY = [
  'PubSub King',
  'TwitchCon Hackathon 2019',
  'TwitchCon 2019',
  'Dev Tour 2019',
  'Capitol Royale Hackathon 2018',
  'Dev Day / TwitchCon 2018',
  'Twitch Prime King'
];

module.exports.appendRoles = (...args) => {
    let retVal = [];
    args.forEach(n => retVal.push(...(Array.isArray(n) ? n : [ n ])));
    return retVal;
};
