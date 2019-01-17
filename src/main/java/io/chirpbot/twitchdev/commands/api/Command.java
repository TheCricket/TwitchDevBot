package io.chirpbot.twitchdev.commands.api;

import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Predicate;

public abstract class Command implements Consumer<CommandEvent> {
    private final String name;
    private final String[] alias;
    private final String description;
    private final Predicate<CommandEvent> accessible;
    private final String accessErrorMessage;

    protected Command(String name, String[] alias, String description, Predicate<CommandEvent> accessible, String accessErrorMessage) {
        this.name = name;
        this.alias = alias;
        this.description = description;
        this.accessible = accessible;
        this.accessErrorMessage = accessErrorMessage;
    }

    protected Command(String name, String[] alias, String description, Predicate<CommandEvent> accessible) {
        this(name, alias, description, accessible, null);
    }

    protected Command(String name, String[] alias, String description) {
        this(name, alias, description, event -> true, null);
    }

    protected Command(String name, String description) {
        this(name, new String[0], description, event -> true, null);
    }

    protected Command(String name, String[] alias) {
        this(name, alias, null, event -> true, null);
    }

    protected Command(String name) {
        this(name, new String[0], null, event -> true, null);
    }

    public String getName() {
        return name;
    }

    public String[] getAlias() {
        return alias;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCustomCommand() {
        return this instanceof CustomCommand;
    }

    public boolean isAccessible(CommandEvent event) {
        return accessible.test(event);
    }

    protected void handleUsgage(CommandEvent event) {
        event.getApi().getListener().onCommandUsage(event, this);
    }

    public boolean isCommandFor(String name) {
        return this.name.equalsIgnoreCase(name) || Arrays.stream(alias).anyMatch(c -> c.equalsIgnoreCase(name));
    }


    @Override
    public void accept(CommandEvent event) {
        if (!accessible.test(event) && accessErrorMessage != null && !accessErrorMessage.equals("")) {
            event.getApi().getListener().onCommandException(event, this, new CommandAccessException(accessErrorMessage));
        } else {
            run(event);
        }
    }

    public abstract void run(CommandEvent event);
}
