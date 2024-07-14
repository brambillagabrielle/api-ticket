class Comentario {
    constructor(codigo, data_postagem, texto, usuario, editado) {
        this.codigo = codigo,
        this.data_postagem = data_postagem,
        this.texto = texto,
        this.usuario = usuario,
        this.editado = editado
    }
}

module.exports = Comentario