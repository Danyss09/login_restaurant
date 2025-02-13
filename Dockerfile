# Usa una imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias dentro del contenedor
RUN npm install

# Copia la carpeta 'server' que contiene 'server.js' dentro del contenedor
COPY server ./server

# Expone el puerto que la aplicación usará
EXPOSE 3000

# Define el comando para iniciar la aplicación desde la carpeta 'server'
CMD ["node", "server/server.js"]
