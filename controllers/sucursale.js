
const { request, response } = require('express');

const Sucursal = require('../models/sucursale');
const Empresa = require('../models/empresa')

const getSucursales = async (req = request, res = response) => {

    const query = { estado: true };

    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query)
    ]);

    res.json({
        msg: 'Lista de Sucursales',
        listaSucursales
    });

}

const getByIdSucursal = async (req = request, res = response) => {
    const query = {estado : true};
    const {id} = req.params;

    const sucursalById = await Sucursal.findById(id);

    res.json({
        msg:'Sucursal',
        sucursalById
    })
}

const postSucursal = async (req = request, res = response) => {

    const empresa = req.header('x-token');
    const { nombre, direccion, departamento } = req.body;
    const empresaDB = Empresa.findOne(empresa.correo)

    const datos = {
        nombre,
        direccion,
        departamento,
        empresa: empresaDB.id
    }

    const sucursalDB = new Sucursal(datos);
    
    await sucursalDB.save();

    res.status(201).json({
        msg: 'Nuevo Sucursal',
        sucursalDB
    });

}

const putSucursal = async (req = request, res = response) => {

    const { id } = req.params;
    const { nombre, estado, direccion, departamento } = req.body;

    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, { nombre, estado, direccion, departamento });

    res.json({
        msg: 'Sucursal editado',
        sucursalEditada
    });

}

const deleteSucursal = async (req = request, res = response) => {

    const { id } = req.params;

    const estadoSucursal = await Sucursal.findOneAndUpdate(id, {estado: false})
    
    res.json({
        msg: 'Sucursal eliminado',
        estadoSucursal
    });

}

const asignacionSucursal = async (req = request, res = response) => {
    const { id } = req.header('x-token')
    const idSucursal = req.params;


    const empresaDB = await Empresa.findOneAndUpdate(id, {sucursales: idSucursal.id});

    res.json({
        msg:'Curso asignado'
    })

} 

module.exports = {
    getSucursales,
    getByIdSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal,
    asignacionSucursal
}