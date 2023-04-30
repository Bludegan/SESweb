const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sesclientes.cm2ubkgc3zbu.us-west-2.rds.amazonaws.com',
  user: 'aflores1',
  password: '15429Flo',
  database: 'SESclientes',
  port: 3306
});

module.exports = connection;

