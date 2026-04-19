package com.nexus.os.config;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import com.nexus.os.temporal.activities.AgentActivityImpl;
import com.nexus.os.temporal.workflows.AgentOrchestrationWorkflowImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Temporal configuration — creates the gRPC stub, client, worker factory,
 * and registers workflow & activity implementations.
 */
@Configuration
public class TemporalConfig {

    @Value("${temporal.service-address}")
    private String serviceAddress;

    @Value("${temporal.namespace}")
    private String namespace;

    @Value("${temporal.task-queue}")
    private String taskQueue;

    @Bean
    public WorkflowServiceStubs workflowServiceStubs() {
        return WorkflowServiceStubs.newServiceStubs(
                WorkflowServiceStubsOptions.newBuilder()
                        .setTarget(serviceAddress)
                        .build()
        );
    }

    @Bean
    public WorkflowClient workflowClient(WorkflowServiceStubs stubs) {
        return WorkflowClient.newInstance(
                stubs,
                WorkflowClientOptions.newBuilder()
                        .setNamespace(namespace)
                        .build()
        );
    }

    @Bean
    public WorkerFactory workerFactory(WorkflowClient client) {
        return WorkerFactory.newInstance(client);
    }

    @Bean(initMethod = "start")
    public Worker nexusWorker(WorkerFactory factory, AgentActivityImpl activityImpl) {
        Worker worker = factory.newWorker(taskQueue);
        worker.registerWorkflowImplementationTypes(AgentOrchestrationWorkflowImpl.class);
        worker.registerActivitiesImplementations(activityImpl);
        return worker;
    }
}
