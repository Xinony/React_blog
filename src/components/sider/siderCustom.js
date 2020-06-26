import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'
import {
  Card,
} from 'antd'
import './sider.css'
@withRouter
@connect(
  state => state.blog,
  {}
)
class SiderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: []
    }

  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="sider-container">
        <div className="admin-info">
          <header>
            <img src={avatar} alt="avatar"/>
          </header>
          <p className="admin-name">
            Xino
          </p>
          <p className="admin-desc">
            前端，从入门到放弃
          </p>
        </div>
        <div className="recent-article">
          <Card title="最近发布" bordered={false}>
            {
              this.props.content ? <ul className="recent-list">
                {
                  this.props.content.map(v => (
                      <li key={v.id} onClick={() => this.props.history.push(`/app/blog/desc/${v.id}`)}>
                        {v.title}
                      </li>
                  ))
                }
              </ul>
              : null
            }
          </Card>
        </div>
      </div>
    )
  }
}

export default SiderCustom