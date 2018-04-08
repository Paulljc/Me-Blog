$(function() {

	//启动初始化
	(function init() {

		//统一格式
		$register = $('#register');	//jquery根据前台首页id属性取得元素对象 注册
		$login = $('#login');//登录
		$userInfo = $('#userInfo');//用户信息

		//隐藏注册版面
		$register.hide();
		// $userInfo.hide();
	})();
	
	//登录到注册	两个面板之间的切换	在id为login下面找到a标签
	$login.find('a').on('click',function() {
		$login.hide();
		$register.show();
	});

	//注册到登陆	两个面板之间的切换	在id为register下面找到a标签
	$register.find('a').on('click',function() {
		$register.hide();
		$login.show();
	});

	//注册
	$register.find('button[type="submit"]').on('click',function() {
		return false;//取消默认提交事件
	});
	$register.find('button[type="submit"]').on('click',function() {

		//通过ajax提交数据
		$.ajax({
			type:'post',
			url:'/api/user/register',
			data:{
				username:$register.find('[name="username"]').val(),
				password:$register.find('[name="password"]').val(),
				repassword:$register.find('[name="repassword"]').val()
			},
			dataType:'json',
			success:function(result) {	//接收后台发送来的信息 进行渲染
				$register.find('p.warning').html(result.message);

				if (!result.code) {	// 非0
					//注册成功 一秒之后 隐藏注册块  显示登录块
					setTimeout(function() {
						$register.hide();
						$login.show();
					},1000);
				};
			}
		});	
	});

	//登录
	$login.find('button[type="submit"]').on('click',function() {
		return false;//取消默认提交事件
	});
	$login.find('button[type="submit"]').on('click',function() {
		//通过ajax提交数据
		$.ajax({
			type:'post',
			url:'/api/user/login',
			data:{
				username:$login.find('[name="username"]').val(),
				password:$login.find('[name="password"]').val(),
			},
			dataType:'json',
			success:function(result) {
				$login.find('p.warning').html(result.message);

				if (!result.code) {
					//登录成功
					setTimeout(function() {
						// 用模板的就不用隐藏panel，直接刷新页面
						window.location.reload();
						/*
						$login.hide();
						$userInfo.show();

						//显示登录用户的信息
						$userInfo.find('#username').html( result.userInfo.username );
						$userInfo.find('#info').html( '欢迎观临我的博客' );
						*/
					},1000);
				};
			}
		});
	});

	//退出
	$('#logout').on('click',function() {
		$.ajax({
			url:'/api/user/logout',
			success:function(result) {
				if( !result.code ){
					window.location.reload();
				}
			}
		})
	})
});