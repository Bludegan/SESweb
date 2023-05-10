const pool = require('../basedatos/database');
const jwt = require('C:/Users/Carlos/Desktop/SESweb-main/src/services/jwt');


const clienteSchema = {
  nombre: { type: 'varchar', required: true },
  apellido: { type: 'varchar', required: true },
  empresa: { type: 'varchar', required: true },
  email: { type: 'varchar', required: true },
  telefono: { type: 'bigint', required: true },
  rfc: { type: 'varchar', required: true }
};

class Cliente {
    static async crearCliente(cliente) {
      const query = {
        text: 'INSERT INTO SESclientes.Clientes(nombre, apellido, empresa, email, telefono, rfc) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [cliente.nombre, cliente.apellido, cliente.empresa, cliente.email, cliente.telefono, cliente.rfc]
      };
  
      try {
        const { rows } = await pool.query(query);
        return rows[0];
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    static async obtenerClientes() {
      const query = 'SELECT * FROM SESclientes.Clientes;';
      try {
        const [rows] = await pool.query(query);
        return rows;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    static async obtenerCliente(idCliente) {
      const query = {
        text: 'SELECT * FROM SESclientes.Clientes WHERE id = $1',
        values: [idCliente]
      };
      try {
        const { rows } = await pool.query(query);
        return rows[0];
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

  
    static async actualizarCliente(idCliente, datosCliente) {
      const query = {
        text: 'UPDATE SESclientes.Clientes SET nombre=$1, apellido=$2, empresa=$3, email=$4, telefono=$5, rfc=$6 WHERE id=$7 RETURNING *',
        values: [datosCliente.nombre, datosCliente.apellido, datosCliente.empresa, datosCliente.email, datosCliente.telefono, datosCliente.rfc, idCliente]
      };
      try {
        const { rows } = await pool.query(query);
        return rows[0];
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    static async eliminarCliente(idCliente) {
      const query = {
        text: 'DELETE FROM SESclientes.Clientes WHERE id=$1',
        values: [idCliente]
      };
      try {
        await pool.query(query);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
  
  module.exports = Cliente;