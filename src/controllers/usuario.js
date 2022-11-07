const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

class userController {

    constructor() {
    }

    async getUsuarios(req = request, res = response) {
        const { limit = 5, desde = 0 } = req.query;
        const estado = true
        try {
            const [user, total] = await Promise.all([
                Usuario.find({ estado })
                    //Desde donde se quiere traer
                    .skip(desde)
                    //limite de documentos
                    .limit(limit)
                ,
                //Cuenta el total de usuarios
                Usuario.countDocuments({ estado })]);

            res.status(200).send({ total, user });
        } catch (error) {
            res.status(404).send({ "error": error.message })
        }
    }

    /**
     * Funcion que Recive datos
     * @param {*} req 
     * @param {*} res 
     */
    async storeUser(req = request, res = response) {
        const { nombre, apellido, email, password, rol } = req.body;
        const user = new Usuario({ nombre, apellido, email, password, rol });
        try {
            const useremail = await Usuario.findOne({ email });
            if (useremail) return res.status(400).send({ msg: "Correo registrado" })

            //encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password, salt);
            //Guardar Usuario
            await user.save();

            return res.status(201).send(user);
        } catch (error) {
            res.status(500).send({ "Error": error.message })
        }

    }

    /**
     * Funcion que elimina datos
     * @param {*} req 
     * @param {*} res 
     */
    async deleteUsuarios(req = request, res = response) {
        const { id } = req.params
    
        try {
            const user = await Usuario.findByIdAndUpdate(id, { estado: false })
            res.status(200).send({ id, user });
        } catch (error) {
            res.status(404).send({ "error": error.message })
        }

    }

    /**
     * Funcion que actualiza datos
     * @param {*} req 
     * @param {*} res 
     */
    async putUsuarios(req = request, res = response) {
        const { id } = req.params;
        const { password, email, ...user } = req.body
        try {

            //encriptar contraseña
            if (password) {
                const salt = bcryptjs.genSaltSync();
                user.password = bcryptjs.hashSync(password, salt);
            }

            const usuarioDB = await Usuario.findByIdAndUpdate(id, user);


            res.status(200).send({ usuarioDB });
        } catch (error) {
            res.status(400).send({ "error": error.message })
        }
    }
}




module.exports = userController;