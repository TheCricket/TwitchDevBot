package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.twitch.Helix;
import org.json.JSONArray;
import org.json.JSONObject;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.impl.obj.Embed;
import sx.blah.discord.handle.obj.IEmbed;

import java.awt.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CommandTest implements ICommand {
	private HashMap<String, String> qStringStreams = new HashMap<>();
	private HashMap<String, String> qStringUsers = new HashMap<>();
	private HashMap<String, String> qStringGames = new HashMap<>();

	public CommandTest() {

	}

	@Override
	public String getCommand() {
		return "!test";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		qStringStreams.put("user_login", rawMessage.split(" ")[1]);
		qStringUsers.put("login", rawMessage.split(" ")[1]);

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

		MessageUtils.sendMessage(info, "Hey everyone! " + rawMessage.split(" ")[1] + " is live with a new stream!");
		List<IEmbed.IEmbedField> fields = new ArrayList<>();
		fields.add(new Embed.EmbedField("Game", game.getString("name"), true));
		fields.add(new Embed.EmbedField("Viewers", String.valueOf(stream.get("viewer_count")), true));
		MessageUtils.sendEmbed(info, new EmbedObject(new IEmbed() {
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
				return "https://twitch.tv/" + rawMessage.split(" ")[1];
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
						return "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + rawMessage.split(" ")[1] + "-320x180.jpg";
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
						return "https://www.twitch.tv/" + rawMessage.split(" ")[1];
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
}
