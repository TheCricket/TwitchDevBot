package io.chirpbot.twitchdev;

import io.chirpbot.twitchdev.commands.api.CommandBootstrapper;
import io.chirpbot.twitchdev.commands.api.CommandListener;
import io.chirpbot.twitchdev.commands.utils.CommandList;
import io.chirpbot.twitchdev.handlers.MessageHandler;
import io.chirpbot.twitchdev.handlers.RankHandler;
import io.chirpbot.twitchdev.handlers.BlogHandler;
import io.chirpbot.twitchdev.secret.Secret;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sx.blah.discord.api.ClientBuilder;
import sx.blah.discord.api.IDiscordClient;
import sx.blah.discord.api.events.EventDispatcher;
import sx.blah.discord.handle.obj.StatusType;
import sx.blah.discord.util.DiscordException;

public class TwitchDev {

	private static final String token = Secret.token;   // TODO: To config.yml
	private static final boolean login = true;
	private static IDiscordClient bot;
	private static final Logger logger = LoggerFactory.getLogger(TwitchDev.class);
	@Deprecated
	public static CommandList commands = new CommandList();
	public static boolean DEBUG;   // TODO: To config.yml

	private static final long CHANNEL_ANNOUNCEMENTS = 523673395221495808L;   // TODO: To config.yml
	private static final long CHANNEL_BOT_TEST = 524833530656587777L;   // TODO: To config.yml

	public static void main(String[] args) {
		bot = createClient(token, login);
		if (bot != null) {
			EventDispatcher dispatcher = bot.getDispatcher();
			dispatcher.registerListener(new MessageHandler());
			//dispatcher.registerListener(new AutoMod());
			dispatcher.registerListener(new RankHandler());
			dispatcher.registerListener(new BlogHandler());
//			dispatcher.registerListener(new CommandBootstrapper("!", new CommandListener()));


			if(args[0].equals("debug")) {
				DEBUG = true;
				bot.changeStreamingPresence(StatusType.ONLINE, "Debug Mode", "twitch.tv/twitchdev");
			} else {
				DEBUG = false;
			}
		} else {
			throw new NullPointerException("Failed to initialize bot");
		}
	}

	private static IDiscordClient createClient(String token, boolean login) {
		ClientBuilder builder = new ClientBuilder();
		builder.withToken(token);
		try {
			return login ? builder.login() : builder.build();
		} catch(DiscordException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static IDiscordClient getBot() {
		return bot;
	}

	public static Logger getLogger() {
		return logger;
	}

	public static long getTestChannel() {
		return CHANNEL_BOT_TEST;
	}

	public static long getAnnouncementChannel() {
		return CHANNEL_ANNOUNCEMENTS;
	}
}