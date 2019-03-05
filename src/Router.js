import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

const RouterComponent = () => {
    return (
        <Router>
            <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">React Test</Link>
                
            </nav> <br/>
            <Switch>
                <Route exact path='/create' component={ Create } />
                <Route path='/edit/:id' component={ Edit } />
                <Route path='/' component={ Index } />
            </Switch>
            </div>
        </Router>
    );
};

export default RouterComponent;
