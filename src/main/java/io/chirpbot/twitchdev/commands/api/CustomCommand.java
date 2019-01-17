package io.chirpbot.twitchdev.commands.api;

import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Predicate;

public class CustomCommand extends Command {
    private final Consumer<CommandEvent> response;

    CustomCommand(String name, String[] alias, String description, Predicate<CommandEvent> accessible, String accessErrorMessage, Consumer<CommandEvent> response) {
        super(name, alias, description, accessible, accessErrorMessage);
        this.response = response;
    }

    @Override
    public void run(CommandEvent event) {
        this.response.accept(event);
    }

    public static class Builder {
        private String name;
        private Collection<String> alias;
        private String description;
        private Predicate<CommandEvent> accessible;
        private String accessErrorMessage;

        private Builder() {}

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setAlias(Collection<String> alias) {
            this.alias = alias;
            return this;
        }

        public Builder setAlias(String... alias) {
            return setAlias(Arrays.asList(alias));
        }

        public Builder addAlias(String alias) {
            this.alias.add(alias);
            return this;
        }

        public Builder addAlias(String... alias) {
            return addAlias(Arrays.asList(alias));
        }

        public Builder addAlias(Collection<String> alias) {
            this.alias.addAll(alias);
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setAccessible(Predicate<CommandEvent> accessible) {
            this.accessible = accessible;
            return this;
        }

        public Builder setAccessErrorMessage(String accessErrorMessage) {
            this.accessErrorMessage = accessErrorMessage;
            return this;
        }

        public Command build(Consumer<CommandEvent> response) {
            return new CustomCommand(
                    Objects.requireNonNull(name, "Required name of command"),
                    alias.toArray(new String[0]),
                    description,
                    accessible,
                    accessErrorMessage,
                    response
            );
        }
    }
}
