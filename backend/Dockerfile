FROM python:3.9-slim

WORKDIR /app

# Install git for repo cloning
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Optional: install test tools (safe to keep for debugging or future CI builds)
RUN pip install pytest httpx

# --- Commented out to speed up production builds ---
# RUN pytest tests/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
