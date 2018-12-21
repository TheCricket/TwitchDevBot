package io.chirpbot.twitchdev.helpers.crawler;

import io.chirpbot.twitchdev.TwitchDev;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class SpiderLeg {

	private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1";
	private List<String> links = new LinkedList<>();
	private Document htmlDoc;

	public boolean crawl(String url) {
		try {
			Connection conn = Jsoup.connect(url).userAgent(USER_AGENT);
			Document html = conn.get();
			this.htmlDoc = html;

			if(conn.response().statusCode() == 200) {
				TwitchDev.getLogger().info(String.format("Received web page at %s", url));
			}

			if(!conn.response().contentType().contains("text/html")) {
				TwitchDev.getLogger().warn(String.format("Received something other than html at %s", url));
			}

			Elements linksOnPage = html.select("a[href]");
			TwitchDev.getLogger().info("Found (" + linksOnPage +  ") links");
			for(Element link : linksOnPage) {
				if(link.absUrl("href").contains(url) && !link.absUrl("href").equals(url) && !link.absUrl("href").equals(url + '#')) {
					this.links.add(link.absUrl("href"));
				}
			}

			Set<String> links = new HashSet<>(this.links);
			this.links.clear();
			this.links.addAll(links);

			return true;
		} catch (IOException ignored) {
			return false;
		}
	}

	public boolean searchForTerm(String searchTerm) {
		if(this.htmlDoc == null) {
			TwitchDev.getLogger().error("You need to crawl before you can run!");
			return false;
		}

		TwitchDev.getLogger().info(String.format("Searching for %s...", searchTerm));
		String bodyText = this.htmlDoc.body().text();
		return bodyText.toLowerCase().contains(searchTerm.toLowerCase());
	}

	public List<String> getLinks() {
		return this.links;
	}
}