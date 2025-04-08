package com.capsulascba.api.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * AWS configuration for the application.
 * Configures AWS services like SQS and S3.
 */
@Configuration
public class AwsConfig {

    @Value("${aws.region:us-east-1}")
    private String region;

    /**
     * Configures the AWS SQS client.
     * Uses the default credentials provider chain for authentication.
     * 
     * @return the configured AmazonSQS client
     */
    @Bean
    public AmazonSQS amazonSQS() {
        return AmazonSQSClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new DefaultAWSCredentialsProviderChain())
                .build();
    }

    /**
     * Configures the AWS S3 client.
     * Uses the default credentials provider chain for authentication.
     * 
     * @return the configured AmazonS3 client
     */
    @Bean
    public AmazonS3 amazonS3() {
        return AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new DefaultAWSCredentialsProviderChain())
                .build();
    }

    /**
     * Configures the AWS SQS client for local development.
     * Uses local credentials for authentication.
     * 
     * @return the configured AmazonSQS client
     */
    @Bean
    @Profile("local")
    public AmazonSQS amazonSQSLocal(
            @Value("${aws.credentials.access-key}") String accessKey,
            @Value("${aws.credentials.secret-key}") String secretKey) {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonSQSClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }

    /**
     * Configures the AWS S3 client for local development.
     * Uses local credentials for authentication.
     * 
     * @return the configured AmazonS3 client
     */
    @Bean
    @Profile("local")
    public AmazonS3 amazonS3Local(
            @Value("${aws.credentials.access-key}") String accessKey,
            @Value("${aws.credentials.secret-key}") String secretKey) {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }
}
