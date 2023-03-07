const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    encargado: {
        type: String,
        required: [true, 'El nombre del encargado es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatoria'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    direccion:{
        type: String,
        required: [true, 'El departamento es obligatorio']
    },
    departamento:{
        type: String,
        required: [true, 'El departamento es obligatorio']
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    sucursales:{
        type: Array
    }
});

module.exports = model('Empresa', EmpresaSchema)