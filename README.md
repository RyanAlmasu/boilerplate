# QRCode SaaS Boilerplate

A scalable SaaS starter kit built with React, Django, GraphQL, and AWS. This boilerplate is designed for rapid development, easy feature extension, and robust deployment.

---

## Table of Contents

- [Project Structure](#project-structure)
- [How to Scale](#how-to-scale)
- [Implementing New Features](#implementing-new-features)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
.
├── packages/
│   ├── backend/         # Django backend (API, business logic, models)
│   ├── webapp/          # React frontend (UI, routes, components)
│   ├── workers/         # Background workers (async tasks, jobs)
│   ├── internal/        # Shared internal libraries (core, cli, tools)
│   └── webapp-libs/     # Shared frontend libraries (emails, api-client, etc.)
├── patches/             # Dependency patches
├── .github/             # GitHub workflows, images, configs
├── nx.json, package.json, pnpm-workspace.yaml  # Monorepo configs
└── README.md
```

- **Backend:** Django app with REST and GraphQL APIs, business logic, and integrations.
- **Webapp:** React app using Nx, Vite, and TailwindCSS.
- **Workers:** Python async workers for background processing.
- **Internal & webapp-libs:** Shared code and utilities.

---

## How to Scale

- **Monorepo:** Nx and pnpm workspaces allow you to add new packages (apps, libs) easily.
- **Backend:** Add new Django apps in `packages/backend/apps/` for new domains (e.g., payments, notifications).
- **Frontend:** Add new features as routes/components or create new libraries in `packages/webapp-libs/`.
- **Workers:** Add new worker modules for async/background jobs.
- **Shared Code:** Place reusable logic in `internal` or `webapp-libs` for DRY code.

---

## Implementing New Features

### Backend

1. **Create a new Django app** in `packages/backend/apps/`:
   ```sh
   cd packages/backend
   pdm run python manage.py startapp myfeature apps/myfeature
   ```
2. **Add models, serializers, views, and GraphQL schema** as needed.
3. **Register the app** in `INSTALLED_APPS` and include its URLs/schema.

### Frontend

1. **Add a new route/component** in `packages/webapp/src/routes/` or as a new library in `webapp-libs`.
2. **Update navigation and state management** as needed.
3. **Use GraphQL or REST hooks** to connect to backend APIs.

### Workers

- Add new worker scripts or tasks in `packages/workers`.

---

## Running Tests

### Backend (Python/Django)

```sh
cd packages/backend
pdm install
pdm run python manage.py test
# or, if using pytest:
pdm run pytest
```

### Frontend (React/Node)

```sh
pnpm nx test
# or for a specific package:
pnpm nx test webapp
```

---

## Deployment

1. **Docker:** All services are containerized. Build and run with Docker Compose or your preferred orchestrator.
2. **AWS:** Infrastructure as code via AWS CDK (see `infra/` or relevant docs).
3. **CI/CD:** Use your CI provider for automated builds, tests, and deployments.
4. **Production:** Configure environment variables, secrets, and scaling options as needed.

---

## Contributing

- Fork the repo and create a feature branch.
- Follow the code style and commit guidelines.
- Add tests for new features.
- Submit a pull request for review.

---

## License

MIT License. See [LICENSE](./LICENSE) for details.
