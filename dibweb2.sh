#!/usr/bin/env bash
set -euo pipefail

# ------- Config (edit if you like) -------
IMAGE="dibweb2:latest"
CONTAINER="dibweb2"
PORT="8000"
ENV_FILE=".env"     # leave as-is if you don't have one
DJANGO_SETTINGS="dibweb2.settings"
WSGI_MODULE="dibweb2.wsgi:application"
# ----------------------------------------

# Compose detection (v2 plugin preferred)
if command -v docker &>/dev/null && docker compose version &>/dev/null; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose &>/dev/null; then
  COMPOSE_CMD="docker-compose"
else
  COMPOSE_CMD=""
fi

usage() {
  cat <<USAGE
Usage: $0 <command>

Commands:
  build             Build the Docker image (${IMAGE})
  run               Run the container (port ${PORT})
  run-env           Run with --env-file ${ENV_FILE} (if it exists)
  migrate           Run Django migrations in a one-off container
  collectstatic     Collect Django static files in a one-off container
  createsuperuser   Create Django superuser (interactive)
  logs              Tail logs of running container
  stop              Stop the running container
  rm                Remove the stopped container
  compose-up        Up with Docker Compose (writes compose.yaml if missing)
  compose-down      Down with Docker Compose
  doctor            Quick checks (docker/compose present, port availability)
  help              Show this help
USAGE
}

doctor() {
  echo "==> Checking Docker..."
  command -v docker >/dev/null || { echo "Docker not found"; exit 1; }
  docker version >/dev/null || { echo "Docker daemon not responding"; exit 1; }

  if [[ -n "${COMPOSE_CMD}" ]]; then
    echo "==> Found Compose: ${COMPOSE_CMD}"
  else
    echo "==> Docker Compose not found (that's OK unless you use compose-* commands)."
  fi

  echo "==> Checking port ${PORT} availability (best-effort)..."
  if lsof -iTCP:"${PORT}" -sTCP:LISTEN -P -n 2>/dev/null | grep -q LISTEN; then
    echo "WARNING: Port ${PORT} appears busy."
  else
    echo "Port ${PORT} looks free."
  fi
}

build() {
  echo "==> Building image ${IMAGE}"
  docker build -t "${IMAGE}" .
}

run_base() {
  local extra_env=()
  if [[ -n "${DJANGO_SETTINGS}" ]]; then
    extra_env+=(--env "DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS}")
  fi
  docker run -d --name "${CONTAINER}" -p "${PORT}:8000" "${extra_env[@]}" "${@}" "${IMAGE}" \
    gunicorn --bind "0.0.0.0:8000" "${WSGI_MODULE}"
}

run() {
  echo "==> Running container ${CONTAINER} from ${IMAGE}"
  run_base
  echo "Open: http://localhost:${PORT}"
}

run_env() {
  if [[ -f "${ENV_FILE}" ]]; then
    echo "==> Running with env file ${ENV_FILE}"
    run_base --env-file "${ENV_FILE}"
  else
    echo "No ${ENV_FILE} found. Running without it."
    run_base
  fi
  echo "Open: http://localhost:${PORT}"
}

oneoff() {
  # Usage: oneoff <cmd...>
  if [[ -f "${ENV_FILE}" ]]; then
    docker run --rm --env-file "${ENV_FILE}" "${IMAGE}" "$@"
  else
    docker run --rm "${IMAGE}" "$@"
  fi
}

migrate() {
  echo "==> Running migrations"
  oneoff python manage.py migrate
}

collectstatic() {
  echo "==> Collecting static files"
  oneoff python manage.py collectstatic --noinput
}

createsuperuser() {
  echo "==> Creating superuser (interactive)"
  if [[ -t 0 ]]; then
    if [[ -f "${ENV_FILE}" ]]; then
      docker run -it --rm --env-file "${ENV_FILE}" "${IMAGE}" python manage.py createsuperuser
    else
      docker run -it --rm "${IMAGE}" python manage.py createsuperuser
    fi
  else
    echo "Not a TTY; run this command from an interactive terminal."
    exit 1
  fi
}

logs() {
  docker logs -f "${CONTAINER}"
}

stop_c() {
  docker stop "${CONTAINER}" || true
}

rm_c() {
  docker rm "${CONTAINER}" || true
}

compose_write_file() {
  if [[ ! -f "compose.yaml" && ! -f "docker-compose.yml" ]]; then
    cat > compose.yaml <<YAML
services:
  web:
    build: .
    image: ${IMAGE}
    ports:
      - "${PORT}:8000"
    ${ [[ -f "${ENV_FILE}" ]] && echo "env_file:" || true }
    ${ [[ -f "${ENV_FILE}" ]] && echo "  - ${ENV_FILE}" || true }
    environment:
      - DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS}
    restart: unless-stopped
YAML
    echo "==> Wrote compose.yaml"
  fi
}

compose_up() {
  [[ -n "${COMPOSE_CMD}" ]] || { echo "Docker Compose not installed."; exit 1; }
  compose_write_file
  ${COMPOSE_CMD} up -d --build
  echo "Open: http://localhost:${PORT}"
}

compose_down() {
  [[ -n "${COMPOSE_CMD}" ]] || { echo "Docker Compose not installed."; exit 1; }
  ${COMPOSE_CMD} down
}

case "${1:-help}" in
  build) build ;;
  run) run ;;
  run-env) run_env ;;
  migrate) migrate ;;
  collectstatic) collectstatic ;;
  createsuperuser) createsuperuser ;;
  logs) logs ;;
  stop) stop_c ;;
  rm) rm_c ;;
  compose-up) compose_up ;;
  compose-down) compose_down ;;
  doctor) doctor ;;
  help|*) usage ;;
esac

##Typical usage

# 1) Build image
#./dibweb2.sh build

# 2) Run directly (no compose)
#./dibweb2.sh run        # or: ./dibweb2.sh run-env  (if you have a .env)

# 3) Run with Docker Compose (auto-writes compose.yaml if missing)
#./dibweb2.sh compose-up

# 4) Migrate / collect static (one-off)
#./dibweb2.sh migrate
#./dibweb2.sh collectstatic

# 5) Logs / stop / remove
#./dibweb2.sh logs
#./dibweb2.sh stop
#./dibweb2.sh rm
