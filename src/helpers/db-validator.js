const Role = require('../models/role')
const usuario = require('../models/usuario')

const isRol = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) throw new Error('El usuario no tiene el Rol Asignado')
}

const emailExiste = async (email) => {
    const isEmail = await usuario.findOne({ email });
    if (isEmail) throw new Error(' EL email ya existe ')
}

const isUser = async (id) => {
    const user = await usuario.findById(id);
    if (!user) throw new Error('El usuario no existe');
}
module.exports = {
    isRol,
    emailExiste,
    isUser
}