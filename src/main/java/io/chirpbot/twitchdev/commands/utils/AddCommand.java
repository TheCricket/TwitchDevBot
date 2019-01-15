package io.chirpbot.twitchdev.commands.utils;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.helpers.StringUtils;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

import java.util.ArrayList;
import java.util.List;

public class AddCommand implements ICommand {

	private List<String> aliases = new ArrayList<>();

	public AddCommand() {
		aliases.add("!addcmd");
	}

	@Override
	public String getCommand() {
		return "!addcommand";
	}

	@Override
	public List<String> getAliases() {
		return aliases;
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		String[] parts = rawMessage.split(" ");
		StringBuilder builder = new StringBuilder();
		for(int c = 2; c < parts.length; c++) {
			builder.append(parts[c] + " ");
		}
		String out;
		if(parts.length == 3) {
			out = builder.toString();
		} else {
			out = StringUtils.stripLastChar(builder);
		}
		CommandList.addCustomCommand(new CustomCommand(parts[1], out));
		MessageUtils.sendMessage(info, String.format("Added command `%s` with response `%s`", parts[1], out));
	}
}