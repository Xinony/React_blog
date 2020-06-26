const moment = require("moment")
const express = require('express');
const router = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const secret="$_COPYRIGHT@XINONY"
const APIKEY_KEEP_TIME=60*1000*1000;//apikey有效时间
const API_CODE = {
    // API请求正常
    OK: '200',
    // API请求正常，数据异常
    ERR_DATA: '403',
    // API请求正常，空数据
    ERR_NO_DATA: '301',
    // API请求正常，登录异常
    ERR_LOGOUT: '401'
}
const connection = mysql.createConnection({
    host: 'localhost', //mysql连接ip地址
    user: 'root',
    password: 'Xino.0914', //mySql用户名密码
    database: 'myblog',
    port: '3306' //mysql连接端口
});

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cookieParser());
connection.connect()

//生成随机字符串
function randomString(len) {
    let str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '-','.','~','!','@','#','$','%','^','&','*','(',')','_',':','<','>','?'];
    for (let i = 0; i < len; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

//签发Token
function signtoken(payload,config) {
    const token = jwt.sign(payload, secret, config)
    return token
}

function checktoken(token) {
    let decode=jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            console.log(error.message)
            return false
        }
        return decoded
    })
    return decode
}

router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Orign', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.post('/api/login', (req, res) => {
        var  sql = 'SELECT * FROM user WHERE username =?';
        connection.query(sql,[req.body.username],function (err, result){
            if(err){
                let data={
                    code:API_CODE.ERR_DATA,
                    message:'数据库错误'
                }
                res.send(data);
                return;
            }
            if(result[0]===undefined){
                let data={
                    code:API_CODE.ERR_NO_DATA,
                    message:'没有该用户'
                }
                res.send(data);
            }
            else{
                if(result[0].password === req.body.password){
                    let logintime=moment().format('YYYY-MM-DD HH:mm:ss')
                    let payload={
                        userid:result[0].userid,
                        username:result[0].username,
                        logintime:logintime
                    }
                    let config={
                        expiresIn: '1day'
                    }
                    let token=signtoken(payload,config)
                    var sql1='UPDATE user SET `token`=?,`logintime`=? WHERE username=?';
                    connection.query(sql1,[token,logintime,req.body.username],function (err, result1) {
                        if (err) {
                            let data={
                                code:API_CODE.ERR_LOGOUT,
                                message:'登录错误',
                            }
                            res.send(data);
                        }
                        else {
                            let datenow=moment().format('YYYY-MM-DD')
                            let datepre=moment(result[0].logintime).format(['YYYY-MM-DD']);
                            console.log(datenow,datepre)
                            if(datepre !== datenow) {
                                let sql2 = 'SELECT * FROM login_times_daily WHERE date =?';
                                connection.query(sql2, [datenow], function (err, result2) {
                                    console.log(result2)
                                    if (err) {
                                        console.log(err)
                                    }
                                    if (result2[0] !== undefined) {
                                        let times = result2[0].times + 1
                                        let sql3 = 'UPDATE login_times_daily SET `times`=? WHERE date=?';
                                        connection.query(sql3, [times, datenow], function (err, result3) {
                                            if (err) {
                                                console.log(err)
                                            }
                                        })
                                    }
                                    else{
                                        let sql4 = 'INSERT INTO `login_times_daily`(`date`) VALUES (?)';
                                        connection.query(sql4, [datenow], function (err, result4) {
                                            if (err) {
                                                console.log(err)
                                            }
                                        })
                                    }
                                })
                            }
                        let data={
                            code:API_CODE.OK,
                            message:'登录成功',
                            data:result[0],
                            token
                            }
                                res.send(data);
                            }
                    });
                }
                else
                {
                    let data={
                        code:API_CODE.ERR_DATA,
                        message:'用户名或密码错误'
                    }
                    res.send(data);
                }
            }

        });
})

router.post('/api/regist', (req, res) => {
        const  sql = 'SELECT * FROM user WHERE username ="'+req.body.username+'"';
        connection.query(sql,function (err, result){
            if(result[0]){
                let data={
                    code:API_CODE.ERR_DATA,
                    message:'该用户已存在'
                }
                res.send(data);
            }
            else{
                const apikey = Date.now();
                const logintime = moment().format('YYYY-MM-DD HH:mm:ss');
                let payload={
                    userid:req.body.userid,
                    username:req.body.username,
                    logintime:logintime
                }
                let config={
                    expiresIn: '1day'
                }
                let token=signtoken(payload,config)
                const  sql1 = 'insert into user (username, password, usertype, token,logintime) value (?,?,"游客",?,?)';
                connection.query(sql1,[req.body.username, req.body.password,token,logintime],function (err, result){
                    if(err){
                        console.log(err)
                        let data={
                            code:API_CODE.ERR_DATA,
                            message:'数据库错误'
                        }
                        res.send(data);
                        return;
                    }
                    let datenow=new moment().format('YYYY-MM-DD')
                    let sql2 = 'SELECT * FROM login_times_daily WHERE date =?';
                    connection.query(sql2, [datenow], function (err, result2) {
                        console.log(result2)
                        if (err) {
                            console.log(err)
                        }
                        if (result2[0] !== undefined) {
                            let times = result2[0].times + 1
                            let sql3 = 'UPDATE login_times_daily SET `times`=? WHERE date=?';
                            connection.query(sql3, [times, datenow], function (err, result3) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                        else{
                            let sql4 = 'INSERT INTO `login_times_daily`(`date`) VALUES (?)';
                            connection.query(sql4, [datenow], function (err, result4) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    })
                    let data={
                        code:API_CODE.OK,
                        messgae:'注册成功',
                        userInfo:{
                            userid:result.insertId,
                            username:req.body.username,
                            usertype:"游客",
                            apikey:apikey,
                            logintime:logintime
                        },
                        token
                    }
                    res.send(data);
                });
            }
        });
})

router.get('/api/blog',(req,res) => {
    console.log(req.query)
    if (req.cookies) {
        var token = req.cookies.token
        var decode = checktoken(token)
        console.log(decode)
    }
    var sql = 'SELECT * FROM list LIMIT ? OFFSET ?';
    connection.query(sql, [parseInt(req.query.limit), parseInt(req.query.offset)], function (err, result) {
        if (err) {
            let data = {
                code: API_CODE.ERR_DATA,
                message: '数据库错误'
            }
            console.log(err)
            res.send(data);
            return;
        }
        console.log(result)
        let data={
            code:API_CODE.OK,
            message:'success',
            data:{
                count:result.length,
                rows:result
            }
        }
        res.send(data)
    })
})

router.get('/api/blog/detail',(req,res) => {
  console.log(req.query)
    var resdata= {}
    var sql = 'SELECT * FROM list WHERE id=?';
    connection.query(sql,[req.query.id],function (err,result) {
        if (err) {
            let data = {
                code: API_CODE.ERR_DATA,
                message: '数据库错误'
            }
            console.log(err)
            res.send(data);
            return;
        }
        console.log(result)
         resdata={
            code:API_CODE.OK,
            message:'success',
            data:result[0]
        }
    })
    var sql = 'SELECT * FROM comment WHERE blog_id=?';
    connection.query(sql,[req.query.id],function (err,result) {
        if (err) {
            let data = {
                code: API_CODE.ERR_DATA,
                message: '数据库错误'
            }
            console.log(err)
            res.send(data);
            return;
        }
        console.log(result)
        var commentdata={
            comment:result
        }
        let data={
            ...resdata,
            ...commentdata
        }
        console.log(data)
        res.send(data)
    })

})

router.post('/api/blog/detail/creatcomment',(req,res) => {
    console.log(req.body)
    var blog_id=req.body.blog_id,
        user_id=req.body.user_id,
        content=req.body.content,
        username=req.body.username,
        date=req.body.date
    var sql='INSERT INTO comment (blog_id,user_id,content,username,created_at) VALUES (?,?,?,?,?)'
    connection.query(sql,[blog_id,user_id,content,username,moment(+date).format('YYYY-MM-DD HH:mm:ss')],function (err,result) {
        if (err) {
            let data = {
                code: API_CODE.ERR_DATA,
                message: '数据库错误'
            }
            console.log(err)
            res.send(data);
            return;
        }
        console.log(result)
        let data={
            code:API_CODE.OK,
            message:'success',
        }
        res.send(data)
    })
})

let server = router.listen('8080', function(){
    const port = server.address().port;
    console.log('server starts....');
    console.log('*===============*');
    console.log('server is running at port', port);
})
