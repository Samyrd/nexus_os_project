# 🤝 Contributing to Nexus OS

> This document defines the governance model, team roles, branching strategy, and development workflow for all 6 team members.

---

## 📌 Table of Contents

- [Team Roles & Ownership](#-team-roles--ownership)
- [Code Ownership (CODEOWNERS)](#-code-ownership-codeowners)
- [GitFlow Branching Strategy](#-gitflow-branching-strategy)
- [Commit Message Format](#-commit-message-format)
- [Pull Request Workflow](#-pull-request-workflow)
- [Development Setup](#-development-setup)

---

## 👥 Team Roles & Ownership

| #  | Role                  | Owner              | Primary Domains                                      | Review Responsibility                      |
|----|----------------------|--------------------|----------------------------------------------------- |--------------------------------------------|
| 1  | **Lead Architect**    | _@lead-architect_  | `/backend`, Temporal workflows, system design         | Reviews all `/backend` and Temporal PRs    |
| 2  | **AI Specialist**     | _@ai-specialist_   | `/agents`, LangChain4j, Qdrant, RAG pipeline          | Reviews all `/agents` and LangChain4j PRs  |
| 3  | **UI Lead**           | _@ui-lead_         | `/frontend`, React Flow, dashboard UX                  | Reviews all `/frontend` and React Flow PRs |
| 4  | **Systems Hacker**    | _@systems-hacker_  | Self-mutating agent logic, dynamic code generation     | Owns self-mutating logic PRs               |
| 5  | **Integration Lead**  | _@integration-lead_| External APIs, WhatsApp/Twilio, webhook endpoints      | Owns all external API integration PRs      |
| 6  | **DevOps Lead**       | _@devops-lead_     | Docker, Kafka infrastructure, CI/CD, `docker-compose`  | Owns Docker, Kafka, and pipeline PRs       |

### Role Descriptions

#### 1. Lead Architect 🏛️
- **Scope**: Owns the entire `/backend` directory and all Temporal workflow logic.
- **Responsibilities**:
  - Defines the service layer architecture and API contracts
  - Reviews all PRs touching Spring Boot configuration, JPA entities, or Temporal workflows/activities
  - Approves database schema changes
  - Ensures Java 21 features (sealed classes, virtual threads, pattern matching) are used correctly

#### 2. AI Specialist 🧠
- **Scope**: Owns the `/agents` package and all LangChain4j integrations.
- **Responsibilities**:
  - Designs and maintains AI agent capabilities (`AgentCapability.java`)
  - Manages Qdrant vector store schema and embedding strategies
  - Reviews all PRs involving LLM prompts, RAG pipelines, or agent orchestration
  - Benchmarks model performance and token usage

#### 3. UI Lead 🎨
- **Scope**: Owns the entire `/frontend` directory and React Flow canvas.
- **Responsibilities**:
  - Maintains the design system (`globals.css`) and component library
  - Reviews all PRs touching React components, Next.js routing, or UI state
  - Ensures accessibility (WCAG 2.1 AA) and responsive design
  - Owns the Agent Canvas (`AgentCanvas.tsx`) orchestration graph

#### 4. Systems Hacker ⚡
- **Scope**: Owns self-mutating agent logic and dynamic code generation.
- **Responsibilities**:
  - Designs the self-improvement feedback loop for agents
  - Implements hot-reloading and dynamic capability injection
  - Reviews all PRs involving runtime code modification
  - Ensures sandboxing and security of dynamic execution

#### 5. Integration Lead 🔌
- **Scope**: Owns all external API integrations including WhatsApp/Twilio.
- **Responsibilities**:
  - Maintains webhook endpoint contracts and message normalization
  - Manages API keys, rate limiting, and retry policies
  - Reviews all PRs involving third-party service integrations
  - Owns the outbound response channel (Kafka → WhatsApp)

#### 6. DevOps Lead 🐳
- **Scope**: Owns Docker, Kafka infrastructure, CI/CD pipelines, and `docker-compose.yml`.
- **Responsibilities**:
  - Maintains all Docker configurations and service health checks
  - Manages Kafka topic creation, partitioning, and consumer groups
  - Owns GitHub Actions workflows and deployment automation
  - Monitors infrastructure performance and resource utilization

---

## 📂 Code Ownership (CODEOWNERS)

The following mapping is enforced via GitHub's `CODEOWNERS` mechanism:

```
# ─── CODEOWNERS ───────────────────────────────────────────────────────
# Each path maps to the team member who MUST approve PRs touching it.

/backend/                              @lead-architect
/backend/**/temporal/                  @lead-architect
/backend/**/agents/                    @ai-specialist
/backend/**/config/KafkaConfig.java    @devops-lead

/frontend/                             @ui-lead

/docker-compose.yml                    @devops-lead
/.github/workflows/                    @devops-lead
Dockerfile*                            @devops-lead

/scripts/                              @systems-hacker
```

---

## 🌳 GitFlow Branching Strategy

```
main ──────────────────────────────────────── Production (protected)
 │
 └── develop ──────────────────────────────── Integration branch
      │
      ├── feature/ai-tribunal-consensus ──── AI Specialist
      ├── feature/whatsapp-webhook ────────── Integration Lead
      ├── feature/agent-canvas-v2 ─────────── UI Lead
      ├── feature/kafka-dlq-handler ───────── DevOps Lead
      └── hotfix/fix-temporal-timeout ─────── Lead Architect
```

### Branch Naming Convention

| Branch Type     | Pattern                          | Example                             |
|-----------------|----------------------------------|-------------------------------------|
| Feature         | `feature/<scope>-<description>`  | `feature/ai-add-rag-pipeline`       |
| Bugfix          | `fix/<scope>-<description>`      | `fix/kafka-consumer-offset-reset`   |
| Hotfix          | `hotfix/<description>`           | `hotfix/fix-temporal-timeout`       |
| Release         | `release/v<semver>`              | `release/v0.2.0`                    |
| Experiment      | `experiment/<description>`       | `experiment/grpc-agent-protocol`    |

### Branch Rules

| Branch    | Protection Rules                                              |
|-----------|---------------------------------------------------------------|
| `main`    | ✅ Require 2 approvals · ✅ Require CI pass · 🚫 No force push |
| `develop` | ✅ Require 1 approval · ✅ Require CI pass · 🚫 No force push  |
| `feature/*` | No restrictions — developer's workspace                     |

---

## 📝 Commit Message Format

We follow the **Conventional Commits** specification with scoped prefixes:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type         | When to Use                              | Example                                          |
|--------------|------------------------------------------|--------------------------------------------------|
| `feat`       | New feature                              | `feat(ai): add tribunal consensus logic`         |
| `fix`        | Bug fix                                  | `fix(kafka): resolve consumer group rebalance`   |
| `refactor`   | Code restructuring, no behavior change   | `refactor(backend): extract agent service layer` |
| `docs`       | Documentation changes only               | `docs(readme): add architecture diagram`         |
| `test`       | Adding or modifying tests                | `test(temporal): add workflow replay test`        |
| `ci`         | CI/CD pipeline modifications             | `ci(actions): add docker-compose validation`     |
| `infra`      | Infrastructure changes                   | `infra(docker): upgrade Kafka to 3.7`            |
| `style`      | Formatting, whitespace, semicolons       | `style(frontend): fix ESLint warnings`           |
| `perf`       | Performance improvement                  | `perf(qdrant): batch vector upserts`             |
| `chore`      | Maintenance, deps, tooling               | `chore(deps): bump Spring Boot to 3.4.2`         |

### Scopes

| Scope        | Maps To                          |
|--------------|----------------------------------|
| `backend`    | `/backend` (Spring Boot)         |
| `frontend`   | `/frontend` (Next.js)            |
| `ai`         | Agent logic, LangChain4j, RAG    |
| `temporal`   | Temporal workflows/activities    |
| `kafka`      | Kafka producers/consumers        |
| `docker`     | Docker, docker-compose           |
| `api`        | REST endpoints, webhooks         |
| `qdrant`     | Vector database operations       |
| `whatsapp`   | WhatsApp/Twilio integration      |
| `actions`    | GitHub Actions CI/CD             |
| `deps`       | Dependency updates               |
| `readme`     | Documentation files              |

### Examples

```bash
# Good ✅
feat(ai): add tribunal consensus logic with 3-agent voting
fix(kafka): handle poison pill messages with DLQ routing
refactor(temporal): extract retry policy into shared config
docs(readme): add Mermaid architecture diagram
ci(actions): add docker-compose.yml validation step

# Bad ❌
update code                  # No type, no scope
fixed stuff                  # Vague, no scope
feat: things                 # No scope, vague description
```

---

## 🔄 Pull Request Workflow

### Step-by-Step

1. **Create a feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/ai-add-rag-pipeline
   ```

2. **Make your changes** with conventional commits:
   ```bash
   git add .
   git commit -m "feat(ai): implement RAG pipeline with Qdrant retriever"
   ```

3. **Push and open a PR** targeting `develop`:
   ```bash
   git push origin feature/ai-add-rag-pipeline
   ```

4. **Fill out the PR template** completely:
   - Summary of Changes
   - Linked Issue #
   - Test Results (Screenshots/Logs)

5. **Request review** from the appropriate code owner (see [Roles](#-team-roles--ownership)).

6. **Address feedback**, then merge via **Squash & Merge**.

### Review Requirements

| Target Branch | Minimum Approvals | Required Reviewers        |
|---------------|-------------------|---------------------------|
| `develop`     | 1                 | Relevant CODEOWNER        |
| `main`        | 2                 | Lead Architect + 1 other  |

---

## 🛠️ Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Samyrd/nexus_os_project.git
cd nexus-os

# 2. Start infrastructure
docker compose up -d

# 3. Backend (Java 21 + Maven)
cd backend
mvnw.cmd clean install    # Windows
./mvnw clean install      # macOS/Linux
mvn spring-boot:run

# 4. Frontend (Next.js)
cd frontend
npm install
npm run dev
```

---

## 📏 Code Standards

- **Java**: Follow Google Java Style Guide. Use Java 21 features (sealed interfaces, pattern matching, virtual threads).
- **TypeScript**: Strict mode enabled. No `any` types. Use functional components with hooks.
- **CSS**: Use CSS custom properties (design tokens) defined in `globals.css`.
- **Tests**: Minimum 80% coverage for new code. Use JUnit 5 for backend, Jest for frontend.

---

## ❓ Questions?

If anything is unclear, open a **Discussion** on the repository or reach out to the **Lead Architect** or **DevOps Lead**.
