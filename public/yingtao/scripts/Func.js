var Func = {};

$(function() {

	/**
	 * 查询是否关注公众号
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.isSubscribe = function(callback) {

		$('#loadingWrapper').show();
		
		$.ajax({
			url: api.isSubscribe,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				$('#loadingWrapper').hide();
				if (res.code === 200) {
					callback(res);
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}
			}
		});
	}

	/**
	 * 查找二维码情况
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
	}

	/**
	 * 裂变活动查询二维码参与活动状态
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.findFissionActByEncode = function(callback) {

		$('#loadingWrapper').show();
		
		$.ajax({
			url: api.findFissionActByEncode,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				callback(res);
			}
		});
	}

	/**
	 * 抽奖
	 * @param  function callback 抽奖后的回调函数
	 * @return null
	 */
	Func.lottery = function(callback) {
		$('#loadingWrapper').show();

		$.ajax({
			url: api.lottery,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				var html = '';
				var data = res.data;

				if (res.code === 200) {
					callback(res);
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}

				$('#loadingWrapper').hide();
			}
		});
	}

	/**
	 * 抽奖
	 * @param  function callback 抽奖后的回调函数
	 * @return null
	 */
	Func.fissionActLottery = function(callback) {
		$('#loadingWrapper').show();

		$.ajax({
			url: api.fissionActLottery,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				var html = '';
				var data = res.data;

				if (res.code === 200) {
					callback(res);
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}

				$('#loadingWrapper').hide();
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
				
				callback(res);	
			}
		});
	}

	/**
	 * 查找二维码情况
	 * @param 	object		data 		参数
	 * @param  	function 	callback 	查找后的回调
	 * @return 	null
	 */
	Func.findShareParams = function(data, callback) {
		
		$.ajax({
			url: api.findShareParams,
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
				$('#loadingWrapper').hide();
				if (res.code === 200) {
					callback(res);
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}
			}
		});
	}

	/**
	 * 获取用户信息
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	提交成功后的回调
	 * @return null
	 */
	Func.userCash = function(data, callback) {
		$('#loadingWrapper').show();
		
		$.ajax({
			url: api.userCash,
			type: 'POST',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {

				$('#loadingWrapper').hide();

				if (res.code === 200) {
					callback(res);
				}

				common.alert({
					content: res.msg,
					mask: true
				});
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
	 * 获取提现记录
	 * @param  object 		data 		提交的数据
	 * @param  function 	callback 	获取成功后的回调
	 * @return null
	 */
	Func.findRebate = function(data, callback) {
		
		$.ajax({
			url: api.findRebate,
			type: 'GET',
			data: data,
			headers: getHeader(),
			dataType: 'json',
			success: function(res) {
				if (res.code === 200) {
					callback(res);
				} else {
					common.alert({
						content: res.msg,
						mask: true
					});
				}
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
	 * 获取中奖记录
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
    				var random = Math.floor(Math.random() * res.data.length);
    				var data = res.data[random];

    				$(ele).html('<img src="' + data.picUrl + '" data-advId="' + data.advId + '" data-href="' + data.linkUrl + '" />');

    				Func.browseRecord(data.advId, 0);

    			} else {
    				common.alert({
    					content: res.msg,
    					mask: true
    				});
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
	}


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
	}

	Func.loadingImage = function(src, callback) {
		var image = new Image();

		image.onload = function() {
			callback(image.width, image.height);
		}

		image.src = src;
	}
})