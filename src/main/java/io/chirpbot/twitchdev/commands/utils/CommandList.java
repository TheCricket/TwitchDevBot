package io.chirpbot.twitchdev.commands.utils;

import io.chirpbot.twitchdev.commands.*;

import java.util.ArrayList;
import java.util.List;

public class CommandList {

	private static List<ICommand> commands = new ArrayList<>();
	private static List<CustomCommand> customCommands = new ArrayList<>();

	public CommandList() {
		commands.add(new CommandDocs());
		commands.add(new CommandGithub());
		commands.add(new CommandListCommands());
		commands.add(new CommandTest());
		commands.add(new CommandStaff());
		commands.add(new AddCommand());
	}

	public static void addCustomCommand(CustomCommand command) {
		customCommands.add(command);
	}

	public static List<ICommand> getCommandList() {
		return commands;
	}

	public static List<CustomCommand> getCustomCommands() {
		return customCommands;
	}
}
