package io.chirpbot.twitchdev.handlers;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.twitch.BlogThread;
import io.chirpbot.twitchdev.twitch.StreamAnnouncementThread;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.ReadyEvent;

import java.util.Timer;
import java.util.TimerTask;

public class BlogHandler {

	@EventSubscriber
	public void onReady(ReadyEvent event) {
		if(!TwitchDev.DEBUG) {
			BlogThread blogThread = new BlogThread();

			Timer timer = new Timer();
			timer.scheduleAtFixedRate(new TimerTask() {
				@Override
				public void run() {
					blogThread.run();
				}
			}, 0, 1000 * 60 * 60);

			StreamAnnouncementThread streamAnnouncementThread = new StreamAnnouncementThread();
			streamAnnouncementThread.start();
		}
	}
}
