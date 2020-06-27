import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Cookeis from 'js-cookie'
import {checkadmin} from "../../../redux/user.redux";
import {connect} from "react-redux";

@withRouter
@connect(
    state => state.user,
    {checkadmin}
    )
class Auth extends Component {
  componentDidMount() {
    const routePath = ['/app/index']
    const currentPath = this.props.location.pathname
    if (routePath.indexOf[currentPath] > -1) {
      return null
    }
    setTimeout(() => {
      let cookie = Cookeis.get('token')
      if (!cookie) {
        this.props.history.push('/app/index')
      }
    this.props.checkadmin(this)
    }, 0)
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Auth;