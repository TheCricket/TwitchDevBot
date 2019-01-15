package io.chirpbot.twitchdev.commands.utils;

import io.chirpbot.twitchdev.helpers.StringUtils;
import org.json.simple.JSONStreamAware;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class CustomCommand implements JSONStreamAware {

	private String command;
	private List<String> aliases;
	private String response;

	public CustomCommand(String command, String response) {
		this(command, new ArrayList<>(), response);
	}

	public CustomCommand(String command, List<String> alias, String response) {
		this.command = command;
		this.aliases = alias;
		this.response = response;
	}

	public void addAlias(String alias) {
		if(!aliases.contains(alias)) aliases.add(alias);
	}

	public String getCommand() {
		return command;
	}

	public List<String> getAliases() {
		return aliases;
	}

	public String getResponse() {
		return response;
	}

	@Override
	public void writeJSONString(Writer out) throws IOException {
		LinkedHashMap<String, String> obj = new LinkedHashMap<>();
		obj.put("command", command);
		StringBuilder builder = new StringBuilder();
		aliases.forEach(str -> builder.append(str + ","));
		obj.put("aliases", StringUtils.stripLastChar(builder));
		obj.put("response", response);

	}
}