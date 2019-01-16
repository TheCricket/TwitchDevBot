package io.chirpbot.twitchdev.commands.api;

import sx.blah.discord.api.IDiscordClient;
import sx.blah.discord.api.internal.json.objects.EmbedObject;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.obj.IChannel;
import sx.blah.discord.handle.obj.IGuild;
import sx.blah.discord.handle.obj.IMessage;
import sx.blah.discord.handle.obj.IUser;

public class CommandEvent {
    private final MessageReceivedEvent event;
    private final CommandBootstrapper api;
    private final String[] args;

    public CommandEvent(MessageReceivedEvent event, CommandBootstrapper api, String[] args) {
        this.event = event;
        this.api = api;
        this.args = args;
    }

    public MessageReceivedEvent getEvent() {
        return event;
    }

    public CommandBootstrapper getApi() {
        return api;
    }

    public String[] getArgs() {
        return args;
    }

    public IUser getAuthor() {
        return event.getAuthor();
    }

    public IGuild getGuild() {
        return event.getGuild();
    }

    public IChannel getChannel() {
        return event.getChannel();
    }

    public IMessage getMessage() {
        return event.getMessage();
    }

    public String getMessageContent() {
        return getMessage().getContent();
    }

    public IDiscordClient getClient() {
        return event.getClient();
    }

    public void send(String message, EmbedObject embed) {
        event.getChannel().sendMessage(message, embed);
    }

    public void send(String message) {
        event.getChannel().sendMessage(message);
    }

    public void send(EmbedObject embed) {
        event.getChannel().sendMessage(embed);
    }

    public void sendDm(String message, EmbedObject embed) {
        event.getAuthor().getOrCreatePMChannel().sendMessage(message, embed);
    }

    public void sendDm(String message) {
        event.getAuthor().getOrCreatePMChannel().sendMessage(message);
    }

    public void sendDm(EmbedObject embed) {
        event.getAuthor().getOrCreatePMChannel().sendMessage(embed);
    }
}
