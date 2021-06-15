const express = require('express'); // Importa o ExpressJS do node modules
const bodyParser = require('body-parser'); // Importa o Body Parser do node modules
const cors = require('cors');

// Criando/Invocando a API/Server Web do Express
const app = express(); // Invoca o express

// Configuração do parse do JSON
app.use(bodyParser.json({ limit: '10mb' })); // Configura o Express para converter o body em objeto JSON.
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cors());

// routers
const livroRouter = require('../routes/livro-router');


// // Configuração das rotas
app.use('/api/livros', livroRouter);


module.exports = app; // Exporta nossa API

// API -> MIDDLEWARES -> Rotas -> Controller -> Repository -> Banco