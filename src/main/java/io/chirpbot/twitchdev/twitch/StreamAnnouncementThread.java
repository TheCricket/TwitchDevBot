package io.chirpbot.twitchdev.twitch;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.impl.obj.Embed;
import sx.blah.discord.handle.obj.IEmbed;

import java.awt.*;
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
				MessageUtils.sendMessage(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(523673395221495808L), "Hey everyone! TwitchDev is live with a new stream!");
				List<IEmbed.IEmbedField> fields = new ArrayList<>();
				fields.add(new Embed.EmbedField("Game", game.getString("name"), true));
				fields.add(new Embed.EmbedField("Viewers", String.valueOf(stream.get("viewer_count")), true));
				MessageUtils.sendEmbed(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(523673395221495808L), new EmbedObject(new IEmbed() {
					@Override
					public String getTitle() {
						return stream.getString("title");
					}

					@Override
					public String getType() {
						return null;
					}

					@Override
					public String getDescription() {
						return null;
					}

					@Override
					public String getUrl() {
						return "https://twitch.tv/twitchdev";
					}

					@Override
					public Instant getTimestamp() {
						return Instant.now();
					}

					@Override
					public Color getColor() {
						return null;
					}

					@Override
					public IEmbedFooter getFooter() {
						return null;
					}

					@Override
					public IEmbedImage getImage() {
						return new IEmbedImage() {
							@Override
							public String getUrl() {
								return "https://static-cdn.jtvnw.net/previews-ttv/live_user_twitchdev-320x180.jpg";
							}

							@Override
							public int getHeight() {
								return 180;
							}

							@Override
							public int getWidth() {
								return 320;
							}
						};
					}

					@Override
					public IEmbedImage getThumbnail() {
						return new IEmbedImage() {
							@Override
							public String getUrl() {
								return user.getString("profile_image_url");
							}

							@Override
							public int getHeight() {
								return 80;
							}

							@Override
							public int getWidth() {
								return 80;
							}
						};
					}

					@Override
					public IEmbedVideo getVideo() {
						return null;
					}

					@Override
					public IEmbedProvider getEmbedProvider() {
						return null;
					}

					@Override
					public IEmbedAuthor getAuthor() {
						return new IEmbedAuthor() {
							@Override
							public String getName() {
								return user.getString("display_name");
							}

							@Override
							public String getUrl() {
								return "https://www.twitch.tv/twitchdev";
							}

							@Override
							public String getIconUrl() {
								return user.getString("profile_image_url");
							}
						};
					}

					@Override
					public List<IEmbedField> getEmbedFields() {
						return fields;
					}
				}));
			}
			try {
				sleep(600000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
