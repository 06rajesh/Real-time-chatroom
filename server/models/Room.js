function Room(id, name) {

    this.name = name;
    this.id = id;
    this.users = [];
}

Room.prototype.totalUsers = function () {
    return this.users.length;
};

Room.prototype.addUser = function (username) {
    this.users.push(username);
};

Room.prototype.removeUser = function (username) {
    if (this.users.indexOf(username) != -1) {
        delete this.users[username];
    }
};

module.exports = Room;