import React, { Component } from 'react'
import {
  Modal,
  Input,
  Icon,
  message,
  Button
} from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { encryptPassword,API_CODE } from '../../common/js/api'
import { loginSuccess, loginFailure } from '../../redux/user.redux'

@connect(
  state => state.user,
  { loginSuccess, loginFailure }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  login({username, password}) {
    var encryptpassword =encryptPassword(password)
    axios.post('/api/login', {
      username,
      password:encryptpassword
    }, { withCredentials: true })
    .then(res => {
      console.log(res)
      if(res.status === 200 && res.data.code === API_CODE.OK) {
        this.props.loginSuccess(res.data)
        let token=res.data.token
        let config={
          expires: 1/24,
          path: '/'
        }
        Cookies.set('token', token, config)
        Cookies.set('username', username, config)
        Cookies.set('user_id', res.data.data.userid, config)
        this.props.handleCancel()
        this.setState({
          username: '',
          password: ''
        })
      } else {
        this.props.loginFailure(res.data.message)
        message.error(res.data.message, 1)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleOk() {
    if(!this.state.username) {
      message.warn('用户名不能为空')
    } else if(!this.state.password){
      message.warn('密码不能为空')      
    } else {
      this.login(this.state)
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <Modal 
        title="登录"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        width={320}
        footer={null}
      >
        <div className="login-input">
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div
          className="login-submit"
        >
          <Button
            style={{width: '100%'}}
            type="primary"
            onClick={this.handleOk}
          >
            登录
          </Button>
        </div>
      </Modal>
    )
  }
}

export default Login