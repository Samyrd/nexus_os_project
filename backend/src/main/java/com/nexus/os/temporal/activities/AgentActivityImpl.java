package com.nexus.os.temporal.activities;

import com.nexus.os.agents.AgentCapability;
import com.nexus.os.agents.NexusAgent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Implementation of {@link AgentActivity} — wires the LangChain4j-powered
 * {@link NexusAgent} into the Temporal activity execution model.
 */
@Component
public class AgentActivityImpl implements AgentActivity {

    private static final Logger log = LoggerFactory.getLogger(AgentActivityImpl.class);

    private final NexusAgent nexusAgent;

    public AgentActivityImpl(NexusAgent nexusAgent) {
        this.nexusAgent = nexusAgent;
    }

    @Override
    public String classifyIntent(String requestPayload) {
        log.info("Classifying intent for payload (length={})", requestPayload.length());

        // Use the AI agent to classify intent via prompt engineering
        String classificationPrompt =
                "Classify the following user message into exactly one of these categories: " +
                "customer_support, code_generation, data_analysis, general_chat. " +
                "Respond with ONLY the category name.\n\nMessage: " + requestPayload;

        return nexusAgent.execute(
                new AgentCapability.TextGeneration("gpt-4o", 0.1),
                classificationPrompt
        ).trim().toLowerCase();
    }

    @Override
    public String routeToAgent(String intent) {
        log.info("Routing intent '{}' to agent", intent);

        // Deterministic routing based on classified intent
        return switch (intent) {
            case "customer_support" -> "agent-support-v1";
            case "code_generation"  -> "agent-coder-v1";
            case "data_analysis"    -> "agent-analyst-v1";
            default                 -> "agent-general-v1";
        };
    }

    @Override
    public String executeAgentTask(String agentId, String requestPayload) {
        log.info("Executing task on agent '{}'", agentId);

        // Select capability based on agent type
        AgentCapability capability = switch (agentId) {
            case "agent-coder-v1"   -> new AgentCapability.CodeExecution("java", 30_000L);
            case "agent-analyst-v1" -> new AgentCapability.DataRetrieval("nexus-memory", 5);
            default                 -> new AgentCapability.TextGeneration("gpt-4o", 0.7);
        };

        return nexusAgent.execute(capability, requestPayload);
    }
}
