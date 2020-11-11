const express = require('express');
const db = require('./../helpers/db');
const userQueries = require('./../helpers/queries').user;
const config = require('./../helpers/config')
const isNew = require('./../middlewares/isNew').isNew;
const isLogged = require('./../middlewares/isLogged');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let router = express.Router();

router.post('/registrar', isLogged.desconectado, isNew, (req, res) => {
    db.task('insert-user', async task => {
        console.log("aquiiii")
        let hash = bcrypt.hashSync(req.body.password, 10);
        const newId = await task.none(userQueries.AgregarUsuario, [req.body.fullname, hash, req.body.user_email]);
    }).then((data) => {
        res.status(200).send({
            status: 200,
            response: 'Exito'
        });
    }).catch((error) => {
        res.status(500).send({
            status: 500,
            response: 'Intentalo de nuevo'
        });
    })
});

router.post('/iniciar', isLogged.desconectado, (req, res) => {
    db.task('insert-user', async obj => {
        await obj.one(userQueries.BuscarUsuario, [req.body.user_email]).then(async user => {
            let compare =  await bcrypt.compare(req.body.password, user.password);
            if(compare){
                let jsonWebToken = jwt.sign(user,config.secret);
                res.status(200).send({
                    status: 200,
                    response: 'Inicio de sesion realizado!',
                    token: jsonWebToken
                })  
            } else{
                res.status(422).send({
                    status: 422,
                    response: 'Usuario o Contrasena invalida',
                }) 
            }        
        }).catch((error) => {
            res.status(422).send({
                status: 422,
                response: 'Usuario no encontrado',
            });
        });
        
    }).catch((error) => {
        res.status(500).send({
            status: 500,
            response: 'Intentalo de nuevo',
        });
    });
})

// LOGOUT
router.get('/cerrar', isLogged.conectado, (req, res) => {
    req.cerrar();
    res.status(200).send({
        status: 200,
    })
})

router.get('/auth', (req,res) => {
    if (req.isAuthenticated()) {
        res.status(200).send({auth:'logged'});
    } else {
        res.status(200).send({auth:'invited'});
    }
})

module.exports = router;