package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public class CommandListCommands implements ICommand {
	@Override
	public String getCommand() {
		return "!commands";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		StringBuilder builder = new StringBuilder();
		builder.append("The commands are: ");
		for(ICommand command : CommandList.getCommandList()) {
			builder.append(command.getCommand());
			builder.append(", ");
		}
		String out = builder.toString();
		MessageUtils.sendMessage(info, out.substring(0, out.length() - 2));
	}
}
