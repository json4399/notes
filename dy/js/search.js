$(function(){
	var search = {};
	search.events = function(){
		$(".menu_wrapper").on("focus",function(){
			$(this).css("color","#333333");
			var val = $(this).val();
			if(val != ""){
				$(".menu_search").css("top","-5rem")
			}else{
				$(".menu_search").css("top","0.2rem")
			}
		});
		$(".menu_wrapper").on("input",function(){
			var val = $(this).val();
			if(val){
				$(".menu_search").css("top","-5rem");
			}else{
				$(".menu_search").css("top","0.2rem");
			}
		});
		$(".menu_wrapper").on("change",function(){
			var val = $(this).val();
			if(val != ""){
				$(".menu_search").css("top","-5rem")
			}else{
				$(".menu_search").css("top","0.2rem")
			}
		});
		$(".searchReturn").on("tap",function(){ //返回并保留数据
			window.history.go(-1)
		});
		$(".menu_user").on("click",function(){
			var inputVal = $(".menu_wrapper").val();
			if(inputVal == ""){
				alert("搜索框不能为空")
			}else{
				//搜索书名
				search.searchBook(inputVal);
			}
		});
		$(".searchResult_wrapper").on("click","figure",function(){
			var classId = $(this).attr("classid");
			location.href = "detail.html?classId=" + classId+"&version=10000";
		});
		$(".contentTags_box p").on("click",function(){
			alert("搜索文字")
			var inputVal = $(this).val();
			search.searchBook(inputVal);
		});
	};
	search.searchBook = function(inputVal){ //搜索书名
//		{
//			cartoonArrayData : [ //搜索出多少返回多少
//		 		{
//		 			cartoonId : id , (漫画ID)
//					cartoonDate    :  2月7日 (漫画日期),
//			     	cartoonMessage : {
//						imgUrl : http://sfas  (漫画封面地址)
//						cartoonTitle : 先生帮帮我 （漫画标题）
//						cartoonDescribe : 内容  （漫画简介）
//						cartoonlabel :[ (有多少标签返回多少)
//							"标签1"，
//							"标签2"...
//						]
//		 		}
//		 	]
//		}
		$.ajax({
			type:"get",
			url:"http://m.21html5.net/do/search.php?",
			dataType:"json",
			data:{
				id : inputVal,
				state:true
			},
			success:function(s){
				if(s){
				$(".nomoice").hide();
				$(".contentTags_wrapper").hide().siblings().show();
				//返回成功热门词消失
				console.log(s)
				var d = s;
				var str = "";
				$.each(d, function(i,item){
					
					str += '<figure classid="'+ item.id +'">'+
								'<img src="'+ item.pic +'"/>'+
								'<figcaption>'+
									'<p class="cartoon_title">'+ item.title +'</p>'+
								'</figcaption>'+
							'</figure>'
				});
				var strA = '<p class="searchResult_title">'+
							'找到相关的漫画&nbsp;&nbsp;<span class="searchResult_num">'+ d.length +'</span>&nbsp;&nbsp;本'+
							'</p>'+str;
				$(".searchResult_wrapper").html(strA);	
					
				}else{
					$(".searchResult_wrapper").html("");	
					$(".nomoice").show();
				}
			},
			error:function(error){
				alert("请求失败，请重试！")
			}
		})
	};
	search.getLable = function(lableData){
		var strA = "";
		$.each(lableData,function(i,item){
			strA += '<p>'+ item +'</p>';
		});
		return strA;
	};
	search.init = function(){

		search.events();
	};
	search.init();
	
})
