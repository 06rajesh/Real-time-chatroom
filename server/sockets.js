
const RoomManager = require('./models/RoomManager');

module.exports = function(io){
    "use strict";

    io.sockets.on('connection', function (socket) {

        socket.on('createRoom', function (name) {
            let newRoom = RoomManager.AddRoom(name);
            let room = {
                id: newRoom,
                name: name
            };

            socket.emit('updateChat', 'SERVER', 'Your room is ready, invite someone using this ID:' + newRoom);
            socket.emit('roomCreated', room);
        });

        socket.on('addUser', function (data) {
            let username = data.username;
            let roomID = data.room;

            let room = RoomManager.find(roomID);

            if (room) {
                socket.username = username;
                socket.room = roomID;
                room.addUser(username);
                socket.join(roomID);
                socket.emit('updateChat', 'SERVER', 'You are connected. Start chatting');
                socket.broadcast.to(roomID).emit('updateChat', 'SERVER', username + ' has connected to this room');
            } else {
                socket.emit('updateChat', 'SERVER', 'Please enter valid code.');
            }
        });

        socket.on('sendChat', function (data) {
            io.sockets.in(socket.room).emit('updateChat', socket.username, data);
        });

        socket.on('removeUser', function () {
            removeFromSocket(socket);
        });


        socket.on('disconnect', function () {
            removeFromSocket(socket);
        });

    });
};

function removeFromSocket(socket) {

    let room = RoomManager.find(socket.room);

    if (socket.username !== undefined) {

        socket.broadcast.to(socket.room).emit('updateChat', 'SERVER', socket.username + ' has disconnected');

        if (room) {
            room.removeUser(socket.username);
        }
        socket.leave(socket.room);
    }
}