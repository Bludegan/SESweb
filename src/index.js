const express = require('express');
const dotenv = require('dotenv')
const cokieParser = require ('cookie-parser')
const pool = require('./basedatos/database');
const app = express();
const Empleado = require('./basedatos/Empleado');

pool.getConnection()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos', err);
  });

//setiar plantillas
  app.set('view engine', 'ejs')
  app.use(express.static('dist'))
  app.use(express.urlencoded({extemded:true}))
  app.use(express.json())
  
//setiar entorno
dotenv.config({path: './src/env/.env'})
//setiar cookies
app.use(cokieParser())

//llamar router
app.use('/', require('./v1/routes/ClientesRutas'))

//Eliminar cache con el boton back 
app.use(function(req,res,next){
if(!req.user)
  res.header('Cache-Control','private, no-cache,no-store,must-revalidate');
    next();
});

app.listen(3000, () => console.log(`El servidor está corriendo en el puerto ${3000}`));


