package io.chirpbot.twitchdev.twitch;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.helpers.rss.Feed;
import io.chirpbot.twitchdev.helpers.rss.FeedMessage;
import io.chirpbot.twitchdev.helpers.rss.RSSParser;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.obj.IEmbed;

import java.awt.*;
import java.time.Instant;
import java.util.List;

public class BlogThread {
	private final long CHANNEL_ANNOUNCEMENTS = 523673395221495808L;
	private final long CHANNEL_BOT_TEST = 524833530656587777L;

	private RSSParser parser;
	private FeedMessage latestFeed;

	public BlogThread() {
		parser = new RSSParser("https://blog.twitch.tv/feed");
		latestFeed = null;
	}

	public void run() {
		Feed feed = parser.readFeed();
		if(latestFeed != null && !latestFeed.equals(feed.getEntries().get(0))) {
			latestFeed = feed.getEntries().get(0);
			updateAnnouncements();
		} else if(latestFeed == null){
			latestFeed = feed.getEntries().get(0);
			updateAnnouncements();
		}
	}

	private void updateAnnouncements() {
		MessageUtils.sendMessage(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(CHANNEL_ANNOUNCEMENTS), "New Blog Post:");
		MessageUtils.sendEmbed(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(CHANNEL_BOT_TEST), new EmbedObject(new IEmbed() {
			@Override
			public String getTitle() {
				return latestFeed.getTitle();
			}

			@Override
			public String getType() {
				return null;
			}

			@Override
			public String getDescription() {
				return latestFeed.getDescription();
			}

			@Override
			public String getUrl() {
				return latestFeed.getLink();
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
						return latestFeed.getAuthor();
					}

					@Override
					public String getUrl() {
						return null;
					}

					@Override
					public String getIconUrl() {
						return null;
					}
				};
			}

			@Override
			public List<IEmbedField> getEmbedFields() {
				return null;
			}
		}));
	}
}
