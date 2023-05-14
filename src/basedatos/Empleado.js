const pool = require('../basedatos/database');
const jwt = require('jsonwebtoken')


const empleadoSchema = {
    nombre: { type: 'varchar', required: true },
    apellido: { type: 'varchar', required: true },
    empresa: { type: 'varchar', required: true },
    email: { type: 'varchar', required: true },
    telefono: { type: 'bigint', required: true },
    contraseña: { type: 'varchar', required: true }
  };

  //midleware
const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({
        mensaje: 'No se proporcionó un token de autorización'
      });
    }
  
    const decodedToken = jws.verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({
        mensaje: 'Token de autorización inválido'
      });
    }
  
    req.decodedToken = decodedToken;
    next();
};

class Empleado{
    static async obtenerEmpleados() {
        const query = 'SELECT * FROM SESclientes.Usuarios;';
        try {
          const [rows] = await pool.query(query);
          return rows;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

      static async obtenerEmpleado(idEmpleado) {
        const query = {
          text: 'SELECT * FROM SESclientes.Usuarios WHERE id = $1',
          values: [idEmpleado]
        };
        try {
          const { rows } = await pool.query(query);
          return rows[0];
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
}


module.exports = Empleado;