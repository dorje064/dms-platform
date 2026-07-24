#!/usr/bin/env bash
# =============================================================================
# Runs ON the OCI VM (invoked by deploy.yml over SSH, from /opt/dms).
#
# 1. Verifies the manually-maintained api.env is present (see below).
# 2. Logs in to GHCR to pull the private images.
# 3. Pulls the tagged images and (re)starts the compose stack.
#
# Credentials:
#   - GHCR_USER / GHCR_TOKEN are injected into the environment by deploy.yml
#     over SSH (GHCR_USER from a GitHub variable, GHCR_TOKEN from a GitHub
#     secret). Nothing sensitive is stored on the VM.
#
# Prerequisites on the VM:
#   - docker + docker compose plugin
#   - /opt/dms/api.env present (maintained BY HAND on the server, NOT in git,
#     NOT rendered by this script). Holds MONGODB_URI, JWT_SECRET, CORS_ORIGINS,
#     etc. Compose feeds it to the api service via env_file.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")"

# --- .api.env: maintained manually on the server -----------------------------
echo "==> Checking .api.env"
if [ ! -f .api.env ]; then
  echo "ERROR: $(pwd)/.api.env not found." >&2
  echo "       Create it by hand on the VM (it is intentionally not in git and" >&2
  echo "       not rendered by this script). It must define the api runtime env" >&2
  echo "       (MONGODB_URI, JWT_SECRET, CORS_ORIGINS, ...)." >&2
  exit 1
fi
echo "    .api.env present ($(grep -c '=' .api.env || true) vars)"

# --- GHCR login (creds injected by the deploy workflow) ---------------------
echo "==> Logging in to GHCR as ${GHCR_USER:-<unset>}"
if [ -z "${GHCR_USER:-}" ] || [ -z "${GHCR_TOKEN:-}" ]; then
  echo "ERROR: GHCR_USER and GHCR_TOKEN must be set in the environment." >&2
  echo "       deploy.yml passes them via the SSH step (GitHub variable +" >&2
  echo "       secret). Check the 'vars.GHCR_USER' / 'secrets.GHCR_TOKEN' wiring." >&2
  exit 1
fi
if printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin; then
  echo "    GHCR login OK"
else
  echo "ERROR: GHCR login failed for user '$GHCR_USER'. Check the token scope" >&2
  echo "       (needs read:packages) and that the token is not expired." >&2
  exit 1
fi

echo "==> Pulling images"
docker compose --env-file image-tags.env pull

echo "==> Starting stack"
docker compose --env-file image-tags.env up -d --remove-orphans

echo "==> Pruning dangling images"
docker image prune -f >/dev/null || true

echo "==> Done."
docker compose --env-file image-tags.env ps
