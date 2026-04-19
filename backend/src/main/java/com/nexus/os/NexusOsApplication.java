package com.nexus.os;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

/**
 * Nexus OS — AI Digital Workforce Management System.
 *
 * <p>Entry point for the Spring Boot application. Virtual threads are enabled
 * via {@code application.yml} ({@code spring.threads.virtual.enabled: true}).
 */
@SpringBootApplication
@EnableKafka
public class NexusOsApplication {

    public static void main(String[] args) {
        SpringApplication.run(NexusOsApplication.class, args);
    }
}
