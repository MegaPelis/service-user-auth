const { NextFunction, Response, Request } = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { errorConstants } = require("../constants/errors.constant");
const { handlerError } = require("../handlers/error.handlers");

/** Método pra desencriptar el JWT
 * @param {Request} req
 * @param {Response} res
 * @returns {NextFunction}
 */
const dcryptJWT = (req = Request, res = Response, next = NextFunction) => {
    try {
        // Solicita token del header
        const token = req.header("x-token");
        // Desencripta el JWT y verifica si es valido
        req.usuario = jwt.verify(`${token}`, config.SECRETORPRIVATEKEY);
        next();
    } catch (error) {
        return handlerError(res, 401, errorConstants.invalidToken);
    }
};

module.exports = dcryptJWT;