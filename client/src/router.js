import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Dashboard from './components/Nav/Dashboard'
import Home from './components/Home'
import SignIn from './components/User/SignIn'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signin' component={SignIn} />
            </Switch>
        </BrowserRouter>
    )
}
