//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const { emailExiste, esRoleValido, existeDepartamento, existeEmpresaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar', [
    check('encargado', 'El nombre del encargado es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre de la empresa es obligatoria').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('departamento', 'El departamento es obligatorio').not().isEmpty(),
    check('departamento').custom(existeDepartamento),
    check('rol').custom(esRoleValido),
    validarCampos
], postEmpresa);


router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('departamento').custom(existeDepartamento),
    check('rol').custom(esRoleValido),
    validarCampos
], putEmpresa);


router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], deleteEmpresa);


module.exports = router;