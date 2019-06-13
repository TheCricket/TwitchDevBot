const Categories = require('../utils/Categories');
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
app.use(passport.initialize());
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
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

app.get('/auth/twitch', passport.authenticate('twitch', {scope: process.env.SCOPE}));
app.get('/auth/twitch/callback', passport.authenticate('twitch', {successRedirect: `/auth/success`, failureRediredct: '/auth/failure'}));
app.get('/auth/success', (req, res) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${req.session.passport.user.accessToken}`
        }
    };
    axios.get('https://api.twitch.tv/helix/analytics/extensions', config).then((response) => {
        response.acknowledge();
        if(response.status === 200) {
            console.log(id);
            client.fetchUser(id).then((user) => {
                console.log(`Adding role to ${user.tag}`);
                client.guilds.last().fetchMember(user).then((member) => {
                    client.guilds.last().roles.forEach(role => {
                        if(role.name === 'Extension Developer') {
                            member.addRole(role.id);
                        }
                    });
                });
            });
        }
    }).catch((error) => {

    });

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
                        }
                    });
                });
            });
        }
    }).catch((error) => {

    });
    res.redirect('http://link.twitch.tv/devchat');
});

app.get('/auth/failure', (req, res) => {

});

app.listen(port, () => console.log(`TwitchDevBot listening on port ${port}!`));


exports.run = async (c, message, args) => {
    client = c;
    message.author.createDM().then((channel) => {
        id = message.author.id;
        channel.send('http://217beb77.ngrok.io/auth/twitch');
    });
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'link',
    category: Categories.UTILITIES,
    description: `Link your Twitch Account! You can specifically link your account as 'game' or 'extension' by adding the type or leave it blank to simply link accounts`,
    usage: '!link <type>'
};
