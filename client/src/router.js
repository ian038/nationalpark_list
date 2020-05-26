import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Dashboard from './components/Dashboard'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}
