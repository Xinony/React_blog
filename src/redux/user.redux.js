import axios from "axios"
import {message} from "antd";

/**
 * type
 */

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILURE = 'REGISTER_FAILURE'
const ADMIN_CHECK_SUCCESS='ADMIN_CHECK_SUCCESS'
const ADMIN_CHECK_FAILURE='ADMIN_CHECK_FAILURE'
/**
 * state
 */
const initState = {
  usertype:0,
  user: '',
  msg: '',
  refresh: 1
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function user(state=initState, action) {
  switch(action.type) {
    case ADMIN_CHECK_SUCCESS:
      return {
        ...state,
        usertype:1,
        message:action.payload
      }
    case ADMIN_CHECK_FAILURE:
      return {
        ...state,
        usertype:0,
        message:action.payload,
        redirectTo:''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        msg: action.payload.message
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: '',
        msg: action.payload.message
      }
    case LOGOUT:
      return {
        user: '',
        msg: '',
        refresh: 0,
        redirectTo: ''
      }
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: '',
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data
  }
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export function registerFailue(data) {
  return {
    type: REGISTER_FAILURE,
    payload: data
  }
}
export function admincheckFailue(data) {
  return {
    type: ADMIN_CHECK_FAILURE,
    payload: data
  }
}
export function admincheckSuccess(data) {
  return {
    type: ADMIN_CHECK_SUCCESS,
    payload: data
  }
}
export function logout() {
  return {
    type: LOGOUT
  }
}


export function checkadmin(_this) {
  return dispatch=>{
    axios.get('/api/admin/check')
        .then(res=>{
          if (res.status === 200) {
            if(res.data.usertype!=="1"){
              _this.props.history.push('')
              dispatch(admincheckFailue("您不是管理员！"))
              message.error("您不是管理员！")
            }
            else {
              dispatch(admincheckSuccess("欢迎您，管理员！"))
              message.success("欢迎您，管理员！")
            }
          }
          else{
            dispatch(admincheckFailue("您不是管理员！"))
            message.error("您不是管理员！")
          }
        })
        .catch(err => {
          console.log(err)
        })
  }

}