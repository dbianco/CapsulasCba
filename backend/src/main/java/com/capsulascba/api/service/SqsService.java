package com.capsulascba.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

@Service
public class SqsService {

    @Autowired
    private SqsClient sqsClient;

    @Value("${aws.sqs.queueName}")
    private String queueName;

    public void sendMessage(String message) {
        SendMessageRequest sendMessageRequest = SendMessageRequest.builder()
                .queueUrl(getQueueUrl())
                .messageBody(message)
                .build();

        sqsClient.sendMessage(sendMessageRequest);
    }

    private String getQueueUrl() {
        return sqsClient.getQueueUrl(builder -> builder.queueName(queueName)).queueUrl();
    }
}
