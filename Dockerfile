# Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY package*.json ./
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install && pnpm install -g serve

# Билдим приложение
# Кэширование зависимостей — если файлы в проекте изменились,
# но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm run build:production

# Стейдж запуска
FROM node:20.11-alpine as runner
RUN npm install -g pnpm
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/ ./
EXPOSE 3921
CMD ["pnpm", "start"]