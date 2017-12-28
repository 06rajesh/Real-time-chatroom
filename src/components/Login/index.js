import React, { Component } from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';
import { Tab, Container, Icon, Card, Header } from 'semantic-ui-react';
import { Button, Form, Input } from 'semantic-ui-react';

import {CheckAuth} from "../Utilities/AuthRoute";

import {getRoomName, thisSocket} from "../../models/getFromApi";

let socket;

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:'',
            name: '',
            username: '',
            redirectToReferrer : CheckAuth.isAuthenticated
        };

        socket = thisSocket.getSocket();

        socket.on('roomCreated', (room) => {
            let data = {
                username : this.state.username,
                room : room.id
            };

            socket.emit('addUser', data);

            CheckAuth.authenticate(this.state.username, room, (success)=>{
                this.setState({
                    redirectToReferrer: success
                });
            });
        });


        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.addUserToRoom = this.addUserToRoom.bind(this);
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleChangeUser(event){
        this.setState({
            username: event.target.value
        });
    }

    handleChangeID(event){
        this.setState({
            id: event.target.value
        });
    }

    createRoom(event){
        event.preventDefault();

        if(this.state.name.length !== 0){
            socket.emit('createRoom', this.state.name);
        }
    }

    addUserToRoom(event){
        let data = {
            username : this.state.username,
            room : this.state.id
        };

        event.preventDefault();
        getRoomName(this.state.id).then((response) => {
            let roomName = response.data;

            if(roomName.status){

                let room = {
                    id: this.state.id,
                    name: roomName.name
                };

                console.log(room);

                if(this.state.username.length !== 0){
                    socket.emit('addUser', data);

                    CheckAuth.authenticate(this.state.username, room, (success)=>{
                        this.setState({
                            redirectToReferrer: success
                        });
                    });
                }
            }
        });



    }

    renderCreateRoomTab(){
        return(
            <Tab.Pane attached={true}>
                <Header as='h3'>
                    Create new room
                </Header>
                <Form onSubmit={this.createRoom}>
                    <Form.Field>
                        <Input icon='copyright' iconPosition='left' type="text" name='name' placeholder="Enter Room Name" value={this.state.name} onChange={this.handleChangeName}/>
                    </Form.Field>
                    <Form.Field>
                        <Input icon='user' iconPosition='left' type="text" name='username' placeholder="Enter User Name" value={this.state.username} onChange={this.handleChangeUser}/>
                    </Form.Field>
                    <Button type="submit" icon labelPosition='right' color='violet' onClick={this.createRoom} fluid>
                        Create Room
                        <Icon name='right arrow' />
                    </Button>
                </Form>
            </Tab.Pane>
        );
    }

    renderJoinRoomTab(){
        return(
            <Tab.Pane attached={true}>
                <Header as='h3'>
                    Join to a room
                </Header>
                <Form onSubmit={this.addUserToRoom}>
                    <Form.Field>
                        <Input icon='at' iconPosition='left' type="text" name='roomID' placeholder="Enter Room ID" value={this.state.id} onChange={this.handleChangeID}/>
                    </Form.Field>
                    <Form.Field>
                        <Input icon='user' iconPosition='left' type="text" name='username' placeholder="Enter User Name" value={this.state.username} onChange={this.handleChangeUser}/>
                    </Form.Field>
                    <Button type="submit" icon labelPosition='right' color='purple' onClick={this.addUserToRoom} fluid>
                        Join Room
                        <Icon name='right arrow' />
                    </Button>
                </Form>
            </Tab.Pane>
        );
    }


    render() {
        const { redirectToReferrer } = this.state;
        const color = 'blue';

        const panes = [
            { menuItem: { key: 'new', icon: 'users', content: 'Create Room' }, render: this.renderCreateRoomTab.bind(this) },
            { menuItem: { key: 'join', icon: 'external', content: 'Join Room' }, render: this.renderJoinRoomTab.bind(this) }
        ];

        if(redirectToReferrer){
            return(
                <Redirect to='/'/>
            );
        }
        return (
          <div className="login">
              <Icon name='comments' size='massive' inverted/>
              <p className="app-intro inverted">
                  Start chatting now by joining room or creating new room
              </p>
              <Container text>
                  <Card fluid>
                      <Card.Content>
                          <Tab
                              menu={{ color, inverted: true, aligned: 'center', attached: false, tabular: false }}
                              panes={panes}
                          />
                      </Card.Content>
                  </Card>
              </Container>

          </div>
        );
    }
}

export default Login;
