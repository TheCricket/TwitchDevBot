package io.chirpbot.twitchdev.twitch;

import org.joda.time.DateTime;

import java.net.URL;

public class Event {

	private DateTime startTime;
	private DateTime endTime;
	private String title;
	private String description;
	private URL artwork;

	public Event(DateTime startTime, DateTime endTime, String title, String description, URL artwork) {
		this.startTime = startTime;
		this.endTime = endTime;
		this.title = title;
		this.description = description;
		this.artwork = artwork;
	}

	public URL getArtwork() {
		return artwork;
	}

	public String getDescription() {
		return description;
	}

	public String getTitle() {
		return title;
	}

	public DateTime getEndTime() {
		return endTime;
	}

	public DateTime getStartTime() {
		return startTime;
	}
}
