package com.capsulascba.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main application class for the CapsulasCba API.
 * This is the entry point for the Spring Boot application.
 */
@SpringBootApplication
@EnableAsync
@EnableScheduling
public class CapsulasCbaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CapsulasCbaApplication.class, args);
    }
}
