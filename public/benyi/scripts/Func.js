var Func = {};

$(function () {

	/**
	 * 查找二维码情况
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.findEncodeFunction = function (callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.findEncodeFunction,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	};

	var isLottery = false;

	/**
	 * 去抽奖
	 * @param { } [varname] [description]
	 * @return null
	 */
	Func.toLottery = function (url, callback) {
		$.ajax({
			url: url,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				$('#loadingWrapper').hide();
				var html = '';
				var data = res.data;

				$('#actLoading').fadeOut();

				if (res.code === 200) {

					if (res.data.prizeType === 0) {
						Global.requestTempByAjax('/nantian/temp/dan.ejs', res.data, function (template) {

							$('#resultContent').html(template);
							callback(res);
						});
					}

				} else if (res.code === 201) {

					Func.fail(res, callback);

				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}
			}
		});
	}

	Func.fail = function (res, callback) {

		$('#resultContainer').css({
			'background': 'url("https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/commonAct_2/images/5/1_17.png") no-repeat'
		});
		Global.requestTempByAjax('/nantian/temp/error.ejs', res, function (template) {

			$('#resultContent').html(template);

			$('#getAwardBtn').hide();

			callback(res);
		});
	}

	/**
	 * 查询是否关注公众号接口
	 * @param  	function 	callback 	查找后的回调
	 * @return 	null
	 */
	Func.isSubscribe = function (callback) {
		$.ajax({
			url: api.isSubscribe,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);

			}
		});
	}

	/**
	 * 查找二维码情况
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.findActivityByEncode = function (callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.findActivityByEncode,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取用户信息
	 * @param  function callback 获取成功后的回调
	 * @return null
	 */
	Func.getPersonCenter = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.personCenter,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取提现
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.userCash = function (data, callback) {
		$('#loadingWrapper').show();

		$.ajax({
			url: api.userCash,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取提现记录
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	获取成功后的回调
	 * @return null
	 */
	Func.userCashRecord = function (data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}


		$.ajax({
			url: api.userCashRecord,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取积分记录
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	获取成功后的回调
	 * @return null
	 */
	Func.findScoreDetail = function (data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}


		$.ajax({
			url: api.findScoreDetail,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取中奖记录
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	获取成功后的回调
	 * @return null
	 */
	Func.lotteryRecord = function (data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}

		$.ajax({
			url: api.lotteryRecord,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取优惠券列表
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	获取成功后的回调
	 * @return null
	 */
	Func.findCoupon = function (data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}

		$.ajax({
			url: api.findCoupon,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取中奖记录详情
	 * @param 	number 		lotteryRecordId		奖项ID
	 * @param  	function 	callback 			获取成功后的回调
	 * @return 	null
	 */
	Func.couponCodeDetail = function (lotteryRecordId, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.couponCodeDetail,
			type: 'GET',
			data: {
				lotteryRecordId: lotteryRecordId
			},
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取优惠券详情
	 * @param 	number 		couponId		奖项ID
	 * @param  	function 	callback 			获取成功后的回调
	 * @return 	null
	 */
	Func.couponDetail = function (couponId, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.couponDetail,
			type: 'GET',
			data: {
				couponId: couponId
			},
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取广告
	 * @param 	string 		positionName		广告位置
	 * @param  	function 	callback 			获取成功后的回调
	 * @return 	null
	 */
	Func.getAdvByAdvPositionName = function (ele, positionName, callback) {

		// debugger;
		$.ajax({
			url: api.getAdvByAdvPositionName,
			type: 'GET',
			data: {
				positionName: positionName
			},
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				if (res.code === 200) {
					// var random = Math.floor(Math.random() * res.data.length);
					// var data = res.data[random];

					if (res.data != "") {
						Global.requestTempByAjax('/commonAct_1/temp/swiper.ejs', res.data, function (template) {
							// $(ele).append('<img class="ad" src="' + data.picUrl + '" data-advId="' + data.advId + '" data-href="' + data.linkUrl + '" />');

							$(ele).append(template);

							var swiperSlide = $(ele).find('.swiper-slide');

							if (swiperSlide.length <= 1) {
								$(ele).find('.swiper-pagination').hide();
							}
							// debugger;
							if (swiperSlide.length === 0) {
								$(ele).prev().css({ bottom: 0 });
								$(ele).hide();
							}

							var swiper = new Swiper('.swiper-container', {
								pagination: {
									el: '.swiper-pagination',
								},
								autoplay: true,
								on: {
									init: function () {
										var index = this.activeIndex;

										var img = $(ele).find('.swiper-slide').eq(index).find('img');

										if (img.attr('data-loading') === 'true') {
											return;
										}

										img.attr('data-loading', 'true');

										Func.browseRecord(img.attr('data-advId'), 0);

										this.emit('transitionEnd'); //在初始化时触发一次transitionEnd事件
									},
									slideChangeTransitionEnd: function () {
										var index = this.activeIndex;

										var img = $(ele).find('.swiper-slide').eq(index).find('img');

										if (img.attr('data-loading') === 'true') {
											return;
										}

										img.attr('data-loading', 'true');

										Func.browseRecord(img.attr('data-advId'), 0);
									}
								},
							});

							if (typeof callback !== 'undefined') {
								callback(res.data);
							}

							// Func.browseRecord(data.advId, 0);
						});
					} else {
						$("#awardInforWrapper").css({ bottom: 0 });
						$("#advertisement").css({ background: "transparent" });
					}

				} else {
					$(ele).prev().css({ bottom: 0 });
					$(ele).hide();
					// common.alert({
					// 	content: res.msg,
					// 	mask: true
					// });
				}
			}
		});

		$(document).on('click', ele + ' img', function () {
			var href = $(this).attr('data-href');
			var advId = $(this).attr('data-advId');

			Func.browseRecord(advId, 1);

			window.location.href = href;
		});
	}


	/**
	 * 广告点击浏览统计
	 * @param 	number 		lotteryRecordId		奖项ID
	 * @param  	function 	callback 			获取成功后的回调
	 * @return 	null
	 */
	Func.browseRecord = function (advId, operationType) {

		$.ajax({
			url: api.browseRecord,
			type: 'GET',
			data: {
				advId: advId,
				operationType: operationType
			},
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {

			}
		});
	};


	Func.showSeletMe = function (con) {
		var item = $(con).find('div');

		var timer = null;
		var index = 0;

		timer = setInterval(function () {

			if (index === 3) {
				index = 0;
				item.eq(1).hide();
				item.eq(2).hide();
			}

			item.eq(index).fadeIn(400);
			index++;

		}, 800);
	};

	Func.loadingImage = function (src, callback) {
		var image = new Image();

		image.onload = function () {
			callback(image.width, image.height);
		}

		image.src = src;
	};

	/**
	 * 消费者自主核销
	 * @return null
	 */
	Func.cancelCoupon = function (data, callback) {

		$.ajax({
			url: api.cancelCoupon,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取用户信息
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.getConsume = function (callback) {
		$.ajax({
			url: api.getConsume,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取优惠券数量
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.findCouponNum = function (callback) {
		$.ajax({
			url: api.findCouponNum,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	};

	/**
	 * 中奖记录数量查询
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.lotteryRecordNum = function (callback) {
		$.ajax({
			url: api.lotteryRecordNum,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	Func.companyLotteryRecord = function (data, callback) {
		$.ajax({
			url: api.companyLotteryRecord,
			type: 'GET',
			headers: getHeader(),
			data: data,
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 中奖记录滚动
	 * @return null
	 */
	Func.awardScroll = function () {


		$('#awardInforScrollContent').append($('#awardInforScrollContent').html());

		var awardInforScrollContentWidth = $('#awardInforScrollContent').width();
		var left = 0;

		// debugger;
		var timer = setInterval(function () {

			left--;

			if (Math.abs(left) >= awardInforScrollContentWidth - $(window).width()) {
				left = 0;
			}

			$('#awardInforScrollContent').css({
				left: left
			});
		}, 10);
	}


	/**
	 * 点击签到
	 * @return null
	 */
	Func.signIn = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.signIn,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}


	/**
	 * 打开页面显示页面签到信息
	 * @return null
	 */
	Func.queryUserInfo = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.queryUserInfo,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	}



		/**
	 * 点击领取积分
	 * @return null
	 */
	Func.receiveScore = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.receiveScore,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}


	/**
	 * 积分兑换参与活动次数接口
	 * @return null
	 */
	Func.scoreExchangeAct = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.scoreExchangeAct,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});

	}


	/**
	 * 参与活动抽奖接口
	 * @return null
	 */
	Func.joinAct = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.joinAct,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});

	}

	/**
	 * 扫码添加参与记录
	 * @return null
	 */
	Func.createJoinActInfo = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.createJoinActInfo,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});

	}


	/**
	 * 扫码参与活动抽奖接口
	 * @return null
	 */
	Func.lottery = function (callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.lottery,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});

	}


	/**
	 * 二维码领取奖励
	 * @return null
	 */
	Func.receiveLottery = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.receiveLottery,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}



	/**
	 * 本意首页广告列表查询
	 * @return null
	 */
	Func.getAdvByAdvPageName = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.getAdvByAdvPageName,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}

	/**
	 * 本意广告浏览记录
	 * @return null
	 */
	Func.browseRecord = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.browseRecord,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}



	/**
	 * 本意点击广告记录
	 * @return null
	 */
	Func.clickRecord = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.clickRecord,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}


	/**
	 * 获取验证码
	 * @return null
	 */
	Func.getVerCode = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.getVerCode,
			type: 'POST',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}


	/**
	 * 获取验证码
	 * @return null
	 */
	Func.bindingUserInfoMobile = function (data, callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.bindingUserInfoMobile,
			type: 'POST',
			headers: getHeader(),
			dataType: 'json',
			data: data,
			success: function (res) {
				callback(res);
			}
		});
	}
	
})