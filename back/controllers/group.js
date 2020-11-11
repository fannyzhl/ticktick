const express = require('express');
const db = require('./../helpers/db');
const groupQueries = require('./../helpers/queries').group;
const isLoggedIn = require('./../middlewares/isLogged').conectado;

let router = express.Router();

router.post('/agregar', isLoggedIn,  (req,res) => {
    db.task('insert-group', async task => {
    const newGroup = await task.none(groupQueries.AgregarGrupo, [
        req.body.id_list, req.body.task_id, req.body.group_id])
    }).then(() => {
        res.status(200).send({
            status:200,
            response: 'Tarea Agregada al grupo'
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status:500,
            response: 'No se pudo agregar la tarea al grupo'
        })
    })
});

router.post('/borrar', isLoggedIn, (req,res) => {
    db.any(groupQueries.LeerGrupo,[req.body.group_id])
    .then((data) => {
        if(!data){
            let userId = req.body.user_id;
            let groupId = req.body.group_id;
            db.tx('delete-group', async t => {
                await t.none(groupQueries.BorrarGrupo, [groupId, userId]);
            }).then((data) => {
                res.status(200).send({
                    status: 200,
                    response: 'Se borro el grupo'
                })
            }).catch((error) => {
                console.log(error)
                res.status(500).send({
                    status: 500,
                    response: 'No se pudo borrar el grupo'
                })
            })
        }else{
            res.status(201).send({
                status: 403,
                response: 'No se borro el grupo ya que tiene tareas asociadas'
            })
        }
    }).catch((error) => {
        console.log(error)
        res.status(403).send({
            status:403,
            response: 'No se encontro ningun grupo'
        })
    })
    
});

router.post('/modificar', isLoggedIn, (req,res) => {
    db.none(groupQueries.ActualizarGrupo, [
        req.body.group_name, req.body.group_id, req.body.user_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo modificar el grupo'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo modificar el grupo'});
    })
})

router.post('/agregar', isLoggedIn, (req,res) => {
    db.none(groupQueries.AgregarGrupo, [
        req.body.id_list, , req.body.task_id, req.body.group_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo agregar  el grupo'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo agregar el grupo'});
    })
})

router.post('/quitar', isLoggedIn, (req,res) => {
    db.none(groupQueries.QuitarGrupo, [
        req.body.id_list, , req.body.task_id])
    .then(() => {
        res.status(200).send({status:200, response:'Se pudo quitar  el grupo'});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500, response:'No se pudo quitar el grupo'});
    })
})


router.get('/buscarLista', (req,res) => {
    db.any(groupQueries.GrupoLista,[req.body.id_list])
    .then((data) => {
        if(data){
            res.status(200).send({
                status:200,
                respone:data
            })
        }else{
            res.status(403).send({
                status:200,
                respone:"No hay grupos en la lista"
            })
        }
        
    }).catch((error) => {
        console.log(error)
        res.status(403).send({
            status:403,
            response: 'error en encontrar grupo en la lista'
        })
    })
});

module.exports = router