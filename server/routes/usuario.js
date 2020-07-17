const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificarToken, verificarAdmin_role } = require('../middlewares/autenticacion');
const app = express();



app.get('/usuario', verificarToken, (req, res) => {
    /*return res.json({
    //SIRVE APRA VERIFICAR LA INFO DEL HEROKU

            usuario: req.usuario,
            nombre: req.usuario.nombre,
            email: req.usuario.email

        })*/
    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo,

                });
            });
        })
});

app.post('/usuario', [verificarToken, verificarAdmin_role], (req, res) => {

    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', [verificarToken, verificarAdmin_role], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});

app.delete('/usuario/:id', [verificarToken, verificarAdmin_role], (req, res) => {

    let id = req.params.id;
    // Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    let cambiarEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBD) {
            res.json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioBD
            });
        }
    });
});



module.exports = app;