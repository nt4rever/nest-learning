FROM node:20-slim AS development

WORKDIR /usr/src/app

ENV NODE_ENV=development

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

COPY . .

RUN npm run build

CMD [ "npm","run","start:dev" ]

FROM node:20-slim AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Install OpenSSL for Prisma and AWS CLI
RUN apt-get update -y && \
    apt-get install -y openssl curl unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install --omit=dev

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# Copy entrypoint scripts
COPY fetch-ssm-params.sh /usr/src/app/fetch-ssm-params.sh
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh

# Make scripts executable
RUN chmod +x /usr/src/app/fetch-ssm-params.sh /usr/src/app/docker-entrypoint.sh

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD [ "node", "dist/main" ]
