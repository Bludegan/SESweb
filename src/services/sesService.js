const Clientes = require('C:/Users/Carlos/Desktop/SESweb-main/src/basedatos/Cliente');

const getAllClientes = async () => {
  return await Clientes.findAll();
};

const getOneCliente = async (idCliente) => {
  return await Clientes.findByPk(idCliente);
};

const createCliente = async (nuevoCliente) => {
  return await Clientes.create(nuevoCliente);
};

const updateCliente = async (idCliente, cambios) => {
  const cliente = await Clientes.findByPk(idCliente);
  if (!cliente) {
    throw new Error(`Cliente no encontrado con id ${idCliente}`);
  }
  return await cliente.update(cambios);
};

const deleteCliente = async (idCliente) => {
  const cliente = await Clientes.findByPk(idCliente);
  if (!cliente) {
    throw new Error(`Cliente no encontrado con id ${idCliente}`);
  }
  await cliente.destroy();
};

module.exports = {
  getAllClientes,
  getOneCliente,
  createCliente,
  updateCliente,
  deleteCliente,
};
