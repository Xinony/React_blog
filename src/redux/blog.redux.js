import axios from 'axios'
import {API_CODE} from "../common/js/api";
import {message} from "antd";

/**
 * action type
 */
const LIST_SUCCESS = 'LIST_SUCCESS'
const LIST_FAILURE = 'LIST_FAILURE'
const DESC_SUCCESS = 'DESC_SUCCESS'
const DESC_FAILURE = 'DESC_FAILURE'
const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
const COMMENT_FAILURE = 'COMMENT_FAILURE'
const DELETE_SUCCESS = 'DELETE_SUCCESS'
const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
const ERROR = 'ERROR'
/**
 * state
 */
const initState = {
  content: '',
  msg: '',
  tags: '',
  desc: '',
  commentSize: '',
  totalElements: 0
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function blog(state=initState, action) {
  switch(action.type) {
    case PUBLISH_SUCCESS:
      return {
        ...state,
        msg: action.payload
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        content: state.content.filter(v => v.id !== action.payload)
      }
    case LIST_SUCCESS:
      return {
        ...state,
        content: action.payload.data.rows,
        msg: action.payload.message,
        totalElements: action.payload.data.count
      }
    case ERROR:
      return {
        ...state,
        msg: action.payload
      }
    case DESC_SUCCESS:
      return {
        ...state,
        desc: {...action.payload.data,
          comment:action.payload.comment
        },
        tags: action.payload.data.tags,
        msg: action.payload.message
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentSize: state.desc.comment.push({
          content: action.newComment,
          created_at: +Date.now(),
          username: action.username
        })
      }
    case LIST_FAILURE:
    case DESC_FAILURE:
    case COMMENT_FAILURE:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */
function publishSuccess(data) {
  return {
    type: PUBLISH_SUCCESS,
    payload: data
  }
}
function listSuccess(data) {
  return {
    type: LIST_SUCCESS,
    payload: data
  }
}
function deteleSuccess(id) {
  return {
    type: DELETE_SUCCESS,
    payload: id
  }
}
function listFailure(data) {
  return {
    type: LIST_FAILURE,
    payload: data
  }
}

function descSuccess(data) {
  return {
    type: DESC_SUCCESS,
    payload: data
  }
}

function descFailure(data) {
  return {
    type: DESC_FAILURE,
    payload: data
  }
}

function commentSuccess(data, comment, username) {
  return {
    type: COMMENT_SUCCESS,
    payload: data,
    newComment: comment,
    username: username
  }
}

function commentFailure(data) {
  return {
    type: COMMENT_FAILURE,
    payload: data
  }
}
function errorMsg(data) {
  return {
    type: ERROR,
    payload: data
  }
}

/**
 * aysnc function
 */

export function publish({
                          title,
                          summary,
                          content,
                          tags,
                          catalog_id,
                          user_id
                        }) {
  return dispatch => {
    axios.post('/api/blog/creatblog', {
      title,
      summary,
      content,
      tags,
      catalog_id,
      user_id
    })
        .then(res => {
          if (res.status === 200 && res.data.code === API_CODE.OK) {
            dispatch(publishSuccess(res.data.message))
          } else {
            dispatch(errorMsg(res.data.message))
          }
        })
  }
}

export function getBlogList({
  offset,
  limit,
  tags,
  catalog_id,
  order
}) {
  return dispatch => {
    axios.get('/api/blog', {
      params: {
        offset,
        limit,
        tags,
        catalog_id,
        order
      }
    })
      .then(res => {
        if (res.status === 200 && res.data.code === API_CODE.OK) {
          dispatch(listSuccess(res.data))
        } else {
          dispatch(listFailure(res.data.message))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function deleteBlog(id) {
  return dispatch => {
    axios.delete(`/api/blog/delete?id=${id}`)
        .then(res => {
          if (res.status === 200 && res.data.code === API_CODE.OK) {
            dispatch(deteleSuccess(id))
            message.success(res.data.message, 1)
          } else {
            dispatch(errorMsg(res.data.message))
            message.error(res.data.message, 1)
          }
        })
  }
}
export function getBlogDesc(id) {
  return dispatch => {
    axios.get(`/api/blog/detail?id=${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === API_CODE.OK) {
          dispatch(descSuccess(res.data))
        } else {
          dispatch(descFailure(res.data.message))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function createComment({
  blog_id,
  user_id,
  content,
  username
}) {
  return dispatch => {
    axios.post('/api/blog/detail/creatcomment', {
      blog_id,
      user_id,
      content,
      username,
      date:+Date.now()
    })
    .then(res => {
      if(res.status === 200 && res.data.code === API_CODE.OK) {
        dispatch(commentSuccess(res.data, content, username))
      } else {
        dispatch(commentFailure(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
