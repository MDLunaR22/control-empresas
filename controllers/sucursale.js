
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
    const query = { estado: true };
    const { id } = req.params;

    const sucursalById = await Sucursal.findById(id).populate('empresa', 'nombre');

    res.json({
        msg: 'Sucursal',
        sucursalById
    })
}

const postSucursal = async (req = request, res = response) => {

    const { empresa, ...body } = req.body;

    const datos = {
        ...body,
        nombre: body.nombre,
        empresa: req.empresa.id
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

    const estadoSucursal = await Sucursal.findOneAndUpdate(id, { estado: false })

    res.json({
        msg: 'Sucursal eliminado',
        estadoSucursal
    });

}

const asignacionSucursal = async (req = request, res = response) => {
    const idSucursal= req.params;
    const empresa = req.empresa._id;
    const sucursales = req.empresa.sucursales;
    const sucursalDB = await Sucursal.findOne({ _id: idSucursal.id })

    if (!sucursalDB) {
        return res.status(404).json({
            msg: 'Sucursal no encontrada'
        })
    }
    for (let sucursal of sucursales) {
        if (sucursalDB.id != sucursal) continue
        var existeSucursal = sucursal;
    } if (existeSucursal)
        return res.status(400).json({
            msg: 'Esta sucursal ya esta asignada a esta empresa'
        })

    const empresaDB = await Empresa.findOneAndUpdate(
        empresa,
        { $push: { 'sucursales': idSucursal.id } },
        { new: true }
    );

    res.json({
        msg: 'Sucursal asginada',
        empresaDB
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