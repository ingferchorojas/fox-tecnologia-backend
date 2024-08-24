# nodejs-mongodb

## Descripción
Es un proyecto base para Node.js con Typescript y base de datos MongoDB

## Instalación
1. Clonar el repositorio: `git clone https://github.com/ingferchorojas/nodejs-mongodb.git`
2. Instalar dependencias: `npm install`
3. Crear el archivo .env 

```env
MONGODB_URI=xxxx
JWT_SECRET=xxxx
```

## Uso
1. Iniciar el servidor: `npm start`
2. Hacer una petición al servidor usando una herramienta como Postman o cURL:
  

Post - http://localhost:3000/api/signup 
```json
{
   "email":"ejemplo@ejemplo.com",
   "password":"123456"
}
```

Post - http://localhost:3000/api/auth/login
```json
{
   "email":"ejemplo@ejemplo.com",
   "password":"123456"
}
```
Get - http://localhost:3000/api/user


Requiere de`Bearer token`

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt

## Contribuciones
Las contribuciones son bienvenidas. Por favor crea un issue o envía un pull request si deseas contribuir.

## Licencia
Este proyecto está bajo la Licencia MIT.
