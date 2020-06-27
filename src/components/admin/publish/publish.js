import React, { Component } from 'react'
import { connect } from 'react-redux'
import { publish } from '../../../redux/blog.redux'
import {
  Row,
  Col,
  Input,
  Button, Card
} from 'antd'
import './publish.css'
import marked from "marked";
@connect(
  state => state.blog,
  { publish }
)
class Publish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      summary: '',
      content: '',
      tags: '',
      catalog_id: 0,
      catalogData: '',
      user_id: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContent = this.handleContent.bind(this)
  }
  componentDidMount() {
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit() {
    this.props.publish(this.state)
    this.setState({
      title: '',
      summary: '',
      content: '',
      tags: ''
    })
    this.props.history.push("/admin/app/index")
  }
  handleContent(obj) {
    this.setState({
      content: obj
    })
  }

  render() {
    const { TextArea } = Input
    return (
      <div className="publish">
        <header className="publish-header">
          <h1>发表博客</h1>
        </header>
        <Row type="flex" justify="center">
          <Col xs={20} sm={16} md={16} lg={16} xl={16}>
            <div className="publish-input">
              <Input
                addonBefore="标题"
                size="large" 
                placeholder="文章标题"
                name="title"
                value={this.state.title}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <TextArea 
                rows={6} 
                autosize={{ minRows: 5}}
                placeholder="文章摘要" 
                name="summary"
                value={this.state.summary}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <TextArea 
                rows={6} 
                autoSize={{ minRows: 15}}
                placeholder="文章内容 markdown格式" 
                name="content"
                value={this.state.content}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <Card
                  title="预览"
              >
                <div
                    className="article-detail"
                    dangerouslySetInnerHTML={{ __html: this.state.content ? marked(this.state.content) : null }}
                />
              </Card>
            </div>
            <div className="publish-input">
              <Input
                addonBefore="标签"
                size="large" 
                placeholder="文章标签"
                name="tags"
                value={this.state.tags}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <Button
                type="primary"
                size="large"
                icon="check-circle-o"
                style={{float: 'right'}}
                onClick={this.handleSubmit}
              >
                发布
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Publish