# Stage 1: Build the Angular application
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the Angular application using Caddy
FROM caddy:2.8-alpine

ENV CADDY_ROOT /usr/share/caddy

COPY --from=build /app/dist/todo-list-app $CADDY_ROOT
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
