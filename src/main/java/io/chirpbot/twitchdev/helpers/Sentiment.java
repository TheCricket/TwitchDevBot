package io.chirpbot.twitchdev.helpers;

import java.io.Serializable;

public enum Sentiment implements Serializable {

	POSITIVE, NEGATIVE, NEUTRAL, MIXED;

	@Override
	public String toString() {
		switch (this) {
			case POSITIVE:
				return "POSITIVE";
			case NEGATIVE:
				return "NEGATIVE";
			case NEUTRAL:
				return "NEUTRAL";
			case MIXED:
				return "MIXED";
		}
		return null;
	}
}
