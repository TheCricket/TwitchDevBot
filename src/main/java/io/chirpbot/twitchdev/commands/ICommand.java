package io.chirpbot.twitchdev.commands;

import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public interface ICommand {
	String getCommand();
	void executeResponse(String rawMessage, MessageReceivedEvent info);
}
