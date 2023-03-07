
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    const query = { estado: true };

    const listaEmpresa = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);

    res.json({
        msg: 'Lista Empresas',
        listaEmpresa
    });

}

const postEmpresa = async (req = request, res = response) => {

    const { encargado, nombre, correo, password, direccion, departamento, rol } = req.body;

    const empresaDB = new Empresa({ encargado, nombre, correo, password, direccion, departamento, rol });

    const salt = bcryptjs.genSaltSync();
    empresaDB.password = bcryptjs.hashSync(password, salt);
    await empresaDB.save();

    res.status(201).json({
        msg: 'Empresa agregada',
        empresaDB
    });

}

const putEmpresa = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, rol, estado, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const empresaEditada = await Empresa.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Empresa editada',
        empresaEditada
    });

}

const deleteEmpresa = async (req = request, res = response) => {

    const { id } = req.params;
    const empresaEliminada = await Empresa.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: 'Empresa eliminada',
        empresaEliminada
    });

}

module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}