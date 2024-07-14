const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaControllers');

const { getComentarios, addComentario, 
    updateComentario, deleteComentario, getComentarioPorId } 
    = require('../controllers/comentarioControllers');

const rotasComentarios = new Router();

rotasComentarios.route('/comentario')
    .get(verificaJWT, getComentarios)
    .post(verificaJWT, addComentario)
    .put(verificaJWT, updateComentario)

rotasComentarios.route('/comentario/:id')
    .get(verificaJWT, getComentarioPorId)
    .delete(verificaJWT, deleteComentario)

module.exports = { rotasComentarios };