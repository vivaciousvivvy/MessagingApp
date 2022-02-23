const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { addNewUser, removeExistUser, getUser, getUsersInARoom } = require('./users');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('join', ({userName, roomId }, callback) => {
    const {error, user} = addNewUser({ id: socket.id, userName, roomId});

    if(error) {
      return callback(error);
    }

    socket.join(user.roomId);

    socket.emit('message', {
      user : 'admin',
      textContent: `${user.userName} has joined!`,
    })

    socket.broadcast.to(user.roomId).emit('message', {
      user: 'admin',
      textContent: `${user.userName} has joined!`,
    })

    io.to(user.roomId).emit('roomData', {
      roomId: user.roomId,
      users: getUsersInARoom(user.roomId),
    })

    callback();
  })
})

httpServer.listen(5000, () => console.log('listening on port 5000'));