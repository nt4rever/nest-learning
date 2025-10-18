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

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install --omit=dev

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]
