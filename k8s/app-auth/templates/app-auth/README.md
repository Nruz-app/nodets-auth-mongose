# This is a markdown file and should not be treated as a YAML file

## NOTA Agregar esta ruta en .helmignore

## Crear Secret private de Aunteticacion con google cloud (CLI)

# Nota Importante:

## Crear Secret
```
kubectl create secret generic auth-secret --from-literal=JWT_SEED=MySecretSeed --from-literal=MONGO_URL=mongodb://mongo-user:123456@mongo-service:27017 --from-literal=MONGO_DB_NAME=mystore --from-literal=MAILER_ACTIVE=false --from-literal=MAILER_SERVICE=gmail --from-literal=MAILER_EMAIL=ruznicolas176@gmail.com --from-literal=MAILER_SECRET_KEY='ccpx like ojxv xnua' --dry-run=client -o yaml | kubectl apply -f -
```


## Crear Deploy 
``` 
kubectl create deployment auth --image=nruz176/node-auth-mongose --dry-run=client -o yaml > auth.deployment.yml
```

## Crear Service 
```
kubectl create service nodeport auth-service --tcp=5000 --dry-run=client -o yaml > auth.service.yml
```