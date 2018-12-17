package io.chirpbot.twitchdev.handlers;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.commands.ICommand;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.guild.channel.message.MentionEvent;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public class MessageHandler {

	@EventSubscriber
	public void onMention(MentionEvent event) {

	}

	@EventSubscriber
	public void onMessageReceived(MessageReceivedEvent event) {
		for(ICommand command : TwitchDev.commands.getCommandList()) {
			if(event.getMessage().getContent().contains(command.getCommand())) {
				command.executeResponse(event.getMessage().getContent(), event);
			}
		}

//		if(!event.getAuthor().isBot()) {
//			DetectSentimentResult sentimentResult = Comprehend.detectSentiment(event.getMessage().getContent());
//			if (sentimentResult.getSentiment().equalsIgnoreCase(Sentiment.NEGATIVE.toString())) {
//				IMessage message = event.getMessage();
//				event.getMessage().delete();
//				MessageUtils.sendMessage(event, String.format("@%s This message is being held by AutoMod", event.getMessage().getAuthor().getDisplayName(event.getGuild())));
//				MessageUtils.sendMessage(event, "Your message has been approved!");
//				MessageUtils.restoreMessage(message);
//			}
//
//
//			MessageUtils.sendMessage(event, String.format("%s [%s]", sentimentResult.getSentiment(), sentimentResult.getSentimentScore().toString()));
//		}
	}

	/*@EventSubscriber
	public void onReactionAdded(ReactionAddEvent event) {
		event.getMessage().removeReaction(event.getUser(), event.getReaction());
	}*/
}