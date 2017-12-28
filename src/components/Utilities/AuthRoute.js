/**
 * Created by abhi on 12/20/17.
 */


import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

class AuthClass {

    constructor(){
        this.isAuthenticated = false;
        this.roomID = null;
        this.roomName = null;
    }

    authenticate(username, room, cb) {
        this.user = username;
        this.roomID = room.id;
        this.roomName = room.name;
        this.isAuthenticated = true;
        setTimeout(cb(this.isAuthenticated), 100); // fake async
    }

    signout(callback) {
        this.isAuthenticated = false;
        this.roomName = null;
        this.roomID = null;
        setTimeout(callback, 100);
    }

};

export const CheckAuth = new AuthClass();

export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
           render={
                (props) => (
                    CheckAuth.isAuthenticated ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}/>)
                )
           }
    />
);