"use client";

import dynamic from "next/dynamic";
import {
  Activity,
  Bot,
  Boxes,
  ChevronRight,
  Cpu,
  Database,
  GitBranch,
  Layers,
  MessageSquare,
  Workflow,
  Zap,
} from "lucide-react";

const AgentCanvas = dynamic(() => import("@/components/AgentCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        fontSize: "14px",
      }}
    >
      Loading Agent Canvas…
    </div>
  ),
});

/* ─── Metric Card ───────────────────────────────────────────────────────────── */
function MetricCard({
  icon,
  label,
  value,
  trend,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  color: string;
  delay: number;
}) {
  return (
    <div
      className="glass glass-hover animate-fade-in"
      style={{
        padding: "24px",
        animationDelay: `${delay}ms`,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            background: `${color}18`,
            borderRadius: "10px",
            padding: "10px",
            color: color,
            display: "flex",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#10b981",
            background: "rgba(16, 185, 129, 0.1)",
            padding: "4px 10px",
            borderRadius: "20px",
          }}
        >
          {trend}
        </span>
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: "4px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Status Badge ──────────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: "healthy" | "degraded" | "down" }) {
  const colors = {
    healthy: "#10b981",
    degraded: "#f59e0b",
    down: "#ef4444",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        fontWeight: 600,
        color: colors[status],
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: colors[status],
          boxShadow: `0 0 8px ${colors[status]}88`,
        }}
      />
      {status}
    </span>
  );
}

/* ─── Service Row ───────────────────────────────────────────────────────────── */
function ServiceRow({
  name,
  icon,
  status,
  port,
}: {
  name: string;
  icon: React.ReactNode;
  status: "healthy" | "degraded" | "down";
  port: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            color: "var(--accent-blue)",
            opacity: 0.8,
            display: "flex",
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "14px" }}>{name}</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            :{port}
          </div>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}

/* ═══ Page ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* ── Ambient background glow ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
            radial-gradient(ellipse 800px 600px at 20% 20%, rgba(59,130,246,0.06), transparent),
            radial-gradient(ellipse 600px 400px at 80% 60%, rgba(139,92,246,0.05), transparent),
            radial-gradient(ellipse 500px 300px at 50% 90%, rgba(236,72,153,0.04), transparent)
          `,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        {/* ── Header ── */}
        <header
          className="animate-fade-in"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              className="animate-float"
              style={{
                background: "var(--gradient-hero)",
                borderRadius: "14px",
                padding: "12px",
                display: "flex",
                boxShadow: "var(--shadow-glow-blue)",
              }}
            >
              <Boxes size={28} color="#fff" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="gradient-text">Nexus OS</span>
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                AI Digital Workforce Command Center
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <StatusBadge status="healthy" />
            <div
              className="glass"
              style={{
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Zap size={14} color="var(--accent-amber)" />
              Deploy Agent
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          </div>
        </header>

        {/* ── Metrics Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <MetricCard
            icon={<Bot size={22} />}
            label="Active Agents"
            value="12"
            trend="+3 today"
            color="#3b82f6"
            delay={0}
          />
          <MetricCard
            icon={<Workflow size={22} />}
            label="Workflows Running"
            value="847"
            trend="+12.4%"
            color="#8b5cf6"
            delay={100}
          />
          <MetricCard
            icon={<MessageSquare size={22} />}
            label="Messages Processed"
            value="24.3K"
            trend="+8.7%"
            color="#10b981"
            delay={200}
          />
          <MetricCard
            icon={<Activity size={22} />}
            label="Avg Latency"
            value="142ms"
            trend="-23ms"
            color="#f59e0b"
            delay={300}
          />
        </div>

        {/* ── Main Content Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "24px",
          }}
        >
          {/* ── Agent Canvas ── */}
          <div
            className="glass animate-fade-in"
            style={{
              padding: "2px",
              animationDelay: "400ms",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <GitBranch
                  size={16}
                  color="var(--accent-violet)"
                  style={{ opacity: 0.8 }}
                />
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Agent Orchestration Graph
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                LIVE
              </span>
            </div>
            <div style={{ height: "540px" }}>
              <AgentCanvas />
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Infrastructure Status */}
            <div
              className="glass animate-fade-in"
              style={{
                padding: "20px",
                animationDelay: "500ms",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <Layers size={16} color="var(--accent-emerald)" />
                <span style={{ fontWeight: 700, fontSize: "14px" }}>
                  Infrastructure
                </span>
              </div>
              <ServiceRow
                name="PostgreSQL"
                icon={<Database size={16} />}
                status="healthy"
                port="5432"
              />
              <ServiceRow
                name="Kafka (KRaft)"
                icon={<Zap size={16} />}
                status="healthy"
                port="9092"
              />
              <ServiceRow
                name="Temporal Server"
                icon={<Workflow size={16} />}
                status="healthy"
                port="7233"
              />
              <ServiceRow
                name="Qdrant"
                icon={<Cpu size={16} />}
                status="healthy"
                port="6333"
              />
            </div>

            {/* Recent Activity */}
            <div
              className="glass animate-fade-in"
              style={{
                padding: "20px",
                flex: 1,
                animationDelay: "600ms",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <Activity size={16} color="var(--accent-amber)" />
                <span style={{ fontWeight: 700, fontSize: "14px" }}>
                  Recent Events
                </span>
              </div>
              {[
                {
                  time: "2s ago",
                  msg: "Support Agent processed ticket #4821",
                  color: "#10b981",
                },
                {
                  time: "15s ago",
                  msg: "Coder Agent deployed hotfix v2.3.1",
                  color: "#3b82f6",
                },
                {
                  time: "1m ago",
                  msg: "Analyst Agent generated Q4 report",
                  color: "#8b5cf6",
                },
                {
                  time: "3m ago",
                  msg: "WhatsApp: 23 messages queued",
                  color: "#f59e0b",
                },
                {
                  time: "5m ago",
                  msg: "Temporal: workflow batch completed",
                  color: "#6b7280",
                },
              ].map((event, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom:
                      i < 4 ? "1px solid var(--border-subtle)" : "none",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: event.color,
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {event.msg}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
