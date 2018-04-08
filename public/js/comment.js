var prepage = 5;//每页显示多少条
var page = 1;
var pages = 0;
var comments = []; //设为全局 方便渲染
//jquery 这边也用的很广
//使用AJAX 提交评论
$('#messageBtn').on('click',function() {
	$.ajax({
		type:'post',
		url:'/api/comment/post',
		data:{
			contentid:$('#contentId').val(), //当前文章id 从前端value拿到
			content:$('#messageContent').val()	//评论内容
		},
		success:function(responseData) {
			$('#messageContent').val("");	//提交后置空
			comments = responseData.data.reverse();//拿到数组反转一下再渲染 可以使评论降序
			renderComment(); //渲染评论
		}
	});
});

//每次页面重载的时候获取一下改文章的所有评论 默认get方式
$.ajax({
	url:'/api/comment',
	data:{
		contentid:$('#contentId').val()
	},
	success:function(responseData) {
		comments = responseData.data.reverse();
		renderComment();
	}
});

//上一页，事件委托 绑定在pager上 对a进行监听 卧槽 选中父节点去检查他的class属性
$('#pager').delegate('a','click',function() {
	if ( $(this).parent().hasClass('previous') ) {
		//上一页
		page--;
	}else{
		// 下一页
		page++;
	};
	renderComment();
});


//渲染评论页面
function renderComment() {

	//分页的实现
	var pages = Math.max(Math.ceil(comments.length / prepage),1);//总评论条数/每页显示多少条 向上取整 多少页
	var start = Math.max( 0,(page - 1) * prepage );	//每一页跳过多少条后 从下一条开始
	var end = Math.min( start + prepage,comments.length );//取到第几条结束

	var $lis = $('#pager li');//取到对应元素 li
	$lis.eq(1).html( page + ' / ' + pages );//选取li中带有指定 index 值的元素。即第二个li


	//上一页上一页
	if (page <= 1) {
		page = 1;
		$lis.eq(0).html('<span>没有上一页了</span>');	//第一个li
	}else{
		$lis.eq(0).html('<a href="javascript:;">上一页</a>');
	};
	if (page >= pages) {
		page = pages;
		$lis.eq(2).html('<span>没有下一页了</span>');//第三个li
	}else{
		$lis.eq(2).html('<a href="javascript:;">下一页</a>');
	};

	//评论数
	$('#messageCount').html(comments.length);//给id属性为messageCount

	//判断是否有评论
	if (comments.length  == 0 ) {
		$('#noComments').html('<div class="col s12 m12">还没有留言!</div>');
		$('#pager').hide();
		$('#messageList').hide();
	}else{
		$('#pager').show();
		$('#messageList').show();
		$('#noComments').html('');

		//评论
		var html = '';
		for (var i = start; i < end; i++) {//es6模版字符串	每一个评论都包括三个属性 username postTime content
			html += `
			<li class="collection-item avatar">
				<i class="material-icons circle cyan">comment</i>
				<span class="title">${comments[i].username}</span>
				<span class="right">${formatDate(comments[i].postTime)}</span>
				<p>${comments[i].content}</p>
			</li>`;
		};
		
		$('#messageList').html(html);//把上面的评论封装好就放进messageList
	};
}

//时间格式处理
function formatDate(d) {	//d 传进来是String类型
	var date1 = new Date(d);
	return `${date1.getFullYear()}年${date1.getMonth() + 1}月${date1.getDate()}日 ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`;
}