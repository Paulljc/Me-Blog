# Me-Blog
###Simple_personal_project

简单使用：
下载项目后，进入项目内.

npm install 安装依赖包

打开你安装的 MongoDB 安装教程自己百度

进入到你安装Mongo后的bin目录，一般开启指令为 mongod.exe --depath （此处加上你数据存放的路径）

开启之后若需要可视化工具可以下载 robo 3T管理

都开启好了的话，用 node app.js 启动即可

﻿###技术栈
﻿####前端

HTML/CSS/JS：前端三剑客

ES6：ECMAScript 2015 mongoose操作经常会涉及到promise

Bootstrap：页面 UI 框架，天然响应式，但是样式烂大街...

﻿####后端

swig：是一个可在客户端也可在服务端使用的模板引擎,语法简单，接近编程语言，主要用来生成 HTML 

Node.js：整个后端由 Node.js 驱动；用 npm 安装资源文件

Express：一个基于 Node.js 平台的 web 开发框架，由路由和中间件构成

﻿####数据库

mongoDB：进行数据存储的 NoSQL 数据库(文档型)

mongoose：Node.js 的 mongodb 驱动软件包，是进行 mongoDB 快速建模的工具

注意我代码里数据库 Schema 用户部分数据是开启了默认身份是管理员，你第一次上去可以先注册，然后自己修改代码，改为普通用户，重启即可。

数据库数据已经上传，连接上数据库后就可以将其导入。用 mongorestore.exe -d db_name (文件夹所在目录) 

只是一个练手项目，大家可以参考学习，有很多不足地方，请谅解，也可以在此基础上进一步的开发。
