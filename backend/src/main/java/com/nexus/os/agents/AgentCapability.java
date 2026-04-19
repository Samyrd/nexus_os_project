package com.nexus.os.agents;

/**
 * Sealed interface representing the capabilities an AI agent can possess.
 * Uses Java 21 sealed types for exhaustive pattern matching in {@code switch} expressions.
 *
 * <p>Example usage with pattern matching:
 * <pre>{@code
 * return switch (capability) {
 *     case TextGeneration tg   -> handleTextGen(tg);
 *     case CodeExecution ce    -> handleCodeExec(ce);
 *     case DataRetrieval dr    -> handleRetrieval(dr);
 *     case ImageAnalysis ia    -> handleImageAnalysis(ia);
 * };
 * }</pre>
 */
public sealed interface AgentCapability permits
        AgentCapability.TextGeneration,
        AgentCapability.CodeExecution,
        AgentCapability.DataRetrieval,
        AgentCapability.ImageAnalysis {

    /** Natural-language text generation (chat, summarization, etc.). */
    record TextGeneration(String modelId, double temperature) implements AgentCapability {}

    /** Sandboxed code execution in a specified language. */
    record CodeExecution(String language, long timeoutMs) implements AgentCapability {}

    /** RAG-based retrieval against the Qdrant vector store. */
    record DataRetrieval(String collectionName, int topK) implements AgentCapability {}

    /** Vision model analysis of an uploaded image. */
    record ImageAnalysis(String modelId, int maxTokens) implements AgentCapability {}
}
