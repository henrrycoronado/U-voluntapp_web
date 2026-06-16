# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Argumentos de construcción para variables de entorno de Vite
ARG VITE_API_BASE_URL
ARG VITE_JWT_STORAGE_KEY
ARG VITE_ENABLE_DEBUG

# Pasar argumentos a variables de entorno para que Vite las use en el build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_JWT_STORAGE_KEY=$VITE_JWT_STORAGE_KEY
ENV VITE_ENABLE_DEBUG=$VITE_ENABLE_DEBUG

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código y construir
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración personalizada de Nginx para SPA (manejo de rutas de React)
RUN printf "server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files \$uri \$uri/ /index.html;\n\
    }\n\
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
