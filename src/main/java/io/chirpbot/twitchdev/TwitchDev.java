package io.chirpbot.twitchdev;

import io.chirpbot.twitchdev.amazon.AWS;
import io.chirpbot.twitchdev.commands.CommandList;
import io.chirpbot.twitchdev.handlers.AutoMod;
import io.chirpbot.twitchdev.handlers.MessageHandler;
import io.chirpbot.twitchdev.handlers.RankHandler;
import io.chirpbot.twitchdev.secret.Secret;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sx.blah.discord.api.ClientBuilder;
import sx.blah.discord.api.IDiscordClient;
import sx.blah.discord.api.events.EventDispatcher;
import sx.blah.discord.util.DiscordException;

public class TwitchDev {

	private static final String token = Secret.token;
	private static final boolean login = true;
	private static IDiscordClient bot;
	private static final Logger logger = LoggerFactory.getLogger(TwitchDev.class);
	public static AWS aws = new AWS();
	public static CommandList commands = new CommandList();

	public static void main(String[] args) {
		bot = createClient(token, login);
		if (bot != null) {
			EventDispatcher dispatcher = bot.getDispatcher();
			dispatcher.registerListener(new MessageHandler());
			dispatcher.registerListener(new AutoMod());
			dispatcher.registerListener(new RankHandler());
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
}