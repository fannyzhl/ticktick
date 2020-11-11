module.exports.user = {
    BuscarCorreo: 'SELECT user_email FROM users WHERE user_email = $1',
    Buscar: 'SELECT fullname, user_email, user_id FROM users WHERE user_email = $1',
    BuscarUsuario: "SELECT password FROM users WHERE user_email = $1",
    AgregarUsuario: 'INSERT INTO users(fullname, password, user_email) VALUES ($1, $2, $3)'
}

module.exports.task = {
    TareaLista: 'SELECT *FROM task WHERE id_list = $1',
    AgregarTarea: 'INSERT INTO task(id_list, status, task_position, task_name, deadline, pinnear) VALUES($1, $2, $3, 4$, 5$, false)',
    BorrarTarea: 'DELETE FROM task WHERE task_id=$1 AND user_id=$2',
    TerminarTarea:'UPDATE task SET culmination_date = $1 WHERE task_id=$2 AND user_id=$3 ',
    ActualizarTarea:'UPDATE task SET task_name=$1 task_description = $2 WHERE task_id=$3 AND user_id=$4 ',
    AnclarTarea:"UPDATE task SET pinnear=true WHERE task_id=$1 AND user_id=$2",
    DesanclarTarea:"UPDATE task SET pinnear=false WHERE task_id=$1 AND user_id=$2"
}

module.exports.list = {
    ListaUsuario: 'SELECT *FROM list WHERE user_id = $1',
    AgregarLista: 'INSERT INTO list(user_id, type, name_list) VALUES($1, $2, $3)',
    BorrarLista: 'DELETE FROM list WHERE id_list=$1 AND user_id=$2',
    ActualizarLista:'UPDATE list SET name_list=$1  WHERE id_list=$2 AND user_id=$3 ',
}

module.exports.group = {
    GrupoLista: 'SELECT a.task_id, b.group_name, b.group_id, c.task_id, c.task_name, c.task_status FROM group_task as a JOIN groupt as b ON b.group_id = a.group_id JOIN list as c ON c.task_id = a.task_id WHERE a.id_list = $1',
    LeerGrupo:"SELECT *FROM group_task WHERE group_id=$1 AND ",
    CrearGrupo:"INSERT INTO groupt(user_id, group_name) VALUES($1, $2)",
    AgregarGrupo: 'INSERT group_task(id_list, task_id, group_id) VALUES($1, $2, $3)',
    QuitarGrupo: 'DELETE FROM group_task WHERE id_list=$1 AND task_id=$2',
    ActualizarGrupo:'UPDATE groupt SET group_name=$1  WHERE group_id=$2 AND user_id=$3 ',
    BorrarGrupo:"DELETE FROM groupt WHERE group_id=$1 AND user_id=$2"
}


