// 这是做增删改查的操作
// Schema是定义数据表的结构
// 这里是模型类 通过操作模型来进行增删改查

var mongoose = require('mongoose');
var userSchema = require('../schemas/user');


module.exports = mongoose.model('User',userSchema);