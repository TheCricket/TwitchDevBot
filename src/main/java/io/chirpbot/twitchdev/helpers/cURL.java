package io.chirpbot.twitchdev.helpers;

import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.HashMap;
import java.util.stream.Collectors;

public class cURL {

	public static JSONObject GET(String www) throws IOException {
		URL url = new URL(www);
		BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));
		String out = reader.lines().collect(Collectors.joining());
		return new JSONObject(out);
	}

	public static JSONObject GET(String www, HashMap<String, String> params) throws IOException {
		return GET(buildURL(www, params));
	}

	public static String buildURL(String www, HashMap<String, String> params) {
		return www + params.entrySet().stream().map(e -> e.getKey() + "=" + e.getValue())
				.collect(Collectors.joining("&", "?", ""));
	}
}