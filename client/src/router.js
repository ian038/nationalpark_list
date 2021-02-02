import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Dashboard from './components/Nav/Dashboard'
import Home from './components/Home/Home'
import SignIn from './components/User/SignIn'
import SignUp from './components/User/Signup'
import PrivateRoute from './auth/PrivateRoute'
import States from './components/States/States'

export default function Router() {
    return (
        <BrowserRouter>
        <Dashboard />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
                <PrivateRoute exact path='/search' component={States} />
            </Switch>
        </BrowserRouter>
    )
}
