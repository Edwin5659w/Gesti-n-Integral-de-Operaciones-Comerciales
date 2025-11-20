# Etapa 1: build
FROM node:18 AS builder
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa 2: runtime
FROM node:18-alpine
WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Variables de entorno
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
