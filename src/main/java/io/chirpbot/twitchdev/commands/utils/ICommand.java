package io.chirpbot.twitchdev.commands.utils;

import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

import java.util.List;

public interface ICommand {
	String getCommand();
	List<String> getAliases();
	void executeResponse(String rawMessage, MessageReceivedEvent info);
}
