// 加载express
const express = require('express');
// 加载swig模板
const swig = require('swig');
// 记载mongoose模板
const mongoose = require('mongoose');
// 加载body-parser，用来处理post提交过来的数据
const bodyParser = require('body-parser');
// 加载cookies
const cookies = require('cookies');
// 创建app应用 == http.createServer
const app = express();
// 引入User的model
const User = require('./models/User');

// 设置静态文件托管
app.use('/public',express.static( __dirname + '/public' ));

// 定义当前应用所使用的的模板引擎
app.engine('html',swig.renderFile);

// 是否设置缓存
swig.setDefaults({cache:false});

// 默认的HTML是转义的,就是转化成html字符串,fasle会把html标签解析
//{% autoescape false %}{{content.content}}{% endautoescape %} 指定不转义
swig.setDefaults({ autoescape: true });

// 设置模板文件的放置目录
app.set('views','./views');

// 注册模板引擎
app.set('view engine','html');

// body-parser设置
app.use( bodyParser.urlencoded({extended:true}) );

// cookies设置
app.use(function(req,res,next) {
    req.cookies = new cookies(req,res); // 创建一个cookie放入请求体的request

    // 用于存放登录用户的cookies信息
    req.userInfo = {};

    if ( req.cookies.get('userInfo')) { // 在api.js设置的cookie信息 userInfo 内有 _id 和 username
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo')); // 相当于req.cookies.userInfo封装到req.userInfo

            // 获取当前用户的类型,是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                // 防止报错
                next();
            });
        }catch(e){
            // 防止报错
            next();
        };
    }else{
        next();
    };
});


// 根据不同模块的划分  相当于二级路由
app.use('/admin',require('./routers/admin'));// 指向后台管理员页面业务逻辑
app.use('/api',require('./routers/api'));// 指向登录注册页面业务逻辑
app.use('/',require('./routers/main'));// 指向用户页面业务逻辑

// 链接数据库
mongoose.connect('mongodb://localhost:27017/blog',function(err) {
    if (err) {
        console.log(err)
    }else{
        console.log('mongodb is ok！！！');
        // 数据库联机成功才创建应用
        // 监听http请求
        app.listen(8088,"0.0.0.0");
    };
});