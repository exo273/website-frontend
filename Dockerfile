# ==========================================
# Stage 1: Build
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (con legacy-peer-deps para resolver conflictos)
RUN npm install --legacy-peer-deps

# Copiar código fuente
COPY . .

# Build de la aplicación con adapter-node
RUN npm run build

# Limpiar devDependencies (con legacy-peer-deps para evitar conflictos)
RUN npm prune --production --legacy-peer-deps

# ==========================================
# Stage 2: Production
# ==========================================
FROM node:20-alpine

WORKDIR /app

# Copiar build y node_modules desde builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

# Comando de inicio
CMD ["node", "build/index.js"]
