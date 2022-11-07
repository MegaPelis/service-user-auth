const { Router } = require('express');
const { check } = require('express-validator');
const authRouter = Router();
const loginController = require('../controllers/auth');
const auth = new loginController();
const { validarCampos } = require('../middlewares/validarCampos');

authRouter.post('/login', [check('email', 'el correo es obligatorio').isEmail(),
check('password', 'la contraseña es obligatoria').not().isEmpty(), validarCampos], auth.authLogin);

authRouter.post('/google', [check('id_token', 'Id_token es necesario').not().isEmpty(), validarCampos], auth.googleSignIn);



module.exports = authRouter 