package io.chirpbot.twitchdev.helpers.rss;

import java.util.ArrayList;
import java.util.List;

public class Feed {
	private final String title;
	private final String link;
	private final String description;
	private final String language;
	private final String copyright;
	private final String pubDate;
	private final List<FeedMessage> entries = new ArrayList<>();

	public Feed(String title, String link, String description, String language, String copyright, String pubDate) {
		this.title = title;
		this.link = link;
		this.description = description;
		this.language = language;
		this.copyright = copyright;
		this.pubDate = pubDate;
	}

	public String getTitle() {
		return title;
	}

	public String getLink() {
		return link;
	}

	public String getDescription() {
		return description;
	}

	public String getLanguage() {
		return language;
	}

	public String getCopyright() {
		return copyright;
	}

	public String getPubDate() {
		return pubDate;
	}

	public List<FeedMessage> getEntries() {
		return entries;
	}

	@Override
	public String toString() {
		return String.format("Feed [copyright=%s, description=%s, language=%s, link=%s, pubDate=%s, title=%s]", copyright, description, language, link, pubDate, title);
	}
}
