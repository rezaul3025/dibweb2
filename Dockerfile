# ---- Frontend build stage ----
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

# Install deps first for better caching
COPY frontend/package.json frontend/package-lock.json* frontend/yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else yarn install || npm install; fi

# Build the app
COPY frontend/ ./
RUN \
  if [ -f package.json ]; then \
    if npm run | grep -q "build"; then npm run build; else yarn build; fi; \
  fi

# ---- Python runtime stage ----
FROM python:3.11-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# System packages (add others if your requirements need them)
#RUN apt-get update && \
#    apt-get install -y --no-install-recommends build-essential libpq-dev \
#    && rm -rf /var/lib/apt/lists/* \

# Add build tools + libraries needed by Pillow/ReportLab
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3-dev \
    libjpeg-dev zlib1g-dev libpng-dev \
    libfreetype6-dev liblcms2-dev \
    libopenjp2-7-dev libtiff5-dev \
    libwebp-dev libharfbuzz-dev libfribidi-dev \
    libxcb1-dev \
  && rm -rf /var/lib/apt/lists/*

# Python deps
COPY requirements.txt .

RUN python -m pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn

# App source
COPY . .

# Put built frontend assets somewhere Django can serve (adjust path if needed)
# This copies either Vite's "dist" or CRA's "build" output.
RUN mkdir -p /app/static/frontend && \
    if [ -d /app/frontend/dist ]; then cp -r /app/frontend/dist/* /app/static/frontend/; fi && \
    if [ -d /app/frontend/build ]; then cp -r /app/frontend/build/* /app/static/frontend/; fi

# Optional: collect static if your settings allow it without DB/env
# ENV DJANGO_SETTINGS_MODULE=dibweb2.settings
# RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Healthcheck (basic TCP)
#HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD \
#  python - <<'PY' || exit 1
#import socket,sys
#s=socket.socket();
#s.settimeout(3);
#s.connect(("127.0.0.1", int(sys.argv[1]) if len(sys.argv)>1 else 8000))
#s.close()
#PY

# Start Gunicorn
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "dibweb2.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]