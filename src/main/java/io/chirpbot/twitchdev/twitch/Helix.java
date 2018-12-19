package io.chirpbot.twitchdev.twitch;

import io.chirpbot.twitchdev.helpers.cURL;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

public class Helix {

	private static String clientID = "cq07ulh1kygh08x8ydf1kxk9rnelhy";
	private static String baseUrl = "https://api.twitch.tv/helix";

	public static JSONObject getStreams(HashMap<String, String> qString) {
		String url = cURL.buildURL(baseUrl + "/streams", qString);
		HttpClient client = HttpClients.createDefault();
		HttpGet get = new HttpGet(url);
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

	public static JSONObject getUsers(HashMap<String, String> qString) {
		String url = cURL.buildURL(baseUrl + "/users", qString);
		HttpClient client = HttpClients.createDefault();
		HttpGet get = new HttpGet(url);
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

	public static JSONObject getGames(HashMap<String, String> qString) {
		String url = cURL.buildURL(baseUrl + "/games", qString);
		HttpClient client = HttpClients.createDefault();
		HttpGet get = new HttpGet(url);
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
