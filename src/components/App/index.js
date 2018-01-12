import React, { Component } from 'react';
import { Container, Icon, Form, Input, Segment } from 'semantic-ui-react';
import {Header, Button } from 'semantic-ui-react';
import './style.css';


import { getRoomDetails, thisSocket} from '../../models/getFromApi';
import {CheckAuth} from "../Utilities/AuthRoute";
import ChatList from './chatList';

let socket;

class ChatRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
            name: null,
            id: null,
            currentChat: '',
            texts: []
        };

        socket = thisSocket.getSocket();

        socket.on('updateChat', (username, data) => {
            let tempText = this.state.texts;
            let messageObj = {};
            messageObj.user = username;
            messageObj.image = 'http://dummyimage.com/50x50/8903ff/fff&text=' + username.charAt(0).toUpperCase();
            messageObj.text = data;
            messageObj.date = new Date().getTime();
            tempText.push(messageObj);

            this.setState({
                texts: tempText
            });

            console.log(this.state.user);
        });

        this.logout = this.logout.bind(this);
        this.sendChatToSocket = this.sendChatToSocket.bind(this);
    }

    componentDidMount(){
        let room = getRoomDetails();

        this.setState({
            user: room.user,
            name: room.name,
            id: room.id
        });
    }

    logout(){
        CheckAuth.signout(() => {
            socket.emit('removeUser');
            this.props.history.push('/');
            this.setState({
                user: null,
                name: null,
                id: null,
                currentChat: '',
                texts: []
            });
        });
    }

    handleCurrentChat(event){
        this.setState({
            currentChat: event.target.value
        });
    }

    sendChatToSocket(event){
        event.preventDefault();
        socket.emit('sendChat', this.state.currentChat);
        this.setState({
            currentChat:''
        });

        if(this.refs[this.state.texts.length - 1]){
            this.refs[this.state.texts.length - 1].scrollIntoView({ inline: 'end', behavior: 'smooth'});
        }

    }

    render() {
        const chatBoxHeight = (window.innerHeight - 180) + 'px';
        return (
          <div className="app full-height flex-cont">
              <p className="App-intro" style={{'flex' : '0 1 auto'}}>
                  Start Chatting With Others By Sharing <b>{this.state.id}</b> this number.
              </p>

              <Container text style={{'flex' : '1'}} className='flex-cont'>
                  <Segment.Group raised className='flex-cont' style={{'height' : '96%'}}>
                      <Segment inverted color='blue' clearing style={{'flex' : '0 1 auto'}}>
                          <Header as='h3' floated='left' style={{'marginBottom' : '0'}}>
                              Room: {this.state.name}
                          </Header>
                          <Button color='blue'
                                  floated='right' compact size='mini'
                                  onClick={this.logout}>
                              <Icon name='sign out'/> Logout
                          </Button>
                      </Segment>
                      <Segment
                          style={{'flex' : '1 0 auto', 'overflowY' : 'scroll', 'maxHeight':chatBoxHeight }}>
                          <ChatList texts = {this.state.texts} user={this.state.user}/>
                      </Segment>
                      <Segment secondary style={{'flex' : '0 1 auto'}}>
                          <Form onSubmit={this.sendChatToSocket}>
                            <Input value={this.state.currentChat}
                                   onChange={this.handleCurrentChat.bind(this)}
                                   action={<Button type="submit" onClick={this.sendChatToSocket} color='purple'><Icon name='send' /></Button>}
                                   placeholder='Enter Something...' fluid/>
                          </Form>
                      </Segment>
                  </Segment.Group>
              </Container>
          </div>
        );
    }
}

export default ChatRoom;
