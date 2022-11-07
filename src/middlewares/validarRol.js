const usuario = require("../models/usuario");

const isAdmin = async (req = request, res = response, next) => {
    const id = req.uid;
    try {
        const user = await usuario.findOne({ _id: id, estado: true });
        if (!user) return res.status(400).send({ msg: "usuario no Existe" });
        if (user.rol !== "ADMIN_ROLE") return res.status(400).send({ msg: "Usuario no es admin" });
        req.usuario = user;
        next();
    } catch (error) {
        return res.status(500).send({ msg: "server error" });
    }
}

const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {
        try {
            if (!req.usuario) return res.status(400).send({ "msg": "usuario no existe" });
            if (!roles.includes(req.usuario.rol)) return res.status(400).send({ "msg": "usuario no tiene rol" });
            next();
        } catch (error) {
            return res.status(500).send("server Error");
        }
    }

}

module.exports = {
    isAdmin,
    tieneRol,
}