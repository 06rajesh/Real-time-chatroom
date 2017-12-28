import axios from 'axios';
import {CheckAuth} from "../components/Utilities/AuthRoute";

import io from "socket.io-client";

class SocketInstance {
    constructor(){
        this.socket = null;
    }

    connectSocket(URL){
        this.socket = io.connect(URL);
    }

    getSocket(){
        return this.socket;
    }
}

export const thisSocket = new SocketInstance();

export function getRooms() {
    return axios.get('/api/rooms');
}

export function findRoom(id) {
    return axios.get('/api/room?id='+id);
}

export function getRoomName(id) {
    return axios.get('/api/room/name?id='+id);
}

export function getRoomDetails() {
    return {
        user: CheckAuth.user,
        id: CheckAuth.roomID,
        name: CheckAuth.roomName
    };
}