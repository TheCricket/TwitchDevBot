let twitchcon = '2019-09-27 17:00';

module.exports.getTimeRemaining = () => {
  if(Date.parse(twitchcon) < Date.parse(new Date())) return null;
  let t = Date.parse(twitchcon) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
};

module.exports.updateTime = (client) => {
  let time = this.getTimeRemaining();
  if(time !== null) {
    if (time.days === 0) {
      if (time.hours === 1) {
        client.user.setActivity(`TwitchCon is ${time.hours} hour and ${time.minutes} minutes away!`, { type: "PLAYING" });
      } else if (time.hours === 0) {
        if (time.minutes === 0) {
          client.user.setActivity(`Enjoy TwitchCon!!!`, {type: 'PLAYING'})
        } else {
          client.user.setActivity(`TwitchCon is ${time.minutes} minutes away!`, { type: "PLAYING" });
        }
      } else {
        client.user.setActivity(`TwitchCon is ${time.hours} hours and ${time.minutes} minutes away!`, { type: "PLAYING" });
      }
    } else {
      client.user.setActivity(`TwitchCon is ${time.days} days and ${time.hours} hours away!`, { type: "PLAYING" });
    }
  }
};
