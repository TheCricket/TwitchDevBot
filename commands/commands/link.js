const Categories = require('../../core/utils/Categories');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const axios = require('axios');

let id = '';
let client = {};

const app = express();
const port = 3000;
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize({}));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('twitch_extension', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    state: id
}, (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    done(null, profile);
}));

passport.use('twitch_game', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: process.env.CLIENT_ID_GAMES,
    clientSecret: process.env.CLIENT_SECRET_GAMES,
    callbackURL: process.env.REDIRECT_URI_GAMES,
    state: id
}, (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    done(null, profile);
}));

app.get('/auth/twitch', passport.authenticate('twitch_extension', {scope: process.env.SCOPE}));
app.get('/auth/twitch/callback', passport.authenticate('twitch_extension', {successRedirect: `/auth/success`, failureRediredct: '/auth/failure'}));

app.get('/auth/game', passport.authenticate('twitch_game', {scope: process.env.SCOPE}));
app.get('/auth/game/callback', passport.authenticate('twitch_game', {successRedirect: `/auth/game/success`, failureRediredct: '/auth/game/failure'}));

app.get('/auth/success', (req, res) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${req.session.passport.user.accessToken}`
        }
    };
    axios.get('https://api.twitch.tv/helix/analytics/extensions', config).then((response) => {
        if(response.status === 200) {
            console.log(id);
            client.fetchUser(id).then((user) => {
                console.log(`Adding role to ${user.tag}`);
                client.guilds.last().fetchMember(user).then((member) => {
                    client.guilds.last().roles.forEach(role => {
                        if(role.name === 'Extension Developer') {
                            member.addRole(role.id);
                            member.createDM().then((channel) => {
                                channel.send('Added role: Extension Developer');
                                res.redirect('http://link.twitch.tv/devchat');
                            })
                        }
                    });
                });
            });
        } else {
            client.guilds.last().fetchMember(user).then((member) => {
                member.createDM().then((channel) => {
                    channel.send(`It seems you don't have a released extension`);
                    res.redirect('http://link.twitch.tv/devchat');
                })
            });
        }
    }).catch((error) => {
    });
});

app.get('/auth/game/success', (req, res) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${req.session.passport.user.accessToken}`
        }
    };
    axios.get('https://api.twitch.tv/helix/analytics/games', config).then((response) => {
        response.acknowledge();
        if(response.status === 200) {
            console.log(id);
            client.fetchUser(id).then((user) => {
                console.log(`Adding role to ${user.tag}`);
                client.guilds.last().fetchMember(user).then((member) => {
                    client.guilds.last().roles.forEach(role => {
                        if(role.name === 'Game Developer') {
                            member.addRole(role.id);
                            member.createDM().then((channel) => {
                                channel.send('Added role: Game Developer');
                                res.redirect('http://link.twitch.tv/devchat');
                            })
                        }
                    });
                });
            });
        } else {
            client.guilds.last().fetchMember(user).then((member) => {
                member.createDM().then((channel) => {
                    channel.send(`It seems you don't have a released game`);
                    res.redirect('http://link.twitch.tv/devchat');
                })
            });
        }
    }).catch((error) => {
    });
});

app.get('/auth/failure', (req, res) => {

});

app.get('/auth/game/failure', (req, res) => {

});

app.listen(port, () => console.log(`TwitchDevBot listening on port ${port}!`));


exports.run = async (c, message, args) => {
    client = c;
    message.author.createDM().then((channel) => {
        if(args.length === 1) {
            id = message.author.id;
            channel.send('http://167.99.15.68:3000/auth/game');
        } else {
            id = message.author.id;
            channel.send('http://167.99.15.68:3000/auth/twitch');
        }
    });
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: []
};

exports.help = {
    name: 'link',
    category: Categories.UTILITIES,
    description: `Have you released an extension? Link your account with this command to give yourself a special badge! If you've released a game do '!link game' instead :)`,
    usage: '!link <type>'
};
