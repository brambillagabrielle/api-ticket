const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaControllers');

const { getTickets, addTicket, 
    updateTicket, deleteTicket, getTicketPorId } 
    = require('../controllers/ticketControllers');

const rotasTickets = new Router();

rotasTickets.route('/ticket')
    .get(verificaJWT, getTickets)
    .post(verificaJWT, addTicket)
    .put(verificaJWT, updateTicket)

rotasTickets.route('/ticket/:id')
    .get(verificaJWT, getTicketPorId)
    .delete(verificaJWT, deleteTicket)

module.exports = { rotasTickets };