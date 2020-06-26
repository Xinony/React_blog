import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  Icon
} from 'antd'
import './about.css'
import SiderCustom from '../sider/siderCustom'
class About extends Component {
  componentDidMount() {
    document.title = 'Xino\'s Blog'
  }
  render() {
    return (
      <div>
        <Row>
        <Col
            lg={{ span: 15, offset: 1 }}
            md={{ span: 15, offset: 1 }}
            xs={{ span: 24 }}
            className="about-wrapper"
          >
            <Card
              title="关于我"
              style={{marginBottom: 20}}
            >
              <p>&nbsp;厦门大学2021届本科生，集成电路设计与集成系统专业，一次偶然的机会接触到前端，从此走上了这条不归路（X）。</p>
              <p>&nbsp;这个博客前端界面抄的<a href="https://github.com/k-water" target="_blank" rel="noopener noreferrer">Water</a>的，因为觉得挺好看的，然后小修小改一下，再自己写个后端。</p>
              <p>&nbsp;归档和收藏还没写，慢慢来，有兴趣的可以一起交流交流，反正我就是个菜鸡。</p>
            </Card>
            <Card
              title="联系我"
            >
              <div className="content">
                <p>
                  <Icon type="mail" /> 邮箱：xinony@qq.com
                </p>
                <p style={{marginTop: 20}}>
                  <Icon type="github" /> Github：<a href="https://github.com/Xinony" target="_blank" rel="noopener noreferrer">Xinony</a>
                </p>
                <p style={{marginTop: 20}}>
                  <Icon type="github" /> 源Github：<a href="https://github.com/k-water" target="_blank" rel="noopener noreferrer">k-water</a>
                </p>
              </div>
            </Card>
          </Col>
          <Col
            lg={{ span: 6, offset: 1 }}
            md={{ span: 6, offset: 1 }}
            xs={{ span: 0 }}
          >
            <SiderCustom />
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col
            lg={{ span: 0 }}
            md={{ span: 0 }}
            xs={{ span: 24 }}
          >
            <SiderCustom />
          </Col>
        </Row>
      </div>
    )
  }
}

export default About