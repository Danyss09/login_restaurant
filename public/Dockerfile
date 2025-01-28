# Etapa 1: Construcción del backend
FROM node:16 AS backend

# Establecer el directorio de trabajo para el backend
WORKDIR /app

# Copiar los archivos del backend
COPY server.js package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Exponer el puerto del backend
EXPOSE 3000

# Comando para iniciar el backend
CMD ["node", "server.js"]

# Etapa 2: Construcción del frontend
FROM nginx:alpine AS frontend

# Establecer el directorio de trabajo para el frontend
WORKDIR /usr/share/nginx/html

# Copiar los archivos del frontend al contenedor
COPY index.html style.css app.js logo.png ./

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto del frontend
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
