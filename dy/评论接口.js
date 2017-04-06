/*
 * 
发表接口 url ： http://m.21html5.net/do/pinglun.php?
 传入参数：
 {
 	
	type:"ppinglun",    发表评论
	id : movieId,       电影id
	content:valText,    评论内容
	time : timestamp,   评论时间
	state:true  		默认为true
 }
 http://m.21html5.net/do/pinglun.php?type=ppinglun&id=25314&content=122111122&time=111212&state=true

 返回参数：{ //返回的参数和下面接口一样
 	
 	content:,    评论内容
 	time : ,   评论时间
	good		 点赞数量
	name		 用户名
	userid		用户id
	img			用户头像
 	floorid:floorid,    楼层
 }
 
 
 刚进入页面接口 url ： http://m.21html5.net/do/pinglun.php?
 传入参数：
 {
	type:"pinglun",     评论
	id : movieId, 	电影i
	num :  	20      页数
	state:true  		默认为true
 }
 返回参数：{
 	[
 		用户名
 		用户头像
 		评论内容
 		评论点赞数
 		楼层
 		当时的评论时间
 		用户id
 	]
 	
 }
 点赞接口 url ： http://m.21html5.net/do/pinglun.php?
 传入参数：
 {
	type:"dianzan",    点赞
	id : movieId,       电影id，
	floorid:			对应的楼层
	state:true  		默认为true
	
 }
 返回参数：{
 	[
 		返回一个标识符，表明参数传递成功。
 		state:true,成功
 		state:false， 失败
 		
 		
 	]
 	
 }
 
 * */