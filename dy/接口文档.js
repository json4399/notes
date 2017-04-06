/**
 http://www.8155999.net/do/do.php?type=newests&state=true

 * **/

/*
 元素置顶： scrollIntoView() //滚动到可是区域  元素必须是原生对象
 获取当前时间戳：
 var timestamp = Date.parse(new Date()) //精确到秒
 var timestamp = (new Date()).valueOf();  //精确到毫秒
 var timestamp = new Date().getTime() ; //精确到毫秒
 jQuery 获取时间戳 $.now()
var timestamp = $.now();

 IE8 以上版本可以使用 直接使用Date.now()方法
//IE8以下版本
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

textarea 在if里面使用 他的值不能放到var 变量里面   要不然弹不出来！




 评论内容接口
 传参  id = 20122 ,comment = “”，commenttime = 2304234
 返回：movieid=20122, userid=,username="",usertime='',userText='',userimg='',userlike
 
 
 
 点赞  movieid = 20122 ，userid=，
 userid=   userlike = 22
 * 
 * 
 * */