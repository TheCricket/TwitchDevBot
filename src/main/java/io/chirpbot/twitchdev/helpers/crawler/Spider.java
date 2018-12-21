package io.chirpbot.twitchdev.helpers.crawler;

import io.chirpbot.twitchdev.TwitchDev;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Spider {
	private String directory = System.getProperty("user.home") + "/docs";

	private Set<String> pagesVisited = new HashSet<>();
	private List<String> pagesToVisit = new ArrayList<>();
	private List<String> searchFound = new ArrayList<>();

	public List<String> search(String url, String searchTerm) {
		Path path = buildPath(url);
		while(this.pagesVisited.size() < 200) {
			String currentURL;
			SpiderLeg leg = new SpiderLeg();
			if(this.pagesToVisit.isEmpty()) {
				currentURL = url;
				this.pagesVisited.add(url);
			} else {
				currentURL = nextURL();
			}
			leg.crawl(currentURL);
			boolean success = leg.searchForTerm(searchTerm);
			if(success) {
				TwitchDev.getLogger().info(String.format("%s found at %s", searchTerm, currentURL));
				searchFound.add(currentURL);
			}
			this.pagesToVisit.addAll(leg.getLinks());
		}
		TwitchDev.getLogger().info("Visited " + pagesVisited.size() + " pages");
		return searchFound;
	}

	private Path buildPath(String url) {
		try {
			URI uri = new URI(url);
			String path = uri.getPath();
			String[] parts = path.split("/");
			StringBuilder builder = new StringBuilder();
			for(int c = 0; c < parts.length - 1; c++) {
				builder.append(parts[c]);
			}
			return Paths.get(System.getProperty("user.home") + builder.toString(), parts[parts.length - 1]);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return null;
	}

	private String nextURL() {
		String nextUrl;
		do {
			nextUrl = this.pagesToVisit.remove(0);
		} while(this.pagesVisited.contains(nextUrl));
		this.pagesVisited.add(nextUrl);
		return nextUrl;
	}
}