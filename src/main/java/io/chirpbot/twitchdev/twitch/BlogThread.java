package io.chirpbot.twitchdev.twitch;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.helpers.rss.Feed;
import io.chirpbot.twitchdev.helpers.rss.FeedMessage;
import io.chirpbot.twitchdev.helpers.rss.RSSParser;
import sx.blah.discord.util.EmbedBuilder;

import java.time.Instant;

public class BlogThread {

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
		MessageUtils.sendMessage(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(TwitchDev.getAnnouncementChannel()), "New Blog Post:");
		EmbedBuilder builder = new EmbedBuilder()
				.withTimestamp(Instant.now())
				.withDescription(latestFeed.getDescription())
				.withTitle(latestFeed.getTitle())
				.withUrl(latestFeed.getLink())
				.withAuthorName(latestFeed.getAuthor());
		MessageUtils.sendEmbed(TwitchDev.getBot().getGuilds().get(0), TwitchDev.getBot().getChannelByID(TwitchDev.getAnnouncementChannel()), builder.build());
	}
}
