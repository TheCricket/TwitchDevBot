const axios = require('axios');

module.exports = async (client, reaction) => {
  const message = reaction.message;
  reaction.users.forEach(u => {
    client.guilds.last().fetchMember(u).then(member => {
      member.roles.forEach(role => {
        if(role.name === 'Twitch Staff') {
          let urls = '';
          message.attachments.forEach(a => {
            urls +=`\n${a.url}`;
          });
          axios({
            method: 'post',
            url: process.env.slack_url,
            headers: {
              'Content-type': 'application/json'
            },
            data: {
            'attachments': [
              {
                'fallback': `${member.nickname} added feedback from ${message.channel}`,
                'color': '#772CE8',
                'pretext': `${member.nickname} added feedback from ${message.channel}`,
                'author_name': `${message.author.tag}`,
                'author_icon': `${message.author.avatarURL}`,
                'text': `${message}${urls}`,
                'fields': [
                  {
                    'title': 'Priority',
                    'value': reaction.emoji.id === '575729276863643649' ? 'Low' : 'High',
                    'short': false
                  }
                ],
                'footer': 'TwitchDev Slack Integration',
                'footer_icon': 'discord.gg/TwitchDev'
              }
            ]
          }
          });
        }
      })
    });
  })
};


