import React, { Component } from 'react'
import { 
  Layout
} from 'antd'
import {
  Route
} from 'react-router-dom'
import { routes } from '../../constants/routes'
import HeaderCustom from '../../components/blog/header/headerCustom'
import './layout.css'
import beian from "../../assets/beian.png"
const { Content, Footer } = Layout
class Index extends Component {
  render() {
    const contentHeight = document.body.clientHeight - 64 -62
    return (
      <Layout className="wrapper">
        <HeaderCustom></HeaderCustom>
        <Layout className="wrapper-container">
          <Layout className="wrapper-content">
            <Content
              style={{ padding: 24, margin: 0, minHeight: contentHeight, height: '100%', overflow: 'initial'}}
            >
              {
                routes.map(({ path, key, component, ...props }) => (
                  <Route key={key}
                    exact
                    path={path}
                    component={component}
                    {...props}
                  />
                ))
              }
            </Content>
          </Layout>
          <Footer
            style={{textAlign: 'center'}}
          >
            <p>&copy;2020 Xino's Blog 闽ICP备20003537号 </p><p><a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302033779" ><img src={beian} alt={"beian"}/>闽公网安备 35020302033779号</a></p>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Index