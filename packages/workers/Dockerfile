ARG SB_MIRROR_REPOSITORY=''
ARG SB_PULL_THROUGH_CACHE_REPOSITORY=''
##
# Chamber installation stage
##
FROM ${SB_MIRROR_REPOSITORY}segment/chamber:2 AS chamber

FROM ${SB_PULL_THROUGH_CACHE_REPOSITORY}python:3.11-slim-bullseye

ENV APP_PATH=/app
ENV SRC_CORE_PATH=packages/internal/core
ENV DEST_CORE_PATH=$APP_PATH/$SRC_CORE_PATH
ENV SRC_CLI_PATH=packages/internal/cli
ENV DEST_CLI_PATH=$APP_PATH/$SRC_CLI_PATH
ENV SRC_WORKERS_PATH=packages/workers
ENV DEST_WORKERS_PATH=$APP_PATH/$SRC_WORKERS_PATH

# Consolidated package installation
RUN set -eux; \
    apt-get update --fix-missing && \
    # Install base dependencies
    apt-get install -y wget gnupg curl unzip make xz-utils build-essential ca-certificates && \
    # Add Node.js repository using the official, reliable script
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    # Install Node.js
    apt-get install -yqq nodejs && \
    # Install Python and Node packages
    pip install -U pip~=23.0.1 && \
    pip install "urllib3<2" pdm~=2.5.2 && \
    npm i -g npm@^8 pnpm@~9.5.0 && \
    # Clean up to reduce image size
    rm -rf /var/lib/apt/lists/*

COPY --from=chamber /chamber /bin/chamber

WORKDIR /pkgs
COPY packages/workers/pdm.lock packages/workers/pyproject.toml packages/workers/pdm.toml packages/workers/.pdm-python /pkgs/
RUN pdm sync

WORKDIR $APP_PATH
COPY /patches/ $APP_PATH/patches/
COPY package.json pnpm*.yaml $APP_PATH/

COPY $SRC_CORE_PATH/package.json $DEST_CORE_PATH/
COPY $SRC_WORKERS_PATH/package.json $DEST_WORKERS_PATH/

COPY packages/internal/tools $APP_PATH/packages/internal/tools/
COPY packages/webapp-libs/webapp-emails $APP_PATH/packages/webapp-libs/webapp-emails/
COPY packages/webapp-libs/webapp-api-client $APP_PATH/packages/webapp-libs/webapp-api-client/
COPY packages/webapp-libs/webapp-core $APP_PATH/packages/webapp-libs/webapp-core/
COPY packages/webapp-libs/webapp-finances $APP_PATH/packages/webapp-libs/webapp-finances/
COPY packages/webapp-libs/webapp-notifications $APP_PATH/packages/webapp-libs/webapp-notifications/

COPY tsconfig* $APP_PATH/
COPY $SRC_CLI_PATH $DEST_CLI_PATH/
RUN pnpm install --include-workspace-root --filter=workers... --filter=cli...

COPY nx.json tsconfig* jest* babel* .eslintrc* .prettier* .eslintrc* $APP_PATH/
COPY $SRC_CORE_PATH $DEST_CORE_PATH/
COPY $SRC_WORKERS_PATH $DEST_WORKERS_PATH/
RUN chmod +x $DEST_WORKERS_PATH/scripts/*.sh

ENV PYTHONPATH=/pkgs/__pypackages__/3.11/lib \
    PATH=$PATH:/pkgs/__pypackages__/3.11/bin

WORKDIR $DEST_WORKERS_PATH

CMD ["node", "./scripts/runtime/local-trigger-server.js"]