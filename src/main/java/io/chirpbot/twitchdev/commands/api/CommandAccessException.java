package io.chirpbot.twitchdev.commands.api;

public class CommandAccessException extends RuntimeException {

    public CommandAccessException(String message) {
        super(message);
    }

    public CommandAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}
