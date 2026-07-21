#!/usr/bin/env bash
# =============================================================================
# Runs ON the OCI VM (invoked by deploy.yml over SSH, from /opt/dms).
#
# 1. Fetches secrets from OCI Vault using the VM's INSTANCE PRINCIPAL
#    (no stored credentials) and renders api.env.
# 2. Logs in to GHCR to pull the private images.
# 3. Pulls the tagged images and (re)starts the compose stack.
#
# Prerequisites on the VM:
#   - docker + docker compose plugin
#   - oci CLI  (https://docs.oracle.com/iaas/tools/oci-cli)
#   - the VM is in an IAM dynamic group with a policy granting
#     `read secret-bundles` on the secrets below
#   - /opt/dms/deploy.conf present (see below), NOT in git
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")"

# --- Non-secret config (OCIDs, GHCR user) — VM-local, not committed ----------
# Create /opt/dms/deploy.conf with:
#   API_ENV_SECRET_OCID=ocid1.vaultsecret.oc1....   # content = full api .env body
#   GHCR_SECRET_OCID=ocid1.vaultsecret.oc1....       # content = a GHCR read:packages token
#   GHCR_USER=you-dream-we-build
CONF=/opt/dms/deploy.conf
if [ ! -f "$CONF" ]; then
  echo "ERROR: $CONF not found. Create it with the secret OCIDs + GHCR_USER." >&2
  exit 1
fi
# shellcheck source=/dev/null
source "$CONF"

# Fetch + decode an OCI Vault secret by OCID (instance-principal auth).
fetch_secret() {
  oci secrets secret-bundle get \
    --auth instance_principal \
    --secret-id "$1" \
    --query 'data."secret-bundle-content".content' \
    --raw-output | base64 --decode
}

echo "==> Rendering api.env from OCI Vault"
umask 077
fetch_secret "$API_ENV_SECRET_OCID" > api.env
echo "    api.env rendered ($(grep -c '=' api.env || true) vars)"

echo "==> Logging in to GHCR"
fetch_secret "$GHCR_SECRET_OCID" | docker login ghcr.io -u "$GHCR_USER" --password-stdin

echo "==> Pulling images"
docker compose --env-file image-tags.env pull

echo "==> Starting stack"
docker compose --env-file image-tags.env up -d --remove-orphans

echo "==> Pruning dangling images"
docker image prune -f >/dev/null || true

echo "==> Done."
docker compose --env-file image-tags.env ps
