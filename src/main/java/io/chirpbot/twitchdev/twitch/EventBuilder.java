package io.chirpbot.twitchdev.twitch;

import org.joda.time.DateTime;
import org.json.JSONArray;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class EventBuilder {

	private List<Event> eventList;

	public EventBuilder(JSONObject json) throws MalformedURLException {
		eventList = new ArrayList<>();
		JSONArray events = json.getJSONArray("events");
		for(int c = 0; c < events.length(); c++) {
			JSONObject event = events.getJSONObject(c);
			eventList.add(new Event(DateTime.parse(event.get("start_time").toString()),
					DateTime.parse(event.get("end_time").toString()),
					event.get("title").toString(),
					event.get("description").toString(),
					new URL(event.get("cover_image_url").toString())));
		}
	}

	public List<Event> getEventList() {
		return eventList;
	}
}
