const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const UsuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es Requerido'] }, // String is shorthand for {type: String}
    apellido: { type: String, required: [true, 'El apellido es Requerido'] },
    email: { type: String, unique: true, required: [true, 'El email es Requerido'] },
    password: { type: String, required: [true, 'El password es Requerido'] },
    rol: { type: String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE'] },
    google: { type: Boolean, default: false },
    estado: { type: Boolean, default: true },
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = model('Usuario', UsuarioSchema);