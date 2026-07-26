# SREOPT-299 — specification

## Goal
Set up the deployment pipeline and manifests to deploy the timezoneFinder application to dev, qa, and prod environments.

## Context
A new application has been created and needs to be integrated into the standard Shippeo deployment lifecycle. This requires setting up CI/CD pipelines, Dockerfiles, and ArgoCD manifests according to internal standards.

## In scope
- Creation of ArgoCD Application manifests for dev, qa, and prod under the `deploy/` directory using port 8080 and GET / as health probe endpoint
- Configuration of GitHub Actions workflows for PRs (lint, test, typecheck) and main branch (build and push to registry)
- Ensuring a multi-stage Dockerfile exists for the application
- Ensuring a docker-compose.yml exists at the repository root for local development

## Out of scope
- Implementation of application features
- Provisioning of databases or infrastructure (application requires no backing services)

## Acceptance criteria
- ArgoCD Application manifests are present in the `deploy/` directory for dev, qa, and prod environments configured for port 8080.
- A GitHub Actions workflow executes lint, test, and typecheck jobs on pull requests.
- A GitHub Actions workflow builds and pushes the application image to the Shippeo registry on merges to the main branch.
- The application Dockerfile uses a multi-stage build process.
- A docker-compose.yml file is present at the root of the repository.

## Constraints
- ArgoCD Application manifests must be placed under deploy/.
- All environment variables must be validated with Zod at boot.
- Only changed apps should rebuild, leveraging Turborepo cache.
- Security and maintainability take priority over feature delivery speed.

## Open questions (non-blocking)
- Are there any required environment variables that need to be injected per environment (dev, qa, prod)?
