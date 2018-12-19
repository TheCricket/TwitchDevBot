package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.helpers.cURL;
import org.json.JSONArray;
import org.json.JSONObject;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.obj.IEmbed;

import java.awt.*;
import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class CommandGithub implements ICommand {

	private String url = "https://api.github.com/search/repositories";
	private HashMap<String, String> qString = new HashMap<>();

	@Override
	public String getCommand() {
		return "!github";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		qString.put("q", rawMessage.substring(getCommand().length() + 1));
		try {
			JSONObject searchResults = cURL.GET(url, qString);
			JSONArray items = searchResults.getJSONArray("items");
			Iterator i = items.iterator();
			JSONObject first = (JSONObject) i.next();
			JSONObject owner = first.getJSONObject("owner");
			MessageUtils.sendEmbed(info, new EmbedObject(new IEmbed() {
				@Override
				public String getTitle() {
					return first.getString("full_name");
				}

				@Override
				public String getType() {
					return null;
				}

				@Override
				public String getDescription() {
					return first.getString("description");
				}

				@Override
				public String getUrl() {
					return first.getString("html_url");
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
					return null;
				}

				@Override
				public IEmbedImage getThumbnail() {
					return null;
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
							return owner.getString("login");
						}

						@Override
						public String getUrl() {
							return owner.getString("url");
						}

						@Override
						public String getIconUrl() {
							return owner.getString("avatar_url");
						}
					};
				}

				@Override
				public List<IEmbedField> getEmbedFields() {
					return null;
				}
			}));

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}