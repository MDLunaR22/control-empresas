const { Schema, model } = require('mongoose');

const SucursaleSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        unique: true
    }, 
    direccion:{
        type:String,
        required: true
    },
    departamento:{
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'La empresa es requerida']
    }
});

module.exports = model('Sucursale', SucursaleSchema);