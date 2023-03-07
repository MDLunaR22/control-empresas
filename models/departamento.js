const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema({
    departamento: {
        type: String,
        required: [true, 'El nombre del departamento es requerido'],
        unique: true
    }
});


module.exports = model('Departamento', DepartamentoSchema)