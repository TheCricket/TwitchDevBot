exports.fetchAuthURLForExtensions = (discordID) => {
    return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}/${discordID}&response_type=code&scope=${process.env.SCOPE_EXTENSIONS}&state=extensions`;
};

exports.fetchAuthURLForGames = (discordID) => {
    return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}/${discordID}&response_type=code&scope=${process.env.SCOPE_GAMES}&state=games`;
};

exports.fetchAccessTokenURL = (code, state) => {
    return `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}&state=${state}`;
};
