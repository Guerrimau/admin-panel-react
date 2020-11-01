import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from "../components/layout/Navbar";

import { ProjectsScreen } from '../components/projects/ProjectsScreen';
import { UsersScreen } from '../components/users/UsersScreen';


export const PanelRoutes = () => {
    return (
        <div>
            <Navbar title="Panel Administrativo"/>
            <div>
                <Switch>
                    <Route exact path='/empleados'    component={ UsersScreen } />
                    <Route exact path='/proyectos' component={ ProjectsScreen } />
                    <Redirect to='/login'/>
                </Switch>
            </div>
        </div>
    )
}
