package io.chirpbot.twitchdev.amazon;

import com.amazonaws.services.comprehend.AmazonComprehend;
import com.amazonaws.services.comprehend.model.*;

public class Comprehend {

	private static AmazonComprehend instance = AWS.getInstance().getComprehendInstance();

	public static DetectDominantLanguageResult detectDominantLanguage(String input) {
		DetectDominantLanguageRequest request = new DetectDominantLanguageRequest().withText(input);
		return instance.detectDominantLanguage(request);
	}

	public static DetectEntitiesResult detectEntities(String input) {
		DetectEntitiesRequest request = new DetectEntitiesRequest().withText(input).withLanguageCode(detectDominantLanguage(input).getLanguages().get(0).getLanguageCode());
		return instance.detectEntities(request);
	}

	public static DetectKeyPhrasesResult detectKeyPhrases(String input) {
		DetectKeyPhrasesRequest request = new DetectKeyPhrasesRequest().withText(input).withLanguageCode(detectDominantLanguage(input).getLanguages().get(0).getLanguageCode());
		return instance.detectKeyPhrases(request);
	}

	public static DetectSyntaxResult detectSyntax(String input) {
		DetectSyntaxRequest request = new DetectSyntaxRequest().withText(input).withLanguageCode(detectDominantLanguage(input).getLanguages().get(0).getLanguageCode());
		return instance.detectSyntax(request);
	}

	public static DetectSentimentResult detectSentiment(String input) {
		DetectSentimentRequest request = new DetectSentimentRequest().withText(input).withLanguageCode(detectDominantLanguage(input).getLanguages().get(0).getLanguageCode());
		return instance.detectSentiment(request);
	}
}