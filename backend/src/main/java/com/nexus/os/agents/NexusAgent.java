package com.nexus.os.agents;

import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.chat.ChatLanguageModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Core AI agent powered by LangChain4j + OpenAI.
 *
 * <p>Uses Java 21 pattern matching on {@link AgentCapability} to route
 * requests to the appropriate handler.
 */
@Component
public class NexusAgent {

    private static final Logger log = LoggerFactory.getLogger(NexusAgent.class);

    private final ChatLanguageModel chatModel;

    public NexusAgent(
            @Value("${langchain4j.open-ai.api-key}") String apiKey,
            @Value("${langchain4j.open-ai.model-name}") String modelName,
            @Value("${langchain4j.open-ai.temperature}") double temperature,
            @Value("${langchain4j.open-ai.max-tokens}") int maxTokens
    ) {
        this.chatModel = OpenAiChatModel.builder()
                .apiKey(apiKey)
                .modelName(modelName)
                .temperature(temperature)
                .maxTokens(maxTokens)
                .build();
    }

    /**
     * Execute an agent task based on the given capability and user prompt.
     *
     * @param capability the agent capability to invoke
     * @param userPrompt the user's raw input
     * @return the agent's response
     */
    public String execute(AgentCapability capability, String userPrompt) {
        log.info("Executing agent with capability: {}", capability.getClass().getSimpleName());

        return switch (capability) {
            case AgentCapability.TextGeneration tg -> {
                log.debug("TextGeneration — model={}, temp={}", tg.modelId(), tg.temperature());
                yield chatModel.generate(userPrompt);
            }
            case AgentCapability.CodeExecution ce -> {
                log.debug("CodeExecution — lang={}, timeout={}ms", ce.language(), ce.timeoutMs());
                String codePrompt = "You are a code assistant. Language: %s. Respond with code only.\n\n%s"
                        .formatted(ce.language(), userPrompt);
                yield chatModel.generate(codePrompt);
            }
            case AgentCapability.DataRetrieval dr -> {
                log.debug("DataRetrieval — collection={}, topK={}", dr.collectionName(), dr.topK());
                // TODO: Wire Qdrant embedding store for RAG retrieval
                yield chatModel.generate("Answer based on context:\n" + userPrompt);
            }
            case AgentCapability.ImageAnalysis ia -> {
                log.debug("ImageAnalysis — model={}, maxTokens={}", ia.modelId(), ia.maxTokens());
                // TODO: Wire vision model for image analysis
                yield chatModel.generate("Describe the image context:\n" + userPrompt);
            }
        };
    }
}
