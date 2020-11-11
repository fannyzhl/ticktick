const express = require('express');
const db = require('./../helpers/db');
const taskQueries = require('./../helpers/queries').task;
const isLoggedIn = require('./../middlewares/isLogged').conectado;

let router = express.Router();

router.post('/agregar', isLoggedIn,  (req,res) => {
    db.task('insert-task', async task => {
    const newTask = await task.none(taskQueries.AgregarTarea, [
        req.body.id_list, req.body.status, req.body.task_position, req.body.task_name, req.body.deadline])
    }).then(() => {
        res.status(200).send({
            status:200,
            response: 'Tarea Agregada'
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status:500,
            response: 'No se pudo agregar la tarea'
        })
    })
});

router.post('/borrar', isLoggedIn, (req,res) => {
    let userId = req.body.user_id;
    let taskId = req.body.task_id;
    db.tx('delete-task', async t => {
        //await t.none(taskQueries.BorrarCarrito, [productId]);
        await t.none(taskQueries.BorrarTarea, [taskId, userId]);
    }).then((data) => {
        res.status(200).send({
            status: 200,
            response: 'Se borro la tarea'
        })
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status: 500,
            response: 'No se pudo borrar la tarea'
        })
    })
});

router.post('/modificar', isLoggedIn, (req,res) => {
    db.none(taskQueries.ActualizarTarea, [
        req.body.task_name, req.body.task_description, req.body.task_id, req.body.user_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo modificar la tarea'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo modificar la tarea'});
    })
})

router.post('/terminar', isLoggedIn, (req,res) => {
    db.none(taskQueries.TerminarTarea, [
        req.body.culmination_date, req.body.task_id, req.body.user_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo terminar la tarea'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo terminar la tarea'});
    })
})

router.post('/anclar', isLoggedIn, (req,res) => {
    db.none(taskQueries.AnclarTarea, [
        req.body.task_id, req.body.user_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo anclar la tarea'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo anclar la tarea'});
    })
})

router.post('/desanclar', isLoggedIn, (req,res) => {
    db.none(taskQueries.DesanclarTarea, [
        req.body.task_id, req.body.user_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo modificar la desanclar'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo modificar la desanclar'});
    })
})

/*router.get('/buscadorProducto', (req, res) => {
    db.any(taskQueries.BuscarProducto, [`%${req.params.product_name}%`])
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

router.get('/buscarTarea', (req,res) => {
    db.any(taskQueries.TareaLista,[req.body.id_list])
    .then((data) => {
        res.status(200).send({
            status:200,
            respone:data
        })
    }).catch((error) => {
        console.log(error)
        res.status(403).send({
            status:403,
            response: 'No se encontro ninguna tarea'
        })
    })
});

module.exports = router