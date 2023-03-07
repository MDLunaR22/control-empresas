const { Router } = require('express');
const { check } = require('express-validator');

const { existeSucursalPorId, esRoleValido, existeDepartamento } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Controllers
const { getSucursales, getByIdSucursal, postSucursal, putSucursal, deleteSucursal, asignacionSucursal } = require('../controllers/sucursale');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', getSucursales);

// Obtener una categoria por el id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
], getByIdSucursal);

// Crear Categoria - privado - cualquier persona con un token valido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre de la sucursal es obligatoria').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('departamento', 'El departamento es obligatorio').not().isEmpty(),
    check('departamento').custom( existeDepartamento ),
    validarCampos
], postSucursal);

router.post('/asignar/:id', [
    validarJWT,
    check('rol').custom(esRoleValido)
], asignacionSucursal);

// Actualizar Categoria - privado - se requiere id y un token valido
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('departamento').custom( existeDepartamento ),
    validarCampos
], putSucursal);

// Borrar una categoria - privado - se requiere id y un token valido - solo el admin puede borrar
router.delete('/eliminar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
], deleteSucursal);

module.exports = router;