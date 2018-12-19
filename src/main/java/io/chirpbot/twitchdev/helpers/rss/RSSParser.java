package io.chirpbot.twitchdev.helpers.rss;

import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.XMLEvent;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class RSSParser {
	private final String TITLE = "title";
	private final String DESCRIPTION = "description";
	private final String LANGUAGE = "language";
	private final String COPYRIGHT = "copyright";
	private final String LINK = "link";
	private final String AUTHOR = "author";
	private final String ITEM = "item";
	private final String PUB_DATE = "pubDate";
	private final String GUID = "guid";

	private final URL url;

	public RSSParser(String www) {
		try {
			this.url = new URL(www);
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		}
	}

	public Feed readFeed() {
		Feed feed = null;
		boolean isFeedHeader = true;
		String description = "", title = "", link = "", language = "", copyright = "", author = "", pubDate = "", guid = "";
		try {
			XMLInputFactory inputFactory = XMLInputFactory.newInstance();
			InputStream in = read();
			XMLEventReader eventReader = inputFactory.createXMLEventReader(in);

			while(eventReader.hasNext()) {
				XMLEvent event = eventReader.nextEvent();
				if(event.isStartElement()) {
					String localPart = event.asStartElement().getName().getLocalPart();
					switch (localPart) {
						case ITEM:
							if(isFeedHeader) {
								isFeedHeader = false;
								feed = new Feed(title, link, description, language, copyright, pubDate);
							}
							event = eventReader.nextEvent();
							break;
						case TITLE:
							title = getCharacterData(event, eventReader);
							break;
						case DESCRIPTION:
							description = getCharacterData(event, eventReader);
							break;
						case LINK:
							link = getCharacterData(event, eventReader);
							break;
						case GUID:
							guid = getCharacterData(event, eventReader);
							break;
						case LANGUAGE:
							language = getCharacterData(event, eventReader);
							break;
						case AUTHOR:
							author = getCharacterData(event, eventReader);
							break;
						case PUB_DATE:
							pubDate = getCharacterData(event, eventReader);
							break;
						case COPYRIGHT:
							copyright = getCharacterData(event, eventReader);
							break;
					}
				} else if(event.isEndElement()) {
					if(event.asEndElement().getName().getLocalPart().equals(ITEM)) {
						FeedMessage message = new FeedMessage();
						message.setAuthor(author);
						message.setDescription(description);
						message.setGuid(guid);
						message.setLink(link);
						message.setTitle(title);
						feed.getEntries().add(message);
						eventReader.nextEvent();
						continue;
					}
				}
			}
		} catch (XMLStreamException e) {
			e.printStackTrace();
		}
		return feed;
	}

	private String getCharacterData(XMLEvent event, XMLEventReader eventReader) throws XMLStreamException {
		String out = "";
		event = eventReader.nextEvent();
		if(event instanceof Characters) {
			out = event.asCharacters().getData();
		}
		return out;
	}

	private InputStream read() {
		try {
			return url.openStream();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}