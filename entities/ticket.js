class Ticket {
    constructor(id, resumo, descricao, responsavel, solicitante, data_abertura, status) {
        this.id = id,
        this.resumo = resumo,
        this.descricao = descricao,
        this.responsavel = responsavel,
        this.solicitante = solicitante,
        this.data_abertura = data_abertura,
        this.status = status
    }
}

module.exports = Ticket