const Room = require('./Room');

function RoomManager() {
    this.rooms = [];
}

RoomManager.prototype.AddRoom = function (name) {
    let roomID = ("" + Math.random()).substring(2, 7);
    let tempRoom = new Room(roomID, name);
    this.rooms.push(tempRoom);
    return roomID;
};

RoomManager.prototype.getAll = function () {
    return this.rooms;
};

RoomManager.prototype.getTotal = function () {
    return this.rooms.length;
};

RoomManager.prototype.find = function (roomID) {
    return findObjectByKey(this.rooms, 'id', roomID);
};

RoomManager.prototype.getRoomName = function (roomID) {
    let room = findObjectByKey(this.rooms, 'id', roomID);
    if(room)
        return room.name;
    else
        return null;
};

function findObjectByKey(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

module.exports = new RoomManager();