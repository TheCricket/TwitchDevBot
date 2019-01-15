package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.commands.utils.ICommand;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

import java.util.List;

public class CommandStaff implements ICommand {
	@Override
	public String getCommand() {
		return "!staff";
	}

	@Override
	public List<String> getAliases() {
		return null;
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		if(info.getMessage().getMentions().isEmpty()) {
			MessageUtils.sendMessage(info, "This command is for any moderators or staff to give out the staff rank");
			MessageUtils.sendMessage(info, "Usage: `!staff @user` You can @ as many users as you want!" );
		} else if(info.getAuthor().hasRole(info.getGuild().getRolesByName("Twitch Staff").get(0))
				|| info.getAuthor().hasRole(info.getGuild().getRolesByName("Owner").get(0))
				|| info.getAuthor().hasRole(info.getGuild().getRolesByName("Admin").get(0))
				|| info.getAuthor().hasRole(info.getGuild().getRolesByName("Moderator").get(0))) {
			info.getMessage().getMentions().get(0).addRole(info.getGuild().getRolesByName("Twitch Staff").get(0));
			MessageUtils.sendMessage(info, String.format("Set %s to Twitch Staff", info.getMessage().getMentions().get(0).getName()));
		}
	}
}