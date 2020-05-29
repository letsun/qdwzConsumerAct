var dev = "http://192.168.1.7:8080";

var ip = dev;
var index = 0;
var prizeAmount;
var couponName;
var lotteryId;
var lotteryData = {};
var awardValue;
var type;
var isClick = true;
var yes1 = new Audio();
/*var yes2 = new Audio();*/
var yes3 = new Audio();

var types;

yes1.src = "/yifeiNew/audio/xuanzhuan.mp3";
/*yes2.src = "/yifeiNew/audio/baozha.mp3";*/
yes3.src = "/yifeiNew/audio/chenggong.mp3";


var interval;
// 获取验证码倒计时
var doc = $(document);
var intDiff = 60;//验证码倒计时总秒数量
var backInterval;
var isflag = true;

wx.config({
	debug: false,
	appId: '',
	timestamp: 1,
	nonceStr: '',
	signature: '',
	jsApiList: []
});

wx.ready(function () {
	yes1.play();
	yes1.pause();
	/*yes2.play();
	yes2.pause();*/
	yes3.play();
	yes3.pause();
});
$(function () {

	$(document).on('click', 'img', function () {
		return false;
	});

	// 关闭公众号弹窗
	$('#attent-btn').on('click', function () {
		$('#attent-win').fadeOut();
	});

	// 点击遮罩阻止冒泡
	$('#container').on('click', '.layer-item', function (e) {
		e.stopPropagation();
		return false;
	});

	// 点击阻止冒泡
	$('#container').on('click', '.positive-item', function (e) {
		e.stopPropagation();
		return false;
	});

	// 点击阻止冒泡
	$('#container').on('click', '.award-item-bg', function (e) {
		e.stopPropagation();
		return false;
	});



	//关闭手机号弹窗
	$('.phone-close').on('click', function () {
		$('.phone-mask').hide();

	})


	//关闭弹窗活动弹窗
	$('.activity-close').on('click', function () {
		$('.activity').fadeOut();
		$('.video-win').fadeIn();
		clearInterval(interval)
	})




	//校验是否绑定手机号码
	Func.checkUserMobile(function (res) {
		if (res.data.type == 1) {
			$('.phone-mask').show();
		} else {
	
			timeCountDown()
		}
	})

	//点击获取验证码
	$('.phone-con-vcode').on('click', function () {
		var that = $(this);
		var mobile = $('#mobile').val();
		if (mobile == '') {
			common.alert({
				content: "手机号不能为空"
			})
			return false;
		}
		if (isflag) {
			Func.getVerCode({
				mobile: mobile
			}, function (res) {
				if (res.code == 200) {
					isflag = false;
					if (typeof timer(intDiff) != "undefined") {
						that.html("验证码" + "(" + timer(intDiff) + ")");
					}
				} else {
					common.alert({
						content: res.msg
					})
				}

			})
		}
	})

	//点击提交手机号码
	$('.phone-con-submit').on('click', function () {
		var mobile = $('#mobile').val();
		var verCode = $('#verCode').val();
		Func.saveUserInfo({
			mobile: mobile,
			verCode: verCode
		}, function (res) {
			if (res.code == 200) {
				$('.phone-mask').hide();
				timeCountDown()
			} else {
				common.alert({
					content: res.msg
				})
			}
		})

	})


	// 点击抽奖
	$('#container').on('click', '.award-item', function () {
		//校验是否绑定手机号码
		Func.checkUserMobile(function (res) {
			if (res.data.type == 1) {
				$('#loadingWrapper').hide();
				$('.phone-mask').show();
			} else {
				if (!isClick) {
					$('#loadingWrapper').hide();
					common.alert({
						mask: true,
						content: '抽奖尚未结束，请稍候',
					});
					return false;
				}

				isClick = false;
				awardValue = $(this).find('.num').html();
				type = $(this).attr('data-type');
				index = $(this).index();


				$('#loadingWrapper').hide();
				Func.findActivityByEncode(function (res) {
					if (res.code === 200 || res.code === 201) {
						Func.isSubscribe(function (res1) {
							if (res1.code === 200) {
								if (!res1.data.subscribe) { //!res1.data.subscribe
									isClick = true;
									$('#loadingWrapper').hide();
									$('#attent-win').fadeIn();
								} else {
									Func.lottery(api.lottery, function (reg) {
										lotteryData = reg;

										$('#loadingWrapper').hide();
										yes1.play();

										$('.award-item').addClass('active');
										if (lotteryData.code == 200) {
											var types = reg.data.type;

											if (reg.data.type == 0) {
												prizeAmount = lotteryData.data.redPack.prizeAmount;
												if (lotteryData.data.lotteryId > 0) {
													lotteryId = lotteryData.data.lotteryId;
												}

												$('.award-item').each(function (i, item) {
													var value = $(item).find('.num').html();
													if (type == 1) {
														if (value == prizeAmount) {
															$(item).find('.amount').html('<span class="num">' + awardValue + '</span>').removeClass('active');
														}
													} else if (type == 0) {
														if (value == prizeAmount) {
															$(item).find('.num').html(awardValue);
														}
													}
												})
											}

											if (reg.data.type == 1) {
												couponName = lotteryData.data.couponGrants[0].couponName;
												$('.award-item').each(function (i, item) {
													var value = $(item).find('.num').html();

													if (type == 0) {
														if (value == couponName) {
															$(item).find('.amount').html('<span class="num">' + awardValue + '</span>元').addClass('active');
														}
													}
												})
											}

										}
										setTimeout(function () {
											$('.award-item').addClass('lottActive');
										}, 500);
									})
								}
							} else {
								isClick = true;
								$('#loadingWrapper').hide();
								common.alert({
									content: res1.msg,
									mask: true
								});
							}
						});

					} else {
						isClick = true;
						$('#loadingWrapper').hide();
						$('#attent-wina').fadeIn();
					}
				});
			}
		})


	});

	// 监听动画结束
	$('#container').on('animationend', '.back-item', function () {

		isClick = true;
		$(".baoza img:first-child").show();
		/*yes2.play();*/

		$(".baoza img:nth-child(2)").show();
		setTimeout(function () {
			yes3.play();
			$(".baoza").hide();
			$(".baoza img").attr('src', 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_8.png')
			$('.layer').show();
			$('.award-item').find('.layer-item').show();
			$('.award-item').eq(index).find('.layer-item').hide();
			$('.award-item').eq(index).css('z-index', '2');
			$('.award-item').find('.award-item-bga').show();
			$('.award-item').eq(index).find('.award-item-bg').fadeIn();
			$('.back-item').hide();
			// $('.openPublic-btn').show();
			if (lotteryData.code == 200) {

				if (lotteryData.data.type == 0) {
					prizeAmount = lotteryData.data.redPack.prizeAmount;
					if (lotteryData.data.lotteryId > 0) {
						lotteryId = lotteryData.data.lotteryId;
						$('.award-item').eq(index).find('.amount').html('<span class="num">' + prizeAmount + '</span>元').addClass('active');
						$('.award-item').eq(index).find('.award-title').html('恭喜您获得');
						$('.award-item').find('.award-dec1').show();
						$('.text-img').fadeIn();
						$('.mycenter').fadeIn();
					}
				}


				if (lotteryData.data.type == 1) {
					couponName = lotteryData.data.couponGrants[0].couponName;
					$('.award-item').eq(index).find('.amount').html('<span class="num">' + couponName + '</span>').removeClass('active');
					$('.award-item').eq(index).find('.award-title').html('恭喜您获得');
					$('.award-item').find('.award-dec1').show();
				}


			} else if (lotteryData.code == 201) {
				$('.award-item').eq(index).find('.award-title').html('很遗憾');
				$('.award-item').eq(index).find('.award-dec2').show();
				$('.award-item').eq(index).siblings().find('.award-dec1').show();
			} else {
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg,
				})
			}

			$('.award-item').each(function (i, item) {

			});

			$('.positive-item').fadeIn();
		}, 1500);
	});

	// 点击回复消息弹出二维码
	$('.text-img').on('click', function () {
		$('#public-win').fadeIn();
	});


	// 关闭回复消息二维码
	$('#close-public').on('click', function () {
		$('#public-win').fadeOut();
	});

	// 开始活动
	Func.findActivityByEncode(function (res) {
		$('#loadingWrapper').hide();
		var prizes = res.data.prizes;
		var html = '';
		for (var i = 0, len = prizes.length; i < len; i++) {

			html += '<div class="award-item" data-type="' + prizes[i].prizeType + '">';
			html += '<div class="positive-item">';
			html += '<div class="award-dec award-dec1">';
			if (prizes[i].prizeType == 0) {
				html += '<div class="amount active"><span class="num">' + prizes[i].amount + '</span>元</div>';
			} else {
				html += '<div class="amount"><span class="num">' + prizes[i].couponName + '</span></div>';
			}

			html += '</div>';
			html += '<div class="award-dec award-dec2">';
			html += '<div class="amount">未中奖</div>';
			html += '</div>';
			html += '</div>';
			html += '<div class="back-item"></div>';
			html += '<img class="award-item-bg" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_5.png"alt="">';
			html += '<div class="layer-item"><img src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_14.png"></div>';
			html += '</div>';
		}
		$('.award-list').html(html);
		if (res.code === 200 || res.code === 201 || res.code === 206) {

		} else {
			$('#attent-wina').fadeIn();
		}
	});

	// 关闭二维码弹窗
	$('#attent-btn').on('click', function () {
		$('#attent-win').fadeOut();
	});


	// 被扫二维码弹窗关闭
	$('#attent-btna').on('click', function () {
		$('#attent-wina').fadeOut();
	});

	// 打开公众号
	$('.openPublic-btn').on('click', function () {
		$('#openPub-win').fadeIn();
	});

	// 关闭公众号
	$('#close-pub').on('click', function () {
		$('#openPub-win').fadeOut();
	});


	// 中奖纪录列表
	companyLotteryRecord();

	// 跳转个人中心
	$('#container').on('click','.mycenter',function(){

		window.location.href=ip+'/consumer/center/188';
	})


	// 输入框失去焦点兼容苹果系统
	$('input,textarea,select').on('blur', function () {
		setTimeout(function () {
			var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
			if (!hasFocus) {
				window.scroll(0, 0);
			}
		}, 100);
	});
});



// 自动提现
function userCash(num, lotteryId) {
	$.ajax({
		url: api.userCash,
		type: 'GET',
		dataType: 'json',
		data: {
			lotteryId: lotteryId,
			amount: num,
			cashType: 0,
		},
		headers: getHeader(),
		success: function (res) {

		},
		error: function (res) {
			common.alert({
				mask: true,
				content: res.msg,
			})
		}
	});
}


// 企业中奖用户纪录
function companyLotteryRecord() {
	$.ajax({
		url: api.companyLotteryRecord,
		type: 'GET',
		dataType: 'json',
		data: {
			prizeType: 0,
			prizeAmount: '',
		},
		headers: getHeader(),
		success: function (res) {
			$('#loadingWrapper').hide();
			var lotteryRecordLists = res.data.lotteryRecordList;

			var html = '';
			for (const lotteryRecordList of lotteryRecordLists) {

				html += `<div class="swiper-slide">`;
				html += `<div class="item-text">`;
				html += `<div>恭喜${lotteryRecordList.nickname}</div>`;
				html += `<div>抽中${lotteryRecordList.prizeAmount}元红包</div>`;
				html += `<div>${lotteryRecordList.createDate}</div>`;
				html += `</div>`;
				html += `</div>`;
			}

			$('.swiper-wrapper').html(html);
			swipers();
		},
		error: function (res) {
			common.alert({
				mask: true,
				content: res.msgc
			})
		}
	});


	// 关闭视频弹窗
	$('.close-video').on('click', function () {
		$('#video-win').remove();
	})
};

//活动倒计时
function timeCountDown() {
	Func.timeCountDown(function (res) {

		if (res.code == 200) {
			countTime(res.data.currentTime, res.data.endTime, function (reg) {
				var d = reg.d.toString().split('');
				var h = reg.h.toString().split('');
				var m = reg.m.toString().split('')
				var html = '';
				if (d.length == 4) {
					html += '<div >' + d[d.length - 4] + '</div>';
				}
				if (d.length == 3) {
					html += '<div >' + d[d.length - 3] + '</div>';
				}
				html += '<div class="day1">' + d[d.length - 2] + '</div>';
				html += '<div class="day2">' + d[d.length - 1] + '</div>';
				html += '<span>天</span>';
				html += '<div class="hours1">' + h[0] + '</div>';
				html += '<div class="hours2">' + h[1] + '</div>';
				html += '<span>时</span>';
				html += '<div class="minutes1">' + m[0] + '</div>';
				html += '<div class="minutes2">' + m[1] + '</div>';
				html += '<span>分</span>';

				$('.activity-time').html(html)
			})
			$('#balance').text(res.data.balance + "元");
			$('#difference').text(res.data.difference + "元");

			$('#headimgurl').attr("src", res.data.headimgurl);
			$('#nickname').text(res.data.nickname);
			
			$('#loadingWrapper').hide();
			$('.activity').fadeIn();
		} else {
			$('#loadingWrapper').hide();
			common.alert({
				content: res.msg,
				mask: true
			});
		}

	})
}

function swipers() {

	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 3,
		loop: true,				//是否无缝轮播
		autoplay: 1000,		//轮播时间
		direction: 'vertical',//改变轮播图方向,
		// simulateTouch: false,//禁止滑动
		autoplayDisableOnInteraction: false,	//滑动后不会停止继续轮播
	});
}



/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim) {


	$('.phone-con-vcode').html("验证码" + "(" + initTim + "s)").css("background", "#999");
	backInterval = window.setInterval(function () {
		initTim--;
		if (initTim <= 9) {
			initTim = '0' + initTim;
		}

		$('.phone-con-vcode').html("验证码" + "(" + initTim + "s)");

		if (initTim == 0) {
			$(".phone-con-vcode").html("获取验证码").css({ "background": "red", "color": "#f4f4f4" });
			clearInterval(backInterval);
			isflag = true;
			intDiff = parseInt(60);
		}

	}, 1000);
}




/**
 * 活动倒计时
 * @param {*} startTime 活动开始时间
 * @param {*} endTime 活动结束时间
 * @param {*} success 倒计时进行中的回调参数
 * @param {*} end 倒计时结束的回调
 */

function countTime(startTime, endTime, success, end) {
	// debugger
	//时间差  
	var leftTime = endTime - startTime;
	//定义变量 d,h,m,s保存倒计时的时间  
	if (success) {
		interval = setInterval(function () {
			var d, h, m, s;
			if (leftTime >= 0) {
				d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
				h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
				m = Math.floor(leftTime / 1000 / 60 % 60);
				s = Math.floor(leftTime / 1000 % 60);

				//将0-9的数字前面加上0，例1变为01
				d = checkTime(d);
				h = checkTime(h);
				m = checkTime(m);
				s = checkTime(s);
				function checkTime(i) {
					if (i < 10) {
						i = "0" + i;
					}
					return i;
				}
				var time = {}
				time.d = d;
				time.h = h;
				time.m = m;
				time.s = s;

				// var time = {};
				//  d = d.split('');
				//  h = d.split('');
				//  m = d.split('');

				// time.d1 = d[0];
				// time.d2 = d[1];
				// time.h1 = h[0];
				// time.h2 = h[1];
				// time.m1 = m[0];
				// time.m1 = m[1];


				leftTime -= 1000;
				console.log(time)
				return success(time);
			} else {

				clearInterval(interval);
				if (end) {
					return end('活动结束')
				}
			}
		}, 1000)
	}
}




