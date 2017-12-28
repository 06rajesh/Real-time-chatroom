import React, { Component } from 'react';
import { List, Label, Image } from 'semantic-ui-react';

class ChatList extends Component{

    renderServerText(message, index, dateString) {
        return (
            <List.Item key={index} ref={index}>
                <List.Content>
                    <Label className='fluid server-text'>{message.text} at {dateString}</Label>
                </List.Content>
            </List.Item>
        );
    }

    renderUserText(message, index, dateString){
        return(
            <List.Item key={index} ref={index}>
                <Image floated='right' avatar src={message.image} style={{'margin' : '0 1rem 0 0;'}}/>
                <List.Content floated='right'>
                    <span className='time-text' style={{'paddingRight' : '5px'}}>{dateString}</span>
                    <Label pointing='right'>{message.text}</Label>
                </List.Content>
            </List.Item>
        );
    }

    renderChatLists(texts){
        if(texts.length > 0){
            return texts.map((message, index) => {
                let thisDate = new Date(message.date);
                let dateString = thisDate.getHours() + ':' + thisDate.getMinutes();
                if(message.user === 'SERVER' || message.user === 'server'){
                    return this.renderServerText(message,index, dateString);
                }else if(message.user === this.props.user){
                    return this.renderUserText(message, index, dateString);
                } else
                    return(
                        <List.Item key={index} ref={index}>
                            <Image avatar src={message.image}/>
                            <List.Content>
                                <Label pointing='right'>{message.text}</Label>
                                <span className='time-text'>{dateString}</span>
                            </List.Content>
                        </List.Item>
                    );
            })
        }

    }

    render(){
        return(
            <List>
                {this.renderChatLists(this.props.texts)}
            </List>
        );
    }
}

export default ChatList;