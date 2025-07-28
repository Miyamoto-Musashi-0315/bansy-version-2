FROM python:3.12-slim

# Install git and bash
RUN apt-get update -qq && apt-get install -y --no-install-recommends \
    git \
    bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY ../entrypoint.sh /entrypoint.sh
RUN pip install --no-cache-dir pytest && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"] 