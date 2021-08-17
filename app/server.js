const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 5000

// Permitindo o client ser acessado pela mesma porta
// Evitamos assim o CORS
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Iniciamos a instancia do socket.io para que ele receba
// A comunicação do client
io.on('connection', function (socket) {
  console.log('[>] Usuário conectado.')
  io.emit('chat message', '[Sistema] Usuário conectado');

  socket.on('disconnect', function () {
    console.log('[>] Usuário desconectado.')
  })

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

server.listen(PORT, function () {
  console.log('[>] Service running on port', PORT);
});
