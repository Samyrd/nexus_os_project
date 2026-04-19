## 📋 Summary of Changes

<!-- Provide a concise description of what this PR does. -->
<!-- Example: "Adds Kafka consumer for inbound WhatsApp messages with dead-letter queue support." -->



---

## 🔗 Linked Issue #

<!-- Link the GitHub issue this PR resolves. Use closing keywords. -->
<!-- Example: Closes #42 -->

Closes #

---

## 🏷️ Change Type

<!-- Check the type that applies -->

- [ ] `feat` — New feature
- [ ] `fix` — Bug fix
- [ ] `refactor` — Code refactoring (no functional change)
- [ ] `docs` — Documentation only
- [ ] `test` — Adding or updating tests
- [ ] `ci` — CI/CD pipeline changes
- [ ] `infra` — Docker, Kafka, Temporal infrastructure
- [ ] `style` — Code style / formatting

---

## 🧪 Test Results (Screenshots / Logs)

<!-- Paste screenshots, terminal output, or test summaries below. -->
<!-- For backend: Include `mvn test` output or API response screenshots. -->
<!-- For frontend: Include browser screenshots or Lighthouse scores. -->
<!-- For infra: Include `docker compose ps` or service health checks. -->

<details>
<summary>📸 Click to expand test evidence</summary>

```
// Paste logs here
```

</details>

---

## ✅ PR Checklist

- [ ] Code compiles without errors (`mvn clean install` / `npm run build`)
- [ ] All existing tests still pass
- [ ] New code has appropriate test coverage
- [ ] No secrets or API keys committed
- [ ] Documentation updated (if applicable)
- [ ] Follows [commit message conventions](../CONTRIBUTING.md#-commit-message-format)

---

## 👥 Reviewer Hints

<!-- Tag the appropriate reviewer based on the area of change. -->
<!-- See CONTRIBUTING.md for the full CODEOWNERS mapping. -->

| Area Changed     | Suggested Reviewer     |
|------------------|------------------------|
| `/backend`       | @lead-architect        |
| `/agents`        | @ai-specialist         |
| `/frontend`      | @ui-lead               |
| Self-mutating    | @systems-hacker        |
| External APIs    | @integration-lead      |
| Docker / Kafka   | @devops-lead           |
