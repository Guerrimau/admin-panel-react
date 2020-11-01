import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

import { PanelRoutes } from './PanelRoutes';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch> 
                    <Route exact path='/login'    component={ LoginScreen }   />
                    <Route exact path='/register' component={ RegisterScreen }/>
                    <Route path="/" component={PanelRoutes} />
                    <Redirect to='/login'/>
                </Switch>
            </div>
        </Router>
    )
}