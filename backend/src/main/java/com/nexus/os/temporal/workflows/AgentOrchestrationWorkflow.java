package com.nexus.os.temporal.workflows;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

/**
 * Temporal workflow interface for orchestrating multi-agent task execution.
 *
 * <p>The orchestration workflow receives an inbound user request, classifies
 * intent, routes to the appropriate AI agent, executes the task, and returns
 * the final response.
 */
@WorkflowInterface
public interface AgentOrchestrationWorkflow {

    /**
     * Orchestrate the full agent pipeline for a user request.
     *
     * @param requestPayload JSON-serialized inbound request
     * @return the agent's final response
     */
    @WorkflowMethod
    String orchestrate(String requestPayload);
}
