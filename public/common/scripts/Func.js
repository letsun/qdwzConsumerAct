var Func = {};

$(function() {

	/**
	 * 防伪溯源展示接口
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.findEncodeFunction = function(callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.findEncodeFunction,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				callback(res);
			}
		});
	};

	var isLottery = false;

	/**
	 * 抽奖
	 * @param  function callback 抽奖后的回调函数
	 * @return null
	 */
	Func.lottery = function(url, callback) {
		$('#loadingWrapper').show();
		if (isLottery) {
			return;
		}

		isLottery = true;

		$.ajax({
			url: url,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				isLottery = false;
				callback(res);
			}
		});
	}

	/**
	 * 查找二维码情况
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.findActivityByEncode = function(callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.findActivityByEncode,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				$('#loadingWrapper').hide();
				callback(res);
			},
			error:function () {

            }
		});
	}

	/**
	 * 获取手机短信验证码
	 * @param 	object 		data 		数据
	 * @param  	function 	callback 	查找后的回调
	 * @return 	null
	 */
	Func.getVerCode = function(data, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.getVerCode,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				$('#loadingWrapper').hide();
				callback(res);
			}
		});
	}

	/**
	 * 获取手机短信验证码（彼特明）
	 * @param 	object 		data 		数据
	 * @param  	function 	callback 	查找后的回调
	 * @return 	null
	 */
	Func.btmGetVerCode = function(data, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.btmGetVerCode,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				$('#loadingWrapper').hide();
				callback(res);
			}
		});
	}

	/**
	 * 获取手机短信验证码（彼特明）
	 * @param 	object 		data 		数据
	 * @param  	function 	callback 	查找后的回调
	 * @return 	null
	 */
	Func.checkPhonesUserStatus = function(data, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.checkPhonesUserStatus,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				$('#loadingWrapper').hide();
				callback(res);
			}
		});
	}

	/**
	 * 消费者注册
	 * @param 	object 		data 		数据
	 * @param  	function 	callback 	查找后的回调
	 * @return 	null
	 */
	Func.register = function(data, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.register,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				$('#loadingWrapper').hide();
				callback(res);
			}
		});
	}

	/**
	 * 获取用户信息
	 * @param  function callback 获取成功后的回调
	 * @return null
	 */
	Func.getPersonCenter = function(callback) {
		$('#loadingWrapper').show();
		$.ajax({
			url: api.personCenter,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.userCash = function(data, callback) {

		$.ajax({
			url: api.userCash,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.userCashRecord = function(data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}


		$.ajax({
			url: api.userCashRecord,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.findScoreDetail = function(data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}


		$.ajax({
			url: api.findScoreDetail,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.lotteryRecord = function(data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}

		$.ajax({
			url: api.lotteryRecord,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.findCoupon = function(data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}

		$.ajax({
			url: api.findCoupon,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.couponCodeDetail = function(lotteryRecordId, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.couponCodeDetail,
			type: 'GET',
			data: {
				lotteryRecordId: lotteryRecordId
			},
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.couponDetail = function(couponId, callback) {

		$('#loadingWrapper').show();

		$.ajax({
			url: api.couponDetail,
			type: 'GET',
			data: {
				couponId: couponId
			},
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
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
	Func.getAdvByAdvPositionName = function(ele, positionName, callback) {

		// debugger;
		$.ajax({
			url: api.getAdvByAdvPositionName,
			type: 'GET',
			data: {
				positionName: positionName
			},
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				if (res.code === 200) {
					// var random = Math.floor(Math.random() * res.data.length);
					// var data = res.data[random];

					Global.requestTempByAjax('/commonAct_1/temp/swiper.ejs', res.data, function(template) {
						// $(ele).append('<img class="ad" src="' + data.picUrl + '" data-advId="' + data.advId + '" data-href="' + data.linkUrl + '" />');

						$(ele).append(template);

						var swiperSlide = $(ele).find('.swiper-slide');

						if (swiperSlide.length <= 1) {
							$(ele).find('.swiper-pagination').hide();
						}
						// debugger;
						if (swiperSlide.length === 0) {
							$(ele).prev().css({bottom: 0});
							$(ele).hide();
						}

						var swiper = new Swiper('.swiper-container', {
							pagination: {
								el: '.swiper-pagination',
							},
							autoplay: true,
							on: {
								init: function() {
									var index = this.activeIndex;

									var img = $(ele).find('.swiper-slide').eq(index).find('img');

									if (img.attr('data-loading') === 'true') {
										return;
									}

									img.attr('data-loading', 'true');

									Func.browseRecord(img.attr('data-advId'), 0);

									this.emit('transitionEnd'); //在初始化时触发一次transitionEnd事件
								},
								slideChangeTransitionEnd: function() {
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
					$(ele).prev().css({bottom: 0});
					$(ele).hide();
					// common.alert({
					// 	content: res.msg,
					// 	mask: true
					// });
				}
			}
		});

		$(document).on('click', ele + ' img', function() {
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
	Func.browseRecord = function(advId, operationType) {

		$.ajax({
			url: api.browseRecord,
			type: 'GET',
			data: {
				advId: advId,
				operationType: operationType
			},
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {

			}
		});
	};


	Func.showSeletMe = function(con) {
		var item = $(con).find('div');

		var timer = null;
		var index = 0;

		timer = setInterval(function() {

			if (index === 3) {
				index = 0;
				item.eq(1).hide();
				item.eq(2).hide();
			}

			item.eq(index).fadeIn(400);
			index++;

		}, 800);
	};

	Func.loadingImage = function(src, callback) {
		var image = new Image();

		image.onload = function() {
			callback(image.width, image.height);
		}

		image.src = src;
	};

	/**
	 * 获取用户信息
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.getConsume = function(callback) {
		$.ajax({
			url: api.getConsume,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				callback(res);
			}
		});
	}

	/**
	 * 获取优惠券数量
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.findCouponNum = function(callback) {
		$.ajax({
			url: api.findCouponNum,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				callback(res);
			}
		});
	};

	/**
	 * 中奖记录数量查询
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.lotteryRecordNum = function(callback) {
		$.ajax({
			url: api.lotteryRecordNum,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				callback(res);
			}
		});
	}

    /**
     * 查询手机号是否可以参与某活动
	 * @param 	object 		phone		手机号
     * @param  function 	callback 	提交成功后的回调
     * @return null
     */
    Func.checkPhoneIsEnabelJoinAct = function(data,callback) {
        $.ajax({
            url: api.checkPhoneIsEnabelJoinAct,
            type: 'GET',
            headers: getHeader(),
            dataType: 'json',
			data:data,
            success: function(res) {
                callback(res);
            }
        });
    }

    /**
     * 发起提现申请
     * @param 	object 		amount		申请提现的金额
     * @param  function 	callback 	提交成功后的回调
     * @return null
     */
    Func.guestApplyWithdraw = function(data,callback) {
        $.ajax({
            url: api.guestApplyWithdraw,
            type: 'GET',
            headers: getHeader(),
            dataType: 'json',
            data:data,
            success: function(res) {
                callback(res);
            }
        });
	}
	
	/**
	 * 获取企业中奖记录
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	获取成功后的回调
	 * @return null
	 */
	Func.companyLotteryRecord = function(data, callback) {

		if (data.page === 1) {
			$('#loadingWrapper').show();
		}

		$.ajax({
			url: api.companyLotteryRecord,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				callback(res);
			}
		});
	}	
});