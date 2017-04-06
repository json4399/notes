$(function(){
	var more = {};
	var phoneH = document.body.clientHeight,
	$navH = $("nav").height(),
	$goodWrapper = $("#goodsList_wrapper");
	$goodWrapper.height(phoneH - $navH);
	var isToBottom = false;
	more.events = function(){
		$(".menu_user").on("tap",function(){ //搜索
			location.href = "search.html";
		});
		$(".menu_wrapper").on("tap",function(){ //返回
			window.history.go(-1);
		});
		$(document).on("click","figure",function(){
			var classId = $(this).attr("cartoonId");
			location.href = "detail.html?classId="+classId+"&version=1000";
		});
	};
	var dataPage = 0;
	//获取url参数
	more.getUrlParam = function(key){
		var urlBox = location.search.substr(1); 
		var urlA = urlBox.split("&");
		var param = {};
		console.log(urlA)
		$.each(urlA, function(i,item) {
			param[item.split('=')[0]] = item.split('=')[1];
		});
		return param[key]
	};
	//请求数据
	var datePag = null;
	var num = 1;
	more.getAjax = function(){
		var moreId = more.getUrlParam("classId");
//		console.log(moreId)
		var cid = more.getUrlParam("zhuanti");
		var idDate = {//首页更多
				state:true,
				num : num,
				id : moreId
			};
		if(cid){ //首页底部专题判断
			
			idDate = {
				state:true,
				num : num,
				cid : moreId
			};		
		};
		
		$.ajax({
			type:"get",
			url:"http://m.21html5.net/do/list.php?",
			dataType:"json",
			data:idDate,
			success:function(s){
				if(s){
					$("#more_nav").text(s.column);
					$(".cartoonTitle").text(s.column);
					console.log(s);
					var d = s.data;
					if(d.length==0){
						str = '<div class="to_bottom">到底了</div>'
						$("#pullUp").before(str);
						isToBottom = true;
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
	
					}else{
						var str = "";
						$.each(d, function(i,item){
							str += '<figure class="figure_r_space" cartoonId="'+ item.id +'">'+
										'<img class="lazy"  src="'+ item.pic +'"/>'+
										'<figcaption class="cartoon_title">'+item.title +'</figcaption>'+
									'</figure>'
						});
						$(".clear").before(str);
						myScroll.refresh();
			
					};
					num++;
				}else{
					alert("无最新数据")
				}
			},
			error:function(error){
				console.log(error);
				alert("请求失败，请重试！")
			}
		})
	};
	function pullDownAction() { //向下滑动刷新
		myScroll.refresh()
	}
	function loaded() {
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;

		myScroll = new iScroll('goodsList_wrapper', {
			useTransition: true,
			vScrollbar: false,
			topOffset: pullDownOffset,
			onRefresh: function() { //myScroll刷新时触发  
				if(pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				} else if(pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
			},
			onScrollMove: function() { //上下滑动时触发  
				if(this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					
					this.minScrollY = 0;
					if(!isToBottom){
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放立即加载...';
					}else{
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
					}
					
				} else if(this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				} else if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					
					this.maxScrollY = this.maxScrollY;
					
					if(!isToBottom){
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放立即加载...';
					}else{
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
					}
				} else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function() { //上下滑到底部时触发  
				if(pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
					pullDownAction(); //在这里定义下拉时的行为  
					

				} else if(pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					//pullUpAction(); 在这里定义上拉时的行为
					if(!isToBottom){
						more.getAjax();	
					}else{
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
					}
					
				}
			}
		});
	};
	more.init = function(){
		loaded()
		more.getAjax();
		more.events();
	};
	more.init();
	
	
})
