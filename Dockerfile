# syntax=docker/dockerfile:1

# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .

# --- Runtime stage ---
FROM node:20-alpine

ENV NODE_ENV=production

RUN addgroup --gid 1001 --system nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nodejs

WORKDIR /app

COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/index.js ./index.js
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 8080

CMD ["node", "index.js"]
