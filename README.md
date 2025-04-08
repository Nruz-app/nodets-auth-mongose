# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

Cada paso de su configuración ya se ha realizado previamente en el curso, por lo que solo es necesario clonar el proyecto y comenzar a trabajar.


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

###### Comandos Ejecutar para contruir Imagenes de Docker ######

# Comando limpiar docker
``` 
docker-compose down
docker system prune -a --volumes -f
```
# Comando Para countruir la imagen local y prod
``` 
docker-compose build
docker-compose -f docker-compose.prod.yml build
```
# Comado para levantar imagen local y prod
```
docker-compose up -d
docker-compose -f docker-compose.prod.yml up -d
```
# Comado para subir imagen al repositorio de google cloud (GCP)
```
gcloud auth configure-docker us-central1-docker.pkg.dev
docker image push us-central1-docker.pkg.dev/teslo-shop-backend/teslo-shop-app/teslo-shop-backend
```