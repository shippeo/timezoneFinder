# SREOPT-299 — tasks

## 1. Create multi-stage Dockerfile
Create a multi-stage `Dockerfile` at the repository root that builds the application and exposes port 8080.

**Done when:** The file `Dockerfile` exists at the root and passes `hadolint Dockerfile`.

## 2. Create docker-compose.yml for local development
Create `docker-compose.yml` at the repository root configuring the timezoneFinder service to build from the local Dockerfile and map port 8080.

**Done when:** The file `docker-compose.yml` exists at the root and `docker-compose config` executes successfully.

## 3. Create ArgoCD deployment manifests
Create `deploy/dev.yaml`, `deploy/qa.yaml`, and `deploy/prod.yaml` for ArgoCD configuring port 8080 and a `GET /` health probe endpoint.

**Done when:** Files `deploy/dev.yaml`, `deploy/qa.yaml`, and `deploy/prod.yaml` exist and pass `yamllint deploy/`.

## 4. Create Pull Request GitHub Actions workflow
Create `.github/workflows/pr.yaml` to run on pull requests, executing Turborepo lint, test, and typecheck tasks.

**Done when:** The file `.github/workflows/pr.yaml` exists and passes `yamllint .github/workflows/pr.yaml`.

## 5. Create main branch build and push workflow
Create `.github/workflows/main.yaml` to trigger on pushes to main branch, building and pushing the application image to the Shippeo registry.

**Done when:** The file `.github/workflows/main.yaml` exists and passes `yamllint .github/workflows/main.yaml`.
