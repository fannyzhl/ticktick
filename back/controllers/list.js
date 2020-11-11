const express = require('express');
const db = require('./../helpers/db');
const listQueries = require('./../helpers/queries').list;
const isLoggedIn = require('./../middlewares/isLogged').conectado;

let router = express.Router();

router.post('/agregar', isLoggedIn,  (req,res) => {
    db.task('insert-list', async task => {
    const newList = await task.none(listQueries.AgregarLista, [
        req.body.user_id, req.body.type, req.body.name_list])
    }).then(() => {
        res.status(200).send({
            status:200,
            response: 'Lista Agregada'
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status:500,
            response: 'No se pudo agregar la lista'
        })
    })
});

router.post('/borrar', isLoggedIn, (req,res) => {
    let userId = req.body.user_id;
    let listId = req.body.id_list;
    db.tx('delete-list', async t => {
        await t.none(listQueries.BorrarLista, [listId, userId]);
    }).then((data) => {
        res.status(200).send({
            status: 200,
            response: 'Se borro la lista'
        })
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status: 500,
            response: 'No se pudo borrar la lista'
        })
    })
});

router.post('/modificar', isLoggedIn, (req,res) => {
    db.none(listQueries.ActualizarLista, [
        req.body.name_list, req.body.id_list, req.body.user_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo modificar la lista'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo modificar la lista'});
    })
})

/*router.get('/buscadorProducto', (req, res) => {
    db.any(listQueries.BuscarProducto, [`%${req.params.product_name}%`])
    .then((data) => {
        res.status(200).send({
            status:200,
            response:data
            //list: data
        })
    }).catch((error) => {        
        res.status(403).send({
            status:403,
            response: 'No se encontro ningun producto'
        })
    })
});*/

router.get('/buscarLista', (req,res) => {
    db.any(listQueries.ListaUsuario,[req.body.user_id])
    .then((data) => {
        res.status(200).send({
            status:200,
            respone:data
        })
    }).catch((error) => {
        console.log(error)
        res.status(403).send({
            status:403,
            response: 'No se encontro ninguna lista'
        })
    })
});

module.exports = router