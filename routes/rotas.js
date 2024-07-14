const { Router } = require('express');

const { rotasTickets } = require('./rotasTickets');
const { rotasComentarios } = require('./rotasComentarios');
const { login }  = require('../controllers/segurancaControllers');

const rotas = new Router();

rotas.route("/login").post(login);

rotas.use(rotasTickets);
rotas.use(rotasComentarios);

module.exports = rotas;