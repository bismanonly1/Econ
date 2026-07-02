# Architecture Decision Log

| ID | Decision | Reason | Status |
|---|---|---|---|
| ADR-001 | Use FastAPI for the backend | Python-native and suitable for market and agent logic | Approved |
| ADR-002 | Use Next.js and TypeScript for the frontend | Suitable for an interactive dashboard | Approved |
| ADR-003 | Use PostgreSQL for transactional data | Reliable portfolio and trade accounting | Approved |
| ADR-004 | Give every agent a separate portfolio initially | Enables fair strategy comparison | Approved |
| ADR-005 | Agents submit proposals rather than executing directly | Preserves risk and execution controls | Approved |
| ADR-006 | Begin with daily and hourly execution | Reduces initial data and timing complexity | Approved |
