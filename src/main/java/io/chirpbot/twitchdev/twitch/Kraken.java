package io.chirpbot.twitchdev.twitch;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;

import java.io.IOException;

public class Kraken {

	private static String clientID = "cq07ulh1kygh08x8ydf1kxk9rnelhy";
	private static String baseUrl = "https://api.twitch.tv/v5";

	public static JSONObject getEvents() {
		HttpClient client = HttpClients.createDefault();
		HttpGet get = new HttpGet(baseUrl + "/channels/141981764/events");
		get.setHeader("Accept", "application/vnd.twitchtv.v5+json");
		get.setHeader("Client-ID", clientID);
		try {
			HttpResponse response = client.execute(get);
			HttpEntity entity = response.getEntity();

			if(entity != null) {
				return new JSONObject(IOUtils.toString(entity.getContent(), "UTF-8"));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
}