const { pool } = require('../config');
const Comentario = require('../entities/comentario');

const getComentariosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM comentarios ORDER BY id');
        return rows.map((comentario) => new Comentario(comentario.id, comentario.data_postagem, comentario.texto, 
            comentario.usuario, comentario.editado));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addComentarioDB = async (body) => {
    try {
        const { texto, usuario } = body;
        const results = await pool.query(`INSERT INTO comentarios (data_postagem, texto, usuario, editado)
        VALUES (NOW(), $1, $2, false) RETURNING id, data_postagem, texto, usuario, editado`,
        [texto, usuario]);
        const comentario = results.rows[0];
        return new Comentario(comentario.id, comentario.data_postagem, comentario.texto, 
            comentario.usuario, comentario.editado)
    } catch (err) {
        throw "Erro: " + err;
    }
}

const updateComentarioDB = async (body) => {
    try {
        const { id, texto } = body;
        const results = await pool.query(`UPDATE comentarios SET texto = $2, editado = true
        WHERE id = $1 RETURNING id, data_postagem, texto, usuario, editado`,
        [id, texto]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`
        }
        const comentario = results.rows[0];
        return new Comentario(comentario.id, comentario.data_postagem, comentario.texto, 
            comentario.usuario, comentario.editado)
    } catch (err) {
        throw "Erro ao alterar: " + err;
    }
}

const deleteComentarioDB = async (id) => {
    try {        
        const results = await pool.query(`DELETE FROM comentarios
        WHERE id = $1 `,[id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`
        } else {
            return "Registro removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover: " + err;
    }
}

const getComentarioPorIdDB = async (id) => {
    try {        
        const results = await pool.query(`SELECT * FROM comentarios
        WHERE id = $1 `,[id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`
        } else {
            const comentario = results.rows[0];
            return new Comentario(comentario.id, comentario.data_postagem, comentario.texto, 
                comentario.usuario, comentario.editado)
        }
    } catch (err) {
        throw "Erro ao recuperar: " + err;
    }
}

module.exports = { getComentariosDB, addComentarioDB, 
    updateComentarioDB, deleteComentarioDB, getComentarioPorIdDB }