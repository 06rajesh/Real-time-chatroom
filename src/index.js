import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from './components/Utilities/AuthRoute';
import {thisSocket} from "./models/getFromApi";

import ChatRoom from './components/App';
import NotFound from './components/NotFound';
import Login from './components/Login';

class Layout extends Component {

    constructor(props){
        super(props);
        thisSocket.connectSocket('https://aqueous-anchorage-50772.herokuapp.com');
    }

    render(){
        return (
            <div className='full-height'>
                <Switch>
                    <AuthRoute exact path='/' component={ChatRoom}/>}/>
                    <AuthRoute exact path='/home' component={ChatRoom}/>}/>
                    <Route exact path='/login' component={Login}/>
                    <Route path='/*' component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

ReactDOM.render((
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
