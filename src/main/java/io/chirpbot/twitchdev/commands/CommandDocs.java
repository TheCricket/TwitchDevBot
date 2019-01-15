package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.commands.utils.ICommand;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.helpers.crawler.Spider;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.impl.obj.Embed;
import sx.blah.discord.handle.obj.IEmbed;
import sx.blah.discord.util.EmbedBuilder;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class CommandDocs implements ICommand {
	@Override
	public String getCommand() {
		return "!docs";
	}

	@Override
	public List<String> getAliases() {
		return null;
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		info.getChannel().setTypingStatus(true);
		StringBuilder searchBuilder = new StringBuilder();
		List<String> parts = new LinkedList<>(Arrays.asList(rawMessage.substring(getCommand().length() + 1).split(" ")));
		parts.forEach(searchBuilder::append);
		String searchTerm = searchBuilder.toString().substring(0, searchBuilder.toString().length() - 1).toLowerCase();
		Spider spider = new Spider();
		List<String> sites = spider.search("https://dev.twitch.tv/docs/", searchTerm);
		if(!sites.isEmpty()) {
			sites.forEach(site -> TwitchDev.getLogger().info(site));
			List<IEmbed.IEmbedField> fields = new ArrayList<>();
			sites.forEach(site -> fields.add(new Embed.EmbedField("Url", site, true)));
			EmbedBuilder builder = new EmbedBuilder()
					.withTimestamp(Instant.now())
					.withTitle("Documentation Search Results:");
			fields.forEach(builder::appendField);
			MessageUtils.sendEmbed(info, builder.build());
		} else {
			MessageUtils.sendMessage(info, String.format("Sorry %s, I wasn't able to find anything on %s", info.getAuthor(), searchTerm));
		}
		info.getChannel().setTypingStatus(false);
	}
}
