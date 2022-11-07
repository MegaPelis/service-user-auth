const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: { type: String, required:[true, 'Campo Obligatorio'] }
});

module.exports = model('Role', RoleSchema)