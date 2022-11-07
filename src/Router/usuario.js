const { Router } = require('express');
const userController = require('../controllers/usuario')
const usuarioRouter = Router();
const user = new userController();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos')
const { isRol, emailExiste, isUser } = require('../helpers/db-validator');
const { AuthUser } = require('../middlewares/validarJWT');
const { isAdmin, tieneRol} = require('../middlewares/validarRol');

usuarioRouter.put('/:id', [check('id', 'No es id de mongo').isMongoId(),
check('id').custom(isUser), validarCampos], user.putUsuarios);


usuarioRouter.post('/',
        [check('nombre', "El nombre es obligatorio").not().isEmpty(),
        check('password', "El password debe ser de 6 letras").isLength({ min: 6 }),
        check('email').custom(emailExiste),
        check('rol').custom(isRol)
, validarCampos], user.storeUser);

usuarioRouter.get('/', user.getUsuarios);


usuarioRouter.delete('/:id', AuthUser, isAdmin, tieneRol('ADMIN_ROLE'), [check('id', "No es id de mongoDB").isMongoId(),
check('id').custom(isUser),
        validarCampos], user.deleteUsuarios)


module.exports = usuarioRouter 