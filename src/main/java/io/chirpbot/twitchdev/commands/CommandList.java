package io.chirpbot.twitchdev.commands;

import java.util.ArrayList;
import java.util.List;

public class CommandList {

	private List<ICommand> commands = new ArrayList<>();

	public CommandList() {
		commands.add(new CommandEvents());
	}

	public List<ICommand> getCommandList() {
		return commands;
	}
}
