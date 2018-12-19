package io.chirpbot.twitchdev.helpers;

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
		BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
		String out = reader.lines().collect(Collectors.joining());
		return new JSONObject(out);
	}

	public static JSONObject GET(String www, HashMap<String, String> params) throws IOException {
		return GET(buildURL(www, params));
	}

	public static String buildURL(String www, HashMap<String, String> params) {
		StringBuilder out = new StringBuilder();
		out.append(www);
		int c = 0;
		for(String k : params.keySet()) {
			if (c == 0) out.append(String.format("?%s=%s", k, params.get(k)));
			else out.append(String.format("&%s=%s", k, params.get(k)));
			c++;
		}
		return out.toString();
	}
}