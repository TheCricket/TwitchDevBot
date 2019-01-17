package io.chirpbot.twitchdev.commands.api;

import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public abstract class CommandListener {
    void onCommandUsage(CommandEvent event, Command command) {}
    void onCommandException(CommandEvent event, Command command, Throwable exception) {}
    void onOrdinalMessage(MessageReceivedEvent event) {}
}
