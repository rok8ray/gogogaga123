const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve the HTML file to the user
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for new "connections"
io.on('connection', (socket) => {
  console.log('A user connected!');

  // Listen for a message from a client
  socket.on('chat message', (msg) => {
    // Send that message to EVERYONE connected
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3000, () => {
  console.log('Chat server running on http://localhost:3000');
});