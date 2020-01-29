const express = require('express');

const server = express();

const account = require('./accountRoutes');

server.use(express.json());

server.use('/accounts', account);

server.get('/' , (req, res) => {
    res.send(`
    <h2> Welcome to my API </h2>`)
})

module.exports = server;