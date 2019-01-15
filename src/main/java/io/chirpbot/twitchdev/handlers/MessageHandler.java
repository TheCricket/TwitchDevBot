package io.chirpbot.twitchdev.handlers;

import io.chirpbot.twitchdev.commands.utils.CommandList;
import io.chirpbot.twitchdev.commands.utils.CustomCommand;
import io.chirpbot.twitchdev.commands.utils.ICommand;
import io.chirpbot.twitchdev.helpers.MessageUtils;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.guild.channel.message.MentionEvent;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public class MessageHandler {

	@EventSubscriber
	public void onMention(MentionEvent event) {

	}

	@EventSubscriber
	public void onMessageReceived(MessageReceivedEvent event) {
		for (ICommand command : CommandList.getCommandList()) {
			if (event.getMessage().getContent().startsWith(command.getCommand())) {
				command.executeResponse(event.getMessage().getContent(), event);
			}

			if(command.getAliases() != null) {
				for (String alias : command.getAliases()) {
					if (event.getMessage().getContent().startsWith(alias)) {
						command.executeResponse(event.getMessage().getContent(), event);
					}
				}
			}
		}

		for(CustomCommand command : CommandList.getCustomCommands()) {
			if (event.getMessage().getContent().startsWith(command.getCommand())) {
				MessageUtils.sendMessage(event, command.getResponse());
			}

			if(command.getAliases() != null) {
				for (String alias : command.getAliases()) {
					if (event.getMessage().getContent().startsWith(alias)) {
						MessageUtils.sendMessage(event, command.getResponse());
					}
				}
			}
		}
	}
}