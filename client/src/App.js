import React, {Component} from 'react';
import './App.css';
import PlayerList from './PlayerList';
import Quiz from './Quiz';
import QuizRegistration from './QuizRegistration';
import MainMenu from './MainMenu';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainMenu}/>
                    <Route exact path="/rating" component={PlayerList}/>
                    <Route path="/checkin" component={QuizRegistration}/>
                    <Route path="/quiz" component={Quiz}/>
                </div>
            </Router>
        );
    }
}

export default App;
