package com.nexus.os.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

/**
 * Kafka configuration — auto-creates required topics at startup.
 * Uses KRaft-based Kafka (no Zookeeper).
 */
@Configuration
public class KafkaConfig {

    /** Topic for inbound user messages (e.g. WhatsApp → Spring Boot). */
    @Bean
    public NewTopic inboundMessagesTopic() {
        return TopicBuilder.name("nexus.inbound.messages")
                .partitions(3)
                .replicas(1)
                .build();
    }

    /** Topic for agent execution events (workflow status updates). */
    @Bean
    public NewTopic agentEventsTopic() {
        return TopicBuilder.name("nexus.agent.events")
                .partitions(3)
                .replicas(1)
                .build();
    }

    /** Topic for outbound responses back to the user channel. */
    @Bean
    public NewTopic outboundResponsesTopic() {
        return TopicBuilder.name("nexus.outbound.responses")
                .partitions(3)
                .replicas(1)
                .build();
    }
}
