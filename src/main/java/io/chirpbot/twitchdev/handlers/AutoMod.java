package io.chirpbot.twitchdev.handlers;

import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.guild.channel.message.reaction.ReactionAddEvent;

public class AutoMod {

	@EventSubscriber
	public void onReactionAdded(ReactionAddEvent event) {
		event.getMessage().removeReaction(event.getUser(), event.getReaction());
	}
}
