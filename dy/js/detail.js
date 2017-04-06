$(function(){
	
	var commentNum = 1;
	var swiperA = new Swiper(".wrapper_swiper1",{
		freeMode:true,
		direction:"horizontal",
		slidesPerView:6.7,
		observer: true,
		observeParents: true,
		spaceBetween:10
	});
	var swiperA = new Swiper(".wrapper_swiper2",{
		freeMode:true,
		direction:"horizontal",
		slidesPerView:3.5,
		spaceBetween:10,
		observer: true,
		observeParents: true
	});
	var swiperB = new Swiper(".wrapper_swiper5",{
		freeMode:true,
		direction:"horizontal",
		slidesPerView:3.9,
		observer: true,
		observeParents: true,
		spaceBetween:10
	});
		var SwiperC = new Swiper(".wrapper_swiper3",{
		freeMode:true,
		direction:"horizontal",
		slidesPerView:1.5,
		spaceBetween:4,
		observer: true,
		observeParents: true
	});
	var detail = {};
	//传入毫秒数。返回时间差
	function percent(timestamp){
//		var timestamp = 2147483647 
		var time = new Date(timestamp);//以前的时间
		var nowGetTime = (new Date()).getTime();
		var nowTime = new Date(nowGetTime);
		var nowMonth = (nowTime.getMonth())+1;
		var oldMonth = (time.getMonth())+1
		if(nowMonth != oldMonth) {
			return Math.abs((nowMonth - oldMonth)) + "月前"
		} else if(nowTime.getDate() != time.getDate()) {
			return Math.abs((nowTime.getDate() - time.getDate())) + "天前"
		} else if(nowTime.getHours() != time.getHours()) {
			return Math.abs((nowTime.getHours() - time.getHours())) + "小时前"
		} else if(nowTime.getMinutes() != time.getMinutes()) {
			return Math.abs((nowTime.getMinutes() - time.getMinutes())) + "分钟前";
		} else if(nowTime.getSeconds() != time.getSeconds()) {
			return "刚刚"
		};
	};
	detail.events = function(){
		$(".player_box").on("click",function(){
			$("#player")[0].play();
		});
		
		//swiper
		$(".wrapper_swiper5,.wrapper_swiper3 .swiper-wrapper").on("click",".swiper-slide",function(){
			var classId = $(this).attr("classId");
	    	location.href="detail.html?classId="+classId+"&version=10000";
		});
		//四方布局
		$(".movice_box_4").on("click","figure",function(){
			var gifUrl = $(this).attr("picurl");
	    	location.href = gifUrl;
		});
		//电视剧点播
		$(".wrapper_swiper1 .swiper-wrapper").on("click",".img_slide",function(){
			var setPlayer = $(this).attr("moviceurl");
			$("#player").attr("src",setPlayer);
			$(this).addClass("clicked");
		});
		//滚动到底部
		 $("#bodyCenter").on("scroll",function(){
			var bheight = $(document).height();//获取窗口高度
			var sheight = $("#bodyCenter")[0].scrollHeight;//获取滚动条高度，[0]是为了把jq对象转化为js对象
			var stop = $("#bodyCenter").scrollTop();//滚动条距离顶部的距离
			if(stop>=sheight-bheight){//当滚动条到顶部的距离等于滚动条高度减去窗口高度时
				detail.showComment();
			}
		});
		//评论框点击输入
		$(".comment_input").on("focus",function(){
			$(this).val("").css({
				"text-align" : "start",
				"height"  : "2rem",
				"font-size" : "14px"
			});
			$(".publish").show();
		});
		//评论框还原
		$(".comment_input").on("blur",function(){
			var valText = $(".comment_input").val();
			
			if(valText){
				//
			}else if(!valText){
				$(this).css({
				"text-align" : "center",
				"height" : "0.6rem"
				});
				$(".publish").hide();
			};
		});
		//点赞
		var movieId = detail.getUrlParam("classId");
		$(".tease_box").on("click",".com_info_praise",function(){
			var imgText = $(this).children("img").attr("src");
			if(imgText == "images/icon/18.png"){
//				alert("亲，已经点过赞了！")
			}else{
				$(this).children("img").attr("src","images/icon/18.png");
				var goodNum = $(this).children(".com_dianzan").text();
				$(this).children(".com_dianzan").text(++goodNum);
				
				var $floorid = $(this).attr("floorid");
				$.ajax({
					type:"get",
					url:"http://m.21html5.net/do/pinglun.php?",
					async:true,
					data:{
						type:"dianzan",    
						id : movieId,      
						floorid:$floorid,			
						state:true 
					},
					dataType:"json",
					success:function(s){
						if(s[0].state){
							
						}
					},
					error:function(){
						alert("请求失败，请重试！")
					}
				});
			}
		})
		//点击发布发布评论
		$(".publish").on("click",function(){
			var valText = document.getElementById("text_comment").value;
			
			if(valText = ""){
				alert("评论不能为空")
			}else{
				var timestamp = new Date().getTime();
				$.ajax({
					type:"get",
					url:'http://m.21html5.net/do/pinglun.php?',
					data:{
						type:"ppinglun",
						id : movieId,
						content:document.getElementById("text_comment").value,
						time : timestamp,
						state:true
					},
					dataType : "json",
					success : function(s){
						console.log(s)
						var str = '';
						var d = s;
						if(s){
							$.each(d, function(i,item) {
								var timestamps = parseInt(item.time);
								str = '<figure floorid='+ item.floorid +' userid='+ item.userid +'>'+
									'<div class="com_mesage">'+
										'<div class="com_user">'+
											'<img class="user_img" src="'+ item.img +'"  />'+
											'<div class="user_mes">'+
												'<p class="user_name">'+ item.name +'</p>'+
												'<p class="user_time">'+ percent(timestamps) +'</p>'+
											'</div>'+
										'</div>'+
										'<div class="com_information">'+
											'<div class="com_praise com_info_praise" floorid='+ item.floorid +'>'+
												'<img src="images/icon/20.png"  />'+
												'<p class="com_dianzan">'+ item.good +'</p>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="com_text">'+ item.content +'</div>'+
								'</figure>'
							});
						$(".tease_box").prepend(str);	
						}else{
							alert("请求为空")
						};
					},
					error:function(error){
						alert("请求失败")
					}
				});
			}
		});
		
		
		//点击评论跳转评论框
		$(".user_information_L").on("click",function(){
			$(".tease_wrapper")[0].scrollIntoView();
		});
	};
	detail.getUrlParam = function(key){
		var urlBox = location.search.substr(1); 
		var urlA = urlBox.split("&");
		var param = {};
		$.each(urlA, function(i,item) {
			param[item.split('=')[0]] = item.split('=')[1];
		});
		return param[key]
	};
	//请求数据
	detail.getAjax = function(movieId,type){
		var columnType = type;
		$.ajax({
			type:"get",
			url:'http://m.21html5.net/do/dod.php?',
			async:true,
			data:{
				id : movieId,
				state : true,
				type : columnType
			},
			dataType : "json",
			success : function(s){
				console.log(s)
				if(s){
					var str = '';
					var $object = detail.getStr(columnType,s)
				}else{
					alert("返回为空");
				}
				
			},
			error:function(s){
				alert("请求失败，请重试！")
			}
		});
	};
	//设置数据
	detail.getStr = function(columnType,dataPar){
		var strObject = {},strText = '',strBox=null;
		var s = dataPar ;
		var d;
		if(columnType == "tongzhu"){ //伦理大片
			
			$(".tongzhu_title").text(s.column).next().attr("classId",s.more);
			d = s.data;
		}else if(columnType == "pinglun"){
			$(".newhot_title").text(s.column);
			d = s.data;
		}else if(columnType == "playe"){//视频链接
			$(".player_title").text(s.title);
			$("#player_nav").text(s.title);
			$(".info_score").text(s.pingfen)//评分
			$(".info_set").text(s.zhuantai);//全集
//			$(".info_type").text()//爱情
			$(".info_hitNum").text(s.playe);//播放次数
			d = s.playerurl[0].playerurl;
			$(".drama_updataNum").text(d.length);
			$("#player").attr("src",d[0]);//主页链接
			
		}else if(columnType == "remen"){
			$(".remen_title").text(s.column).next().attr("classId",s.more);;
			d = s.data;
		}else if(columnType == "caikan"){
			$(".caikan_title").text(s.column).next().attr("classId",s.more);;
			d = s.data;
		}else{
			d = s;
		};
		$.each(d, function(i,item){
			if(columnType == "tongzhu"){
				//banner 1
				strBox = ".wrapper_swiper5 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide" classId="'+ item.id +'"><a class="swiper_click"  href="javascript:void(0)"><img class="slide_1" src="'+ item.pic +'"  /></a>'+
					        	'<div class="swiper_message">'+item.title+'</div>'+
					        '</div>'
			}else if(columnType == "pinglun"){
				// 评论
				strBox = ".wrapper_swiper2 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide " classId="'+ item.id +'"><a class="swiper_click"  href="javascript:void(0)"><img class="slide_1" src="'+ item.pic +'"  /></a>'+
			        		'<p>'+ item.name +'</p>'+
			        	  '</div>'
				
			}else if(columnType == "playe"){
				//主页电影
				strBox = ".wrapper_swiper1 .swiper-wrapper";
				var setNum = ++i;
				if(setNum == d.length){
					var str = '<div class="swiper-slide img_slide " moviceUrl="'+ item +'">'+ setNum +'<img class="swiper_img" src="images/icon/14.png"/></div>'
				}else{
					var str = '<div class="swiper-slide img_slide " moviceUrl="'+ item +'">'+ setNum +'</div>'
				}
				strText +=  str;
				
			}else if(columnType == "caikan"){
				//banner 4  天选之人
				strBox = ".wrapper_swiper3 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide" classId="'+ item.id +'"><img class="slide_1" src="'+ item.pic +'"  /><a class="swiper_click"  href="javascript:void(0)"></a>'+
				        	'<div class="swiper_message">'+
					        	'<div class="message_title_box">'+
					        		'<span class="message_series"></span>'+
					        		'<span class="message_text">'+ item.title +'</span>'+
					        	'</div>'+
					        	'<div class="message_player_box">'+
					        		'<p> <span class="message_player_time"></span></p>'+
					        	'</div>'+
				        	'</div>'+
		        		'</div>'
		        		
			}else if(columnType == "remen"){
				//remen
				strBox = ".movice_box_4";
				strText += '<figure picurl="'+ item.id+'">'+
								'<img src="'+ item.pic +'"/>'+
								'<figcaption>'+ item.title +'</figcaption>'+
							'</figure>'
				
			}
		});
		$(strBox).append(strText)
	};
	//显示评论
	detail.showComment = function(){
		var movieId = detail.getUrlParam("classId");
		$.ajax({
			type:"get",
			url:"http://m.21html5.net/do/pinglun.php?",
			async:true,
			data:{
//				'25314'
				id:movieId,
				type:"pinglun",state:true,num:commentNum
			},
			dataType : "json",
			success:function(s){
				console.log(s)
				var str = '';
				var d = s;
				if(s){
					$(".comment_num").text(d.length);
					$.each(d, function(i,item) {
						var timestamps = parseInt(item.time);
						str += '<figure floorid='+ item.floorid +' userid='+ item.userid +'>'+
								'<div class="com_mesage">'+
									'<div class="com_user">'+
										'<img class="user_img" src="'+ item.img +'"  />'+
										'<div class="user_mes">'+
											'<p class="user_name">'+ item.name +'</p>'+
											'<p class="user_time">'+percent(timestamps)+'</p>'+
										'</div>'+
									'</div>'+
									'<div class="com_information">'+
										'<div class="com_praise com_info_praise" floorid='+ item.floorid +'>'+
											'<img src="images/icon/20.png"  />'+
											'<p class="com_dianzan">'+ item.good +'</p>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="com_text">'+ item.content +'</div>'+
							'</figure>'
					});
					$(".tease_box").append(str);
					commentNum++;
				};
			},
			error : function(s){
				alert("请求失败！")
			}
		});
	};
	detail.init = function(){
		var movieId = detail.getUrlParam("classId");
		detail.getAjax(movieId,"playe");
		detail.getAjax(movieId,"tongzhu");
		detail.getAjax(movieId,"remen");
		detail.getAjax(movieId,"caikan");
		detail.events();
		detail.showComment();
	};
	detail.init();
})
