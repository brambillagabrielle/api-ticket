const { getTicketsDB, addTicketDB, 
    updateTicketDB, deleteTicketDB, getTicketPorIdDB } 
    = require('../usecases/ticketUseCases');

const getTickets = async (request, response) => {
    await getTicketsDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os tickets: ' + err
        }));
}

const addTicket = async (request, response) => {
    await addTicketDB(request.body)
        .then(data => response.status(200).json({
            status : 'success' , message : 'Ticket criado',
            objeto : data
        }))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

const updateTicket = async (request, response) => {
    await updateTicketDB(request.body)
        .then(data => response.status(200).json({
            status : 'success' , message : 'Ticket alterado',
            objeto : data
        }))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

const deleteTicket = async (request, response) => {
    await deleteTicketDB(request.params.id)
        .then(data => response.status(200).json({
            status : 'success' , message : data
        }))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

const getTicketPorId = async (request, response) => {
    await getTicketPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status : 'error',
            message : err
        }));
}

module.exports = { getTickets, addTicket, 
    updateTicket, deleteTicket, getTicketPorId }