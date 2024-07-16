const { pool } = require('../config');
const Ticket = require('../entities/ticket');

const getTicketsDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM tickets ORDER BY id');
        return rows.map((ticket) => new Ticket(ticket.id, ticket.resumo, ticket.descricao, 
            ticket.responsavel, ticket.solicitante, ticket.data_abertura, ticket.status));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addTicketDB = async (body) => {
    try {
        const { resumo, descricao, solicitante } = body;
        const results = await pool.query(`INSERT INTO tickets (resumo, descricao, solicitante, data_abertura)
        VALUES ($1, $2, $3, NOW()) RETURNING id, resumo, descricao, responsavel, solicitante, data_abertura, status`,
        [resumo, descricao, solicitante]);
        const ticket = results.rows[0];
        return new Ticket(ticket.id, ticket.resumo, ticket.descricao, 
            ticket.responsavel, ticket.solicitante, ticket.data_abertura, ticket.status)
    } catch (err) {
        throw "Erro: " + err;
    }
}

const updateTicketDB = async (body) => {
    try {
        const { id, resumo, descricao, responsavel, status } = body;
        const results = await pool.query(`UPDATE tickets SET resumo = $2, descricao = $3, responsavel = $4, status = $5
        WHERE id = $1 RETURNING id, resumo, descricao, responsavel, solicitante, data_abertura, status`,
        [id, resumo, descricao, responsavel, status]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`
        }
        const ticket = results.rows[0];
        return new Ticket(ticket.id, ticket.resumo, ticket.descricao, 
            ticket.responsavel, ticket.solicitante, ticket.data_abertura, ticket.status)
    } catch (err) {
        throw "Erro ao alterar: " + err;
    }
}

const deleteTicketDB = async (id) => {
    try {        
        const results = await pool.query(`DELETE FROM tickets
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

const getTicketPorIdDB = async (id) => {
    try {        
        const results = await pool.query(`SELECT * FROM tickets
        WHERE id = $1 `,[id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id}`
        } else {
            const ticket = results.rows[0];
            return new Ticket(ticket.id, ticket.resumo, ticket.descricao, 
                ticket.responsavel, ticket.solicitante, ticket.data_abertura, ticket.status)
        }
    } catch (err) {
        throw "Erro ao recuperar: " + err;
    }
}

module.exports = { getTicketsDB, addTicketDB, 
    updateTicketDB, deleteTicketDB, getTicketPorIdDB }