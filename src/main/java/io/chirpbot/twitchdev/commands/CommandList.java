package io.chirpbot.twitchdev.commands;

import java.util.ArrayList;
import java.util.List;

public class CommandList {

	private static List<ICommand> commands = new ArrayList<>();

	public CommandList() {
		commands.add(new CommandDocs());
		commands.add(new CommandGithub());
		commands.add(new CommandListCommands());
		commands.add(new CommandTest());
	}

	public static List<ICommand> getCommandList() {
		return commands;
	}
}
