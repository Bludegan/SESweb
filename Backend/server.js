const express = require('express');
const app = express();
const database = require('./config/database');

// Configuración de la ruta para obtener todos los clientes
app.get('/Clientes', (req, res) => {
  database.query('SELECT * FROM Clientes', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(3306, () => console.log('Servidor iniciado en el puerto 3306'));
