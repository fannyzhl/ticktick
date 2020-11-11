const db = require('./../helpers/db');
const userQueries = require('./../helpers/queries').user;

module.exports.isNew = (req, res, next) => {
    verificarData(req.body).then((data) => {  
        if(!data) 
            next();
        else 
            res.status(403).send(data)             
    }).catch((error) => {
        console.log(error)
        res.status(500).send({ response: 'Intentalo de nuevo isNew'})
    })
}

async function verificarData(params) {
    return db.task('signup-task', async t => {
        const email = await t.oneOrNone(userQueries.BuscarCorreo, [params.user_email]);
        if(email) {
            return {response: 'Correo electronico ya registrado'}
        }
        return false
    }).catch((error) => {
        throw error
    });
}

