FROM node:20-alpine

# Install git and bash (often needed by build scripts)
RUN apk add --no-cache git bash jq

# Directory where the repo will be mounted
WORKDIR /workspace

# Generic entrypoint that installs deps & runs tests
COPY ../entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"] 