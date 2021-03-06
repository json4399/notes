$(function() {
	var movieDate = null;
	var SwiperA = new Swiper(".wrapper_swiper1", {
		autoplay: 6000,
		pagination: '.swiper-pagination',
		speed: 1000,
		autoplayDisableOnInteraction: false,
		observer: true,
		lazyLoading: true,
		observeParents: true
	});
	var SwiperB = new Swiper(".wrapper_swiper2", {
		freeMode: true,
		direction: "horizontal",
		slidesPerView: 4.5,
		observer: true,
		lazyLoading: true,
		observeParents: true
	});
	var SwiperC = new Swiper(".wrapper_swiper3", {
		freeMode: true,
		direction: "horizontal",
		slidesPerView: 1.5,
		spaceBetween: 4,
		observer: true,
		lazyLoading: true,
		observeParents: true,
		lazyLoadingInPrevNext: true,
		lazyLoadingInPrevNextAmount: 2
	});
	var SwiperC = new Swiper(".wrapper_swiper4", {
		freeMode: true,
		direction: "horizontal",
		slidesPerView: 2,
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		initialSlide: 0,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		lazyLoadingInPrevNextAmount: 2
	});
	var SwiperC = new Swiper(".wrapper_swiper5", {
		freeMode: true,
		direction: "horizontal",
		slidesPerView: 3.5,
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		lazyLoadingInPrevNextAmount: 2
	});
	var movie = {};
	movie.events = function() {
		var nowDay = new Date();
		var stringDay = nowDay.toUTCString();
		var textDay = stringDay.substr(5, 2);
		var textMonth = stringDay.substr(8, 3)
		$(".today_month").text(textMonth);
		$(".today_day").text(textDay);
		$("img.lazy").lazyload({
			placeholder: "images/loading.gif",
			effect: "fadeIn",
			container: $("#bodyCenter")
		});

		$(".searchImg").click(function() {
			location.href = "search.html"
		});

		$(".tokyo_more").on("click", function() {
			var classId = $(this).attr("classId");
			location.href = "more.html?classId=" + classId + "&version=10000";
		});

		$(".swiper-wrapper-detail").on("click", ".swiper-slide", function() {
			var classId = $(this).attr("classId");
			location.href = "detail.html?classId=" + classId + "&version=10000";
		});

		$(".wrapper_swiper2 .swiper-wrapper").on("click", ".swiper-slide", function() {
			var classId = $(this).attr("classId");
			location.href = "more.html?classId=" + classId + "&version=10000";
		});

		$(".movice_box_1").on("click", "figure", function() {
			var gifUrl = $(this).attr("picurl");
			location.href = gifUrl;
		});

		$(".tokyo_more_gif").click(function() {
			var gifUrl = $(this).attr("classid");
			location.href = gifUrl;
		})

		$(".footer").on("click", ".footer_box", function() {
			var classId = $(this).attr("classid");
			location.href = "more.html?classId=" + classId + "&zhuanti=true&version=10000";
		});

		$(".movice_box_2,.movice_box_3,.movice_box_4").on("click", "figure", function() {
			var classId = $(this).attr("classid");
			location.href = "detail.html?classId=" + classId + "&version=10000";
		})
	};
	movie.getAjax = function(type) {
		var columnType = type;
		$.ajax({
			type: "get",
			url: 'http://m.21html5.net/do/do.php?',
//			async: false,
			data: {
				type: columnType,
				state: true
			},
			dataType: "json",
			success: function(s) {
				var defer = $.Deferred();
				console.log(defer)
				defer.resolve(s)
				 console.log(s)
				var $object = movie.getStr(columnType, s)
			},
			error:function(error){
				console.log(error)
			}
		});
	};
	movie.getStr = function(columnType, dataPar) {
		var strObject = {},
			strText = '',
			strBox = null;
		var s = dataPar;
		var d;
		if(columnType == "lunlipian") { //伦理大片

			$(".lunlipian_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else if(columnType == "newhot") {
			$(".newhot_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else if(columnType == "zongyi") {
			$(".zongyi_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else if(columnType == "rebo") {
			$(".rebo_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else if(columnType == "jinji") {
			$(".jinji_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else if(columnType == "meinv") {
			$(".meinv_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else if(columnType == "giftu") {
			$(".giftu_title").text(s.column).next().attr("classId", s.more);
			d = s.data;
		} else {
			d = s;
		}
		$.each(d, function(i, item) {
			if(columnType == "banner") {

				strBox = ".wrapper_swiper1 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide " classId="' + item.id + '" ><img class="slide_1 swiper-lazy"  data-src="' + item.pic + '"  /></div>'

			} else if(columnType == "classification") {

				strBox = ".wrapper_swiper2 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide " classId="' + item.id + '"><a class="swiper_click"  href="javascript:void(0)"><img class="slide_1 swiper-lazy" data-src="' + item.pic + '"  /></a>' +
					'<p>' + item.name + '</p>' +
					'</div>'

			} else if(columnType == "giftu") {

				strBox = ".movice_box_1 .tokyo_wrapper";
				strText += '<figure picurl="' + item.url + '">' +
					'<img class="lazy" src="images/loading.gif" data-original="' + item.pic + '" />' +
					'<figcaption>' + item.title + '</figcaption>' +
					'</figure>'

			} else if(columnType == "lunlipian") {

				strBox = ".wrapper_swiper5 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide " classId="' + item.id + '"><a class="swiper_click" href="javascript:void(0)"><img class="slide_2 swiper-lazy" data-src="' + item.pic + '"  /></a>' +
					'<div class="swiper_message">' + item.title + '</div>' +
					'</div>'
			} else if(columnType == "newhot") {

				strBox = ".movice_box_2 ";
				strText += '<figure classId="' + item.id + '">' +
					'<img class="lazy"  src="images/loading.gif" data-original="' + item.pic + '"/>' +
					'<figcaption>' + item.title + '</figcaption>' +
					'</figure>'
			} else if(columnType == "zongyi") {

				strBox = ".wrapper_swiper3 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide" classId="' + item.id + '"><img class="slide_1 swiper-lazy" data-src="' + item.pic + '"  /><a class="swiper_click"  href="javascript:void(0)"></a>' +
					'<div class="swiper_message">' +
					'<div class="message_title_box">' +
					'<span class="message_series"></span>' +
					'<span class="message_text">' + item.title + '</span>' +
					'</div>' +

					'</div>' +
					'</div>'

			} else if(columnType == "rebo") {

				strBox = ".movice_box_3 ";
				strText += '<figure classId="' + item.id + '">' +
					'<img class="lazy" data-original="' + item.pic + '"/>' +
					'<figcaption>' +
					'<p class="tokyo_title">' + item.title + '</p>' +
					'</figcaption>' +
					'<div class="tokyo_player_message">' +
					'<div class="tokyo_player_watch">' +
					'<img src="images/icon/5.png" alt="" />' +
					'<span class="tokyo_watch_num">' + item.playe + '</span>' +
					'</div>' +
					'<div class="tokyo_player_play">' +
					'<img src="images/icon/6.png" alt="" />' +
					'<span class="tokyo_play_num">' + item.hot + '</span>' +
					'</div>' +
					'</div>' +
					'</figure>'
			} else if(columnType == "jinji") {

				strBox = ".wrapper_swiper4 .swiper-wrapper";
				strText += '<div class="swiper-slide img_slide" classId="' + item.id + '"><img class="slide_1 swiper-lazy" data-src="' + item.pic + '"  /><a class="swiper_click"  href="javascript:void(0)"></a>' +
					'<div class="swiper_message">' +
					'<div class="message_title_box">' +
					'<span class="message_series"></span>' +
					'<span class="message_text">' + item.title + '</span>' +
					'</div>' +
					'<div class="message_player_box">' +
					'<p>#记录 / <span class="message_player_time">23*16</span></p>' +
					'</div>' +
					'</div>' +
					'</div>'

			} else if(columnType == "meinv") {

				strBox = ".movice_box_4";
				strText += '<figure classId="' + item.id + '">' +
					'<img class="lazy" data-original="' + item.pic + '"/>' +
					'<figcaption>' +
					'<p class="tokyo_title">' + item.title + '</p>' +
					'</figcaption>' +
					'<div class="tokyo_player_message">' +
					'<div class="tokyo_player_watch">' +
					'<img src="images/icon/5.png"  />' +
					'<span class="tokyo_watch_num">' + item.playe + '</span>' +
					'</div>' +
					'<div class="tokyo_player_play">' +
					'<img src="images/icon/6.png"  />' +
					'<span class="tokyo_play_num">' + item.hot + '</span>' +
					'</div>' +
					'</div>' +
					'</figure>'

			} else if(columnType == "zhuanti") {

				strBox = ".footer";
				strText += '<div class="footer_box" classId="' + item.id + '">' +
					'<img class="lazy" data-original="' + item.pic + '"/>' +
					'<div class="footer_img_message">' +
					'<div class="footer_message_nav">' +
					'<p class="footer_nav_series"></p>' +
					'<span class="footer_nav_tip">' + item.title + '</span>' +
					'</div>' +
					'<div class="footer_message_content">' +
					'<p class="footer_content_series"></p>' +
					'<span class="footer_content_time"></span>' +
					'</div>' +
					'</div>' +
					'</div>'

			}

		});

		$(strBox).append(strText)
		var imgNum = $("img.lazy:not(.lazyend)").length;
		if(imgNum) {

			$("img.lazy:not(.lazyend)").lazyload({
				placeholder: "images/loading.gif",
				effect: "fadeIn",
				container: $("#bodyCenter")
			});

			$("img.lazy:not(.lazyend)").each(function(i, item) {
				item.onload = function() {
					imgNum--
//					console.log(imgNum);
					if(!-imgNum) {
						$("img.lazy:not(.lazyend)").addClass("lazyend");
					}
				};

			})
		}
	};
	movie.init = function() {
		movie.events();
		movie.getAjax("banner");
		movie.getAjax("classification");
		movie.getAjax("lunlipian");
		movie.getAjax("newhot");
		movie.getAjax("zongyi");
		movie.getAjax("rebo");
		movie.getAjax("jinji");
		movie.getAjax("meinv");
		movie.getAjax("zhuanti");
		movie.getAjax("giftu");
	};
	movie.init();
	

})