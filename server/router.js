const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const RoomManager = require('./models/RoomManager');

let reactRoute = (request, response) => {
    //render your react page
    response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
};

router.get('/api/rooms', (req, res) => {
    "use strict";
    res.json({
        rooms: RoomManager.getAll(),
        status: 'success'
    });
});

router.get('/api/room', (req, res) => {
    "use strict";
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    let room = null;
    if(query.id){
       room = RoomManager.find(query.id);
    }

    res.json({
        room: room,
        status: (room !== null)
    });

});

router.get('/api/room/name', (req, res) => {
    "use strict";
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    let roomName = null;
    if(query.id){
        roomName = RoomManager.getRoomName(query.id);
    }

    res.json({
        name: roomName,
        status: (roomName !== null)
    });

});

router.use('/', reactRoute);
router.use('/*', reactRoute);

module.exports = router;