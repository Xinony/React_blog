import React,{ Fragment } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Index from '../containers/layout/layout'
import Admin from '../containers/layout_admin/index'
export default () => (
    <Fragment>
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
                <Route exact path="/admin" render={() => <Redirect to="admin/app/index" push />} />
                <Route path="/admin" component={Admin} />
                <Route path="/" component={Index} />
            </Switch>
        </Router>
    </Fragment>
)