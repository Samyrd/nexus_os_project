"use client";

import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  MessageSquare,
  Bot,
  GitBranch,
  Cpu,
  Database,
  Send,
} from "lucide-react";

/* ─── Custom Node Component ─────────────────────────────────────────────────── */
interface AgentNodeData {
  label: string;
  status: "idle" | "running" | "success" | "error";
  icon: string;
  description: string;
  [key: string]: unknown;
}

function AgentNode({ data }: { data: AgentNodeData }) {
  const statusColor: Record<string, string> = {
    idle: "#6b7280",
    running: "#3b82f6",
    success: "#10b981",
    error: "#ef4444",
  };

  const iconMap: Record<string, React.ReactNode> = {
    message: <MessageSquare size={20} />,
    bot: <Bot size={20} />,
    branch: <GitBranch size={20} />,
    cpu: <Cpu size={20} />,
    database: <Database size={20} />,
    send: <Send size={20} />,
  };

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${statusColor[data.status]}44`,
        borderRadius: "12px",
        padding: "16px 20px",
        minWidth: "180px",
        boxShadow: `0 0 20px ${statusColor[data.status]}22, 0 4px 24px rgba(0,0,0,0.4)`,
        color: "#e2e8f0",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 10,
          height: 10,
          background: statusColor[data.status],
          border: "2px solid #1e293b",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            background: `${statusColor[data.status]}22`,
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: statusColor[data.status],
          }}
        >
          {iconMap[data.icon] || <Bot size={20} />}
        </div>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.01em",
            }}
          >
            {data.label}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              marginTop: "2px",
            }}
          >
            {data.description}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: statusColor[data.status],
            animation:
              data.status === "running" ? "pulse 1.5s infinite" : "none",
          }}
        />
        <span
          style={{
            fontSize: "10px",
            color: statusColor[data.status],
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {data.status}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          background: statusColor[data.status],
          border: "2px solid #1e293b",
        }}
      />
    </div>
  );
}

/* ─── Initial Nodes & Edges ─────────────────────────────────────────────────── */
const initialNodes: Node<AgentNodeData>[] = [
  {
    id: "whatsapp",
    type: "agentNode",
    position: { x: 50, y: 200 },
    data: {
      label: "WhatsApp Ingest",
      status: "success",
      icon: "message",
      description: "Twilio webhook receiver",
    },
  },
  {
    id: "gateway",
    type: "agentNode",
    position: { x: 320, y: 200 },
    data: {
      label: "API Gateway",
      status: "success",
      icon: "send",
      description: "Spring Boot REST",
    },
  },
  {
    id: "temporal",
    type: "agentNode",
    position: { x: 590, y: 120 },
    data: {
      label: "Temporal Orchestrator",
      status: "running",
      icon: "branch",
      description: "Workflow engine",
    },
  },
  {
    id: "classifier",
    type: "agentNode",
    position: { x: 590, y: 300 },
    data: {
      label: "Intent Classifier",
      status: "running",
      icon: "cpu",
      description: "LangChain4j NLU",
    },
  },
  {
    id: "agent-support",
    type: "agentNode",
    position: { x: 900, y: 80 },
    data: {
      label: "Support Agent",
      status: "idle",
      icon: "bot",
      description: "Customer queries",
    },
  },
  {
    id: "agent-coder",
    type: "agentNode",
    position: { x: 900, y: 220 },
    data: {
      label: "Coder Agent",
      status: "idle",
      icon: "bot",
      description: "Code generation",
    },
  },
  {
    id: "agent-analyst",
    type: "agentNode",
    position: { x: 900, y: 360 },
    data: {
      label: "Analyst Agent",
      status: "idle",
      icon: "bot",
      description: "Data analysis",
    },
  },
  {
    id: "qdrant",
    type: "agentNode",
    position: { x: 1200, y: 220 },
    data: {
      label: "Qdrant Memory",
      status: "success",
      icon: "database",
      description: "Vector store",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "whatsapp",
    target: "gateway",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "e2",
    source: "gateway",
    target: "temporal",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "e3",
    source: "gateway",
    target: "classifier",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
  },
  {
    id: "e4",
    source: "temporal",
    target: "agent-support",
    style: { stroke: "#6b728055", strokeWidth: 1.5 },
  },
  {
    id: "e5",
    source: "temporal",
    target: "agent-coder",
    style: { stroke: "#6b728055", strokeWidth: 1.5 },
  },
  {
    id: "e6",
    source: "temporal",
    target: "agent-analyst",
    style: { stroke: "#6b728055", strokeWidth: 1.5 },
  },
  {
    id: "e7",
    source: "agent-support",
    target: "qdrant",
    style: { stroke: "#10b98155", strokeWidth: 1.5 },
  },
  {
    id: "e8",
    source: "agent-coder",
    target: "qdrant",
    style: { stroke: "#10b98155", strokeWidth: 1.5 },
  },
  {
    id: "e9",
    source: "agent-analyst",
    target: "qdrant",
    style: { stroke: "#10b98155", strokeWidth: 1.5 },
  },
];

/* ─── Canvas Component ──────────────────────────────────────────────────────── */
export default function AgentCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes: NodeTypes = useMemo(
    () => ({ agentNode: AgentNode as unknown as NodeTypes[string] }),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0e1a",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#1e293b"
          gap={24}
          size={1}
        />
        <Controls
          style={{
            background: "#1e293b",
            borderRadius: "8px",
            border: "1px solid #334155",
          }}
        />
        <MiniMap
          style={{
            background: "#0f172a",
            borderRadius: "8px",
            border: "1px solid #334155",
          }}
          nodeColor="#3b82f6"
          maskColor="rgba(0,0,0,0.7)"
        />
      </ReactFlow>
    </div>
  );
}
