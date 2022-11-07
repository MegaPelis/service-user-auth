const jwt = require('jsonwebtoken');
const config = require('../config/config')
const generarJWT = (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(payload, config.SECRETORPRIVATEKEY, {
			expiresIn: '4h'
		}, (err, token) => {
			if (err) {
				console.log(err)
				reject('No se puedo generar el token')
			}
			resolve(token);
		})
	});
}

module.exports = {
	generarJWT,
}