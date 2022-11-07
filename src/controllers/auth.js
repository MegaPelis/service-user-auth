const { request, response } = require('express');
const Usuario = require('../models/usuario');;
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/JWT');
const { googleVerify } = require('../helpers/google-verify');

class loginController {
    constructor() {
    }


    async authLogin(req = request, res = response) {
        const { email, password } = req.body;
        try {

            const user = await Usuario.findOne({ email, estado: true });
            if (!user) return res.status(400).send({ msg: "Usuario/password no son correctos" })

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) return res.status(400).send({ msg: "Usuario/password no son correctos" });
            const token = await generarJWT(user.id);
            res.status(200).send({ token, user })
        } catch (error) {
            res.status(500).send({ "error": error.message })
        }
    }

    async googleSignIn(req = request, res = response) {
        const { id_token } = req.body;
        try {
            const { email, nombre } = await googleVerify(id_token);
            let usuario = await Usuario.findOne({ email });
            if (!usuario) {
                const data = {
                    nombre,
                    correo,
                    password,
                    google: true,
                }

                usuario = new Usuario(data);
                await usuario.sava();
            }
          
            if (!usuario.estado) return res.status(400).send({ "msg": "Usuario bloqueado" })

            const token = await generarJWT(usuario.id);
            return res.status(200).send({ usuario, token })
        } catch (error) {

        }
    }
}

module.exports = loginController;