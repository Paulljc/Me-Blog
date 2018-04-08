//1.引入express
const express = require('express');
//8.引入分类model
const Category = require('../models/Category');
//11.引入内容model
const Content = require('../models/Content');
const markdown = require( "markdown" ).markdown;
//2.创建路由
const router = express.Router();


//17。导航栏通用
var data;
router.use(function(req,res,next) {
	data = {
		//req.userInfo是之前从cookie中提取的封装
		userInfo:req.userInfo,
		categories:[]
	}

	Category.find().then(function(categories) {
		data.categories = categories;
		next();
	})
});

/*
*	5.设置首页路由
* 	9.首页
**/
router.get('/',function( req,res,next ) {
	//计算分页 进行排版
	data.category = req.query.category || '';//默认没选中分类
	data.contents = "";
	data.count = 0;
	data.page = Number(req.query.page || 1);//默认第一页
	data.limit = 5;
	data.pages = 0;
	// 14
	var where = {};
	//13
	if (data.category) {
		where.category = data.category;
	}

		//读取总页数
		//15分类的统计条数 也要与当前分类相关 即查javascript就只统计javascript总条数 而不是所有
	/*	刚接触mongoose可能不熟悉 where  当查询比较复杂时，用 where：例如下面：
	Model.where('age').gte(25).where('tags').in(['movie', 'music', 'art']).select('name', 'age', 'tags').skip(20)
        .limit(10).asc('age').slaveOk().hint({ age: 1, name: 1 }).run(callback);  如此复杂*/

		Content.where(where).count().then(function(count) {
		
		data.count = count;//多少记录
		// 计算总页数
		data.pages = Math.ceil( data.count/data.limit );
		//取值不能超过pages
		data.page = Math.min( data.page,data.pages );
		//取值不能小于1
		data.page = Math.max( data.page,1 );
		var skip = (data.page - 1) * data.limit;//每次跳过多少条记录 即取了多少条
		//关联表populate
		return Content.find().where(where).limit(data.limit).skip(skip).populate(['category','user']).sort({addTime:-1});		//按时间排序 where为查询条件 当前分类
	}).then(function(contents) {
		data.contents = contents;
		//7.分配模板数据,第二个参数是模板使用的数据
		res.render('main/index',data);
	});
});

//16.详情页
router.get('/view',function(req,res,next) {
	var categoryId = req.query.categoryid || '';//根据id找出对应的文章
	Content.findOne({
		_id:categoryId
	}).then(function(content) {
		data.content = content;

		//17。增加阅读数量
		content.views++;
		return content.save();
	}).then(function() {
		//markdown转html
		data.content.content = markdown.toHTML(data.content.content);
		res.render('main/view',data);/*view为详情页*/
	});
});

//4.导出模块
module.exports = router;