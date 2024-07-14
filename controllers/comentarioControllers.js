const { getComentariosDB, addComentarioDB, 
    updateComentarioDB, deleteComentarioDB, getComentarioPorIdDB } 
    = require('../usecases/comentarioUseCases');

const getComentarios = async (request, response) => {
    await getComentariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os comentarios: ' + err
        }));
}

const addComentario = async (request, response) => {
    await addComentarioDB(request.body)
        .then(data => response.status(200).json({
            status : 'success' , message : 'Comentário criado',
            objeto : data
        }))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

const updateComentario = async (request, response) => {
    await updateComentarioDB(request.body)
        .then(data => response.status(200).json({
            status : 'success' , message : 'Comentário alterado',
            objeto : data
        }))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

const deleteComentario = async (request, response) => {
    await deleteComentarioDB(request.params.id)
        .then(data => response.status(200).json({
            status : 'success' , message : data
        }))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

const getComentarioPorId = async (request, response) => {
    await getComentarioPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

module.exports = { getComentarios, addComentario, 
    updateComentario, deleteComentario, getComentarioPorId }