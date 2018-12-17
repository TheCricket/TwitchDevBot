package io.chirpbot.twitchdev.amazon;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.comprehend.AmazonComprehend;
import com.amazonaws.services.comprehend.AmazonComprehendClientBuilder;
import io.chirpbot.twitchdev.secret.Secret;

public class AWS {

	private BasicAWSCredentials credentials = new BasicAWSCredentials(Secret.AWS_ACCESS_KEY, Secret.AWS_SECRET_KEY);

	public AmazonComprehend getComprehendInstance() {
		return AmazonComprehendClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion("us-east-1").build();
	}

	public static AWS getInstance() {
		return new AWS();
	}
}