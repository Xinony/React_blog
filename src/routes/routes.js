import React,{ Fragment } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Index from '../containers/layout/layout'
export default () => (
    <Fragment>
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
                <Route path="/" component={Index} />
            </Switch>
        </Router>
    </Fragment>
)