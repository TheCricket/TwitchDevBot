package io.chirpbot.twitchdev.commands.api;

import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collectors;
import sx.blah.discord.api.events.IListener;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;

public class CommandBootstrapper implements IListener<MessageReceivedEvent> {
    private final Set<Command> commands = new HashSet<>();

    private final Map<String, String> aliasCommands = new HashMap<>();

    private final String defaultPrefix;

    private final CommandListener listener;

    public CommandBootstrapper(String defaultPrefix, CommandListener listener) {
        this.defaultPrefix = defaultPrefix;
        this.listener = listener;

        registerDefaults();
    }

    public CommandBootstrapper(String defaultPrefix, CommandListener listener, Collection<Command> commands) {
        this.defaultPrefix = defaultPrefix;
        this.listener = listener;
        this.commands.addAll(commands);
    }

    public Collection<Command> getCommands() {
        return commands;
    }

    public String getDefaultPrefix() {
        return defaultPrefix;
    }

    public CommandListener getListener() {
        return listener;
    }

    public void registerAlias(String alias, String command) {
        aliasCommands.put(alias, command);
    }

    public void unregisterAlias(String alias, boolean removeCommand) {
        String cmd = aliasCommands.remove(alias).split(" ", 1)[0];

        if (removeCommand) {
            unregisterCommand(cmd);
        }
    }

    public void registerCommand(Command command) {
        this.commands.add(command);
    }

    public void unregisterCommand(String name) {
        this.commands.removeIf(c -> c.isCommandFor(name));
    }

    @Override
    public void handle(MessageReceivedEvent event) {
        String content = event.getMessage().getContent();

        if (content.matches("^" + defaultPrefix + "(.+)")) {
            content = content.substring(defaultPrefix.length());

            String preCmd = content.split(" ", 1)[0];

            content = content.replace(preCmd, aliasCommands.getOrDefault(preCmd, preCmd));

            String cmd = content.split(" ", 1)[0];
            String[] args = content.replace(cmd, "").trim().split(" ");

            commands.stream().filter(c -> c.isCommandFor(cmd))
                    .findFirst().ifPresent(c -> {
                CommandEvent cevent = new CommandEvent(event, this, args);
                c.accept(cevent);
            });
        } else {
            listener.onOrdinalMessage(event);
        }
    }

    private void registerDefaults() {

    }
}
