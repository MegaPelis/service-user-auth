const { response, request } = require("express")
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const AuthUser = async (req = request, res = response, next) => {
    const token = req.header('auth');
    if (!token) return res.status(401).send({ msg: "no existe Token" });
    try {
        const { uid } = jwt.verify(token, config.SECRETORPRIVATEKEY);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(token)
        return res.status(500).send({ msg: "server error" });
    }
}

module.exports = {
    AuthUser
}