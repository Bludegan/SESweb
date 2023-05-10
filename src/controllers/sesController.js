const sesService = require("../services/sesService");

const getAllClientes = (req,res) => {
    const obtenerClientes = sesService.getAllClientes();
    res.send("Get all clientes")
};

const getOneCliente = (req,res) => {
    const obtenerCliente = sesService.getOneCliente(req.params.idClientes);
    res.send(`Get cliente ${req.params.idClientes}`);
};

const createCliente = (req,res) => {
    const crear = sesService.createCliente(req.body);
    res.send(`Create cliente ${crear}`);
};

const updateCliente = (req,res) => {
    const actualizar = sesService.updateCliente(req.params.idClientes, req.body);
    res.send(`Update cliente ${req.params.idClientes}`);
};

const deleteCliente = (req,res) => {
    sesService.deleteCliente(req.params.idClientes);
    res.send(`Delete cliente ${req.params.idClientes}`);
};

module.exports={
    getAllClientes,
    getOneCliente,
    createCliente,
    updateCliente,
    deleteCliente,
};
