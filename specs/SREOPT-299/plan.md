# SREOPT-299 — implementation plan

## Approach
Create ArgoCD Application manifests for dev, qa, and prod in the deploy/ directory configuring port 8080 and a GET / health probe. Create GitHub Actions workflows for PRs (triggering Turborepo tasks for lint, test, and typecheck) and main branch (building and pushing the image). Implement a multi-stage Dockerfile for optimized builds and a root docker-compose.yml for local development.

## Files
- deploy/dev.yaml
- deploy/qa.yaml
- deploy/prod.yaml
- .github/workflows/pr.yaml
- .github/workflows/main.yaml
- Dockerfile
- docker-compose.yml

## Conventions
- Place ArgoCD Application manifests strictly under deploy/ directory.
- Leverage Turborepo cache to only rebuild changed apps.
- Validate all environment variables with Zod at boot.
- Security and maintainability take priority over feature delivery speed.

## Validation
- yamllint deploy/ .github/workflows/
- docker-compose config
- hadolint Dockerfile

## Risks
- The GET / health probe may fail if the app does not bind to port 8080 or does not return a 200 OK status.
- The Docker build might fail if the multi-stage build instructions don't correctly copy artifacts from the build stage.
- Turborepo cache might not be properly utilized in CI, leading to excessive build times.
