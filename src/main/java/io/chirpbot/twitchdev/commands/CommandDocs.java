package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public class CommandDocs implements ICommand {
	@Override
	public String getCommand() {
		return "!docs";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {


		MessageUtils.sendMessage(info, String.format(""));
	}
}
