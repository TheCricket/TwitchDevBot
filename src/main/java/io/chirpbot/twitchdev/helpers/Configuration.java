package io.chirpbot.twitchdev.helpers;

import io.chirpbot.twitchdev.TwitchDev;
import io.chirpbot.twitchdev.commands.utils.CommandList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.*;

@SuppressWarnings({"unchecked", "ResultOfMethodCallIgnored"})
public class Configuration {

	private final String DIR = "config/";
	private final String COMMANDS = DIR + "commands.json";


	public void saveCommands() {
		JSONObject object = new JSONObject();
		JSONArray list = new JSONArray();
		list.addAll(CommandList.getCustomCommands());
		object.put("Commands", list);
		StringWriter out = new StringWriter();
		try {
			object.writeJSONString(out);
		} catch (IOException e) {
			e.printStackTrace();
		}

		try {
			File file = new File("config/commands.json");
			if (!file.exists()) {
				file.createNewFile();
			}
		} catch (Exception e) {
			TwitchDev.getLogger().error(e.getMessage());
		}

		PrintWriter printWriter = null;
		try {
			printWriter = new PrintWriter("config/commands.json", "UTF-8");
		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		try {
			printWriter.write(out.toString());
		} finally {
			printWriter.flush();
			printWriter.close();

		}
	}
}