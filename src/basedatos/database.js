const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'sesclientes.cm2ubkgc3zbu.us-west-2.rds.amazonaws.com',
  user: 'aflores1',
  password: '15429Flo',
  database: 'SESclientes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;


