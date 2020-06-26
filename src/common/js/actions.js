import { API_LIST, API_CODE,LOGIN_URL} from './api'
import axios from "axios";

//发送post请求，登录，注册，添加，获取，删除,修改任务
export function apiRequest(api_url,data,callback) {
    axios.post(api_url, data).then((res) => {
        callback&&callback(res.data);
    })
}

// 用户登出或失效退出界面
export function logout() {
    window.localStorage.removeItem('loginInfo')
    window.location.href=LOGIN_URL
}

//检查apikey
export function checkapikey(callback) {
    var localUserInfo=JSON.parse(window.localStorage.getItem('loginInfo'))
    axios.post(API_LIST.CHECK_APIKEY, localUserInfo).then((res) => {
        if(res.data.code === API_CODE.ERR_LOGOUT){
            window.localStorage.removeItem('loginInfo');
            window.localStorage.removeItem('items');
            window.location.href=LOGIN_URL;
        }
        else {
            callback && callback(res.data);
        }
    })
}
//获取页面首次加载时间
export function loadtime() {
    if(window.name ===  ""){
        var starttime=window.localStorage.getItem('starttime')
        window.onload=function () {
            var loadtime=Date.now()-starttime;
            axios.post(API_LIST.COLLECT_LOAD_TIME, {loadtime:loadtime}).then((res) => {
                console.log(res.data)
            })
        }
        window.name = "isReload"; // 在首次进入页面时给window.name设置一个固定值
    }
}