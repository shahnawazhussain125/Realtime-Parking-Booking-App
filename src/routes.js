import React from 'react'; 
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Admin from './pages/admin';
import User from './pages/user'

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {SignIn} />
                <Route path = "/signin" component = {SignIn} />
                <Route path = "/signup" component = {SignUp} />
                <Route path = "/admin" component = {Admin} />
                <Route path = "/user" component = { User } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;