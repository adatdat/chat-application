//libs
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from '../store';
import PageChatRoom from 'templates/PageChatRoom';
import PageLogin from 'templates/PageLogin';
const App = (props) => {
    const store = configureStore();
    return (
        <Provider store={store}>
            <Router>
                <Route exact path='/' >
                    <PageChatRoom/>
                </Route>
            </Router>
        </Provider>
    );
}

export default App;
