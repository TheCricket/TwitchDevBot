package io.chirpbot.twitchdev.twitch;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import sx.blah.discord.handle.impl.obj.Embed;
import sx.blah.discord.handle.obj.IEmbed;
import sx.blah.discord.util.EmbedBuilder;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class StreamAnnouncementThread extends Thread {
	private boolean isLive = false;
	private HashMap<String, String> qStringStreams = new HashMap<>();
	private HashMap<String, String> qStringUsers = new HashMap<>();
	private HashMap<String, String> qStringGames = new HashMap<>();

	public StreamAnnouncementThread() {
		qStringStreams.put("user_login", "twitchdev");
		qStringUsers.put("login", "twitchdev");
	}

	@Override
	public void run() {
		while (true) {
			JSONObject streams = Helix.getStreams(qStringStreams);
			JSONArray data = streams.getJSONArray("data");
			JSONObject stream = data.getJSONObject(0);

			JSONObject users = Helix.getUsers(qStringUsers);
			JSONArray data2 = users.getJSONArray("data");
			JSONObject user = data2.getJSONObject(0);

			qStringGames.put("id", stream.getString("game_id"));
			JSONObject games = Helix.getGames(qStringGames);
			JSONArray data3 = games.getJSONArray("data");
			JSONObject game = data3.getJSONObject(0);

			if(stream.getString("type").equals("live") && !isLive) {
				isLive = true;
				MessageUtils.sendMessage(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(TwitchDev.getAnnouncementChannel()), "Hey everyone! TwitchDev is live with a new stream!");
				List<IEmbed.IEmbedField> fields = new ArrayList<>();
				fields.add(new Embed.EmbedField("Game", game.getString("name"), true));
				fields.add(new Embed.EmbedField("Viewers", String.valueOf(stream.get("viewer_count")), true));
				EmbedBuilder builder = new EmbedBuilder()
						.withTitle(stream.getString("title"))
						.withUrl("https://www.twitch.tv/twitchdev")
						.withTimestamp(Instant.now())
						.withImage("https://static-cdn.jtvnw.net/previews-ttv/live_user_twitchdev-320x180.jpg")
						.withThumbnail(user.getString("profile_image_url"))
						.withAuthorName(user.getString("display_name"))
						.withAuthorUrl("https://www.twitch.tv/twitchdev")
						.withAuthorIcon(user.getString("profile_image_url"));
				fields.forEach(builder::appendField);

				MessageUtils.sendEmbed(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(TwitchDev.getAnnouncementChannel()), builder.build());
			}
			try {
				sleep(600000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
