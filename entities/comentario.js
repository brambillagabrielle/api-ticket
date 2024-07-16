class Comentario {
    constructor(id, data_postagem, texto, usuario, editado, ticket) {
        this.id = id,
        this.data_postagem = data_postagem,
        this.texto = texto,
        this.usuario = usuario,
        this.editado = editado,
        this.ticket = ticket
    }
}

module.exports = Comentario