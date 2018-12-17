package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.twitch.Event;
import io.chirpbot.twitchdev.twitch.EventBuilder;
import io.chirpbot.twitchdev.twitch.Kraken;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.obj.IEmbed;

import java.awt.*;
import java.net.MalformedURLException;
import java.time.Instant;
import java.util.List;

public class CommandEvents implements ICommand {

	@Override
	public String getCommand() {
		return "!event";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		try {
			EventBuilder builder = new EventBuilder(Kraken.getEvents());
			Event event = builder.getEventList().get(Integer.valueOf(rawMessage.split(" ")[1]));
			MessageUtils.sendEmbed(info, new EmbedObject(
					new IEmbed() {
						@Override
						public String getTitle() {
							return event.getTitle();
						}

						@Override
						public String getType() {
							return null;
						}

						@Override
						public String getDescription() {
							return event.getDescription();
						}

						@Override
						public String getUrl() {
							return "https://www.twitch.tv/twitchdev";
						}

						@Override
						public Instant getTimestamp() {
							return Instant.now();
						}

						@Override
						public Color getColor() {
							return new Color(100, 65, 164);
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
									return event.getArtwork().toString().replace("{width}", "320").replace("{height}", "180");
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
									return "BlueLava";
								}

								@Override
								public String getUrl() {
									return "https://twitter.com/jbulava";
								}

								@Override
								public String getIconUrl() {
									return "https://static-cdn.jtvnw.net/jtv_user_pictures/60dab435-40e6-4fe8-b41c-0a1a0d03f8dd-profile_image-70x70.png";
								}
							};
						}

						@Override
						public List<IEmbedField> getEmbedFields() {
							return null;
						}
					}
			));
			MessageUtils.sendMessage(info, "@here Starting soon!");
			info.getMessage().delete();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}


	}
}
