import MD5 from "js-md5";

let API_DOMAIN = '/api/'
export const INDEX_URL = '/app/index'
export const LOGIN_URL = '/#/'
export const REGIST_URL = '/#/regist'
export const TODOLIST_URL = '/#/todolist'


// API请求正常，数据正常
export const API_CODE = {
    // API请求正常
    OK: '200',
    // API请求正常，数据异常
    ERR_DATA: '403',
    // API请求正常，空数据
    ERR_NO_DATA: '301',
    // API请求正常，登录异常
    ERR_LOGOUT: '401'
}
// API请求异常
export const API_FAILED = '网络连接异常，请稍后再试';
export const API_LOGOUT = '您的账号已在其他设备登录，请重新登录';


export const API_LIST = {
    // 用户登录
    USER_SIGNIN: API_DOMAIN + 'login',
    // 用户登出
    USER_SIGNOUT: API_DOMAIN + 'logout',
    //用户注册
    USER_SIGNUP: API_DOMAIN + 'regist',
    //检查apikey
    CHECK_APIKEY: API_DOMAIN + 'checkapikey',
    // 获取任务
    GET_TODO: API_DOMAIN + 'getTodo',
    // 添加任务
    ADD_TODO: API_DOMAIN + 'addTodo',
    // 修改任务状态--(未）完成
    CHANGE_TODO : API_DOMAIN + 'changeTodo',
    // 删除任务
    DELETE_TODO: API_DOMAIN + 'deleteTodo',
    //获取页面加载时间
    COLLECT_LOAD_TIME:API_DOMAIN + 'collectLoadTime'
}
//键盘上按键常量
export const KEY_CODE = {
    //ENTER键
    ENTER_KEY : 13,
    //ESC键
    ESCAPE_KEY : 27
}

const salt="xinoxinoxino";

// 密码加密
export function encryptPassword(password) {
    return MD5(salt+MD5(password));
}



