# Usa una imagen base ligera de Node.js
FROM node:21-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia solo los archivos de dependencias primero
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Asegura permisos correctos (opcional, útil si hay errores de permisos)
RUN chown -R node:node /usr/src/app

# Expone el puerto de la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación en desarrollo
CMD ["npm", "run", "start"]
