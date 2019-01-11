package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public class CommandStaff implements ICommand {
	@Override
	public String getCommand() {
		return "!staff";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		if(info.getAuthor().hasRole(info.getGuild().getRolesByName("Twitch Staff").get(0))
				|| info.getAuthor().hasRole(info.getGuild().getRolesByName("Owner").get(0))
				|| info.getAuthor().hasRole(info.getGuild().getRolesByName("Admin").get(0))
				|| info.getAuthor().hasRole(info.getGuild().getRolesByName("Moderator").get(0))) {
			info.getMessage().getMentions().get(0).addRole(info.getGuild().getRolesByName("Twitch Staff").get(0));
			MessageUtils.sendMessage(info, String.format("Set %s to Twitch Staff", info.getMessage().getMentions().get(0).getName()));
		}
	}
}