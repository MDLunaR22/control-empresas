const Sucursal = require('../models/sucursale');
const Empresa = require('../models/empresa');
const Role = require('../models/role');
const Departamento = require('../models/departamento')

const existeEmpresaPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfEmpresa = await Empresa.findById( id );
    if ( !existIdOfEmpresa ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeSucursalPorId = async( id ) => {

    //Verificar si existe el ID
    const existeSucursal = await Sucursal.findById( id );
    if ( !existeSucursal ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const emailExiste = async( correo = '' ) => {
    const existeEmailDeEmpresa = await Empresa.findOne( { correo } );
    if ( existeEmailDeEmpresa) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}


const existeDepartamento = async (departamento = '') => {
    const existeDepartamentoDeSucursales = await Departamento.findOne({departamento})
    if(!existeDepartamentoDeSucursales){
        throw new Error(`El departamento: ${departamento} no existe en la db`)
    }
}

module.exports = {
    emailExiste,
    existeDepartamento,
    esRoleValido,
    existeSucursalPorId,
    existeEmpresaPorId
}