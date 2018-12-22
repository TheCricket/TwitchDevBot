package io.chirpbot.twitchdev.helpers.rss;

public class FeedMessage {
	private String title, description, link, author, guid;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	@Override
	public boolean equals(Object obj) {
		return (this == obj) || this.guid.equals(((FeedMessage)obj).guid);
	}

	@Override
	public String toString() {
		return String.format("FeedMessage [title=%s, description=%s, link=%s, author=%s, guid=%s]", title, description, link, author, guid);
	}
}