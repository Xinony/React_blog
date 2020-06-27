import React, { Component } from 'react'
import { Layout } from 'antd'
import {
  Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import SiderCustom from '../../components/admin/sider/siderCustom'
import HeaderCustom from '../../components/admin/header/headerCustom'
import { routes } from '../../constants/routes'
import { logout } from '../../redux/user.redux'
import './index.css'
import beian from "../../assets/beian.png";
import Auth from "../../components/admin/auth/auth";
const { Content, Footer } = Layout
@connect (
  state => state.user,
  { logout }
)
class Index extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.logout = this.logout.bind(this)
  }
  state = {
    collapsed: false
  }
  logout () {
    Cookies.remove('token')
    Cookies.remove('user_id')
    Cookies.remove('username')
    this.props.logout()
    this.props.history.push('')
  }
  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div className="container">
        <Auth></Auth>
        <Layout className="wrapper">
          <SiderCustom
            collapsed={this.state.collapsed}
          >
          </SiderCustom>
          <Layout className="wrapper-container">
            <HeaderCustom
              collapsed={this.state.collapsed}
              toggle={this.toggle}
              logout={this.logout}
            >
            </HeaderCustom>
              <Content style={{ margin: '24px 16px', padding: 24,background: '#ffffff', overflow: 'initial'}}>
                { Cookies.get('token') ?
                    routes.map(({ path, key, component, ...props }) => (
                        <Route key={key}
                               exact
                               path={path}
                               component={component}
                               {...props}
                        />
                    ))
                    : null }
              </Content>
            <Footer style={{ textAlign: 'center' }}>
              <p>&copy;2020 Xino's Blog 闽ICP备20003537号 </p><p><a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302033779" ><img src={beian} alt={"beian"}/>闽公网安备 35020302033779号</a></p>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index