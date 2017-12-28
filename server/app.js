const express = require('express');
const morgan = require('morgan');
const path = require('path');
const http = require('http');

const routes = require('./router');

const app = express();

const server = http.Server(app);
const io = require('socket.io')(server);
const sockets = require('./sockets')(io);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/', routes);

module.exports = server;
