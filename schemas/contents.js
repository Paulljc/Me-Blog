var mongoose = require('mongoose');

// 内容的表结构
module.exports = new mongoose.Schema({

	// 分类看是一个字符串，但是我们使用引用
	// 关联字段 内容分类的ID
	category:{
		// 类型
		type:mongoose.Schema.Types.ObjectId, // 定义对象ID类型
		// 引用  另一张表的model model/Content.js
		ref:"Category"
	},

	// 内容标题
	title:String,

	// 关联字段 - 用户ID
	user:{
		// 类型
		type:mongoose.Schema.Types.ObjectId,
		// 引用  另一张表的model model/User.js
		ref:"User"
	},

	// 添加时间
	addTime:{
		type:Date,
		default:new Date()
	},

	// 阅读量
	views:{
		type:Number,
		default:0
	},

	// 简介
	description:{
		type:String,
		default:''
	},

	// 内容
	content:{
		type:String,
		default:''
	},

	// 评论
	comments:{	// 注意类型默认是数组	把用户上传的评论(是个对象) 放入一个数组中
		type:Array,
		default:[]
	}
});
