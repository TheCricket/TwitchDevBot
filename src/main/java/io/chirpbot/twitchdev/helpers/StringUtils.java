package io.chirpbot.twitchdev.helpers;

public class StringUtils {

	public static String stripLastChar(String string) {
		return string.substring(0, string.length() - 1);
	}

	public static String stripLastChar(StringBuilder builder) {
		return stripLastChar(builder.toString());
	}
}