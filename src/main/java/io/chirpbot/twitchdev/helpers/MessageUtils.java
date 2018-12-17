package io.chirpbot.twitchdev.helpers;

import io.chirpbot.twitchdev.TwitchDev;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageEvent;
import sx.blah.discord.handle.obj.IChannel;
import sx.blah.discord.handle.obj.IGuild;
import sx.blah.discord.handle.obj.IMessage;

public class MessageUtils {

	public static void sendMessage(MessageEvent event, String message) {
		sendMessage(event.getGuild(), event.getChannel(), message);
	}

	public static void sendMessage(IGuild guild, IChannel channel, String message) {
		TwitchDev.getBot().getGuildByID(guild.getLongID()).getChannelByID(channel.getLongID()).sendMessage(message);
	}

	public static void sendEmbed(MessageEvent event, EmbedObject embed) {
		sendEmbed(event.getGuild(), event.getChannel(), embed);
	}

	public static void sendEmbed(IGuild guild, IChannel channel, EmbedObject message) {
		TwitchDev.getBot().getGuildByID(guild.getLongID()).getChannelByID(channel.getLongID()).sendMessage(message);
	}

	public static void restoreMessage(IMessage message) {
		sendMessage(message.getGuild(), message.getChannel(), String.format("%s %s", message.getAuthor(), message.getFormattedContent()));
	}
}