package io.chirpbot.twitchdev.commands;

import io.chirpbot.twitchdev.helpers.MessageUtils;
import io.chirpbot.twitchdev.helpers.cURL;
import org.json.JSONArray;
import org.json.JSONObject;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.util.EmbedBuilder;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Iterator;

public class CommandGithub implements ICommand {

	private String url = "https://api.github.com/search/repositories";
	private HashMap<String, String> qString = new HashMap<>();

	@Override
	public String getCommand() {
		return "!github";
	}

	@Override
	public void executeResponse(String rawMessage, MessageReceivedEvent info) {
		qString.put("q", rawMessage.substring(getCommand().length() + 1));
		try {
			JSONObject searchResults = cURL.GET(url, qString);
			JSONArray items = searchResults.getJSONArray("items");
			Iterator i = items.iterator();
			JSONObject first = (JSONObject) i.next();
			JSONObject owner = first.getJSONObject("owner");
			EmbedBuilder builder = new EmbedBuilder()
					.withTitle(first.getString("full_name"))
					.withTimestamp(Instant.now())
					.withDescription(first.getString("description"))
					.withUrl(first.getString("html_url"))
					.withAuthorIcon(owner.getString("avatar_url"))
					.withAuthorUrl(owner.getString("url"))
					.withAuthorName(owner.getString("login"));
			MessageUtils.sendEmbed(info, builder.build());

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}