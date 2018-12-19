package io.chirpbot.twitchdev.handlers;

import io.chirpbot.twitchdev.twitch.BlogThread;
import io.chirpbot.twitchdev.twitch.StreamAnnouncementThread;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.ReadyEvent;

public class ReadyHandler {

	@EventSubscriber
	public void onReady(ReadyEvent event) {
		BlogThread blogThread = new BlogThread();
		blogThread.start();

		StreamAnnouncementThread streamAnnouncementThread = new StreamAnnouncementThread();
		streamAnnouncementThread.start();
	}
}
