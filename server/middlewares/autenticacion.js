const jwt = require('jsonwebtoken')

//verificartoken

let verificarToken = (req, res, next) => {
        let token = req.get('token');

        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token no valido',

                    }
                });
            }

            req.usuario = decoded.usuario
            next();
        });

    }
    // ====================
    // verificar ADMIN ROLE
    //=====================

let verificarAdmin_role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador',

            }
        });
    }

};
module.exports = {
    verificarToken,
    verificarAdmin_role
};