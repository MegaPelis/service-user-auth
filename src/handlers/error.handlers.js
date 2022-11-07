const { Response } = require("express");

// eslint-disable-next-line max-len
module.exports = handlerError = (res = Response, status, message) =>
    res.status(status).json({ message });