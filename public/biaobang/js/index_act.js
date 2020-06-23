var prizeAmount;
var lotteryId;

$(function() {
	// 输入框失去焦点兼容苹果系统
	$('input,textarea,select').on('blur', function() {
		setTimeout(function() {
			var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
			if (!hasFocus) {
				window.scroll(0, 0);
			}
		}, 100);
	});

	/**获取用户头像昵称**/
	var userImg = getQueryVariable('headimgurl');
	userImg = unescape(userImg);
	var nickName = getQueryVariable('nickname');
	nickName = decodeURI(nickName);

	// 设置用户头头像和昵称
	$(".avatar").attr("src", userImg);
	$(".nickname").html(nickName);

	// 点击整个红包
	$('.submit').on('click', function() {
		$('.content').show();
		$('#hb').fadeIn();
	});

	// 点击活动规则按钮
	$('.rule-btn').on('click', function() {
		$('.rule-win').show();
		scrollWra1.refresh();
	});
	// 点击活动规则关闭按钮
	$('.rule-win .close-rule').on('click', function() {
		$('.rule-win').hide();
	});
	
	// 点击中奖记录按钮
	$('.winning-btn').on('click', function() {
		$('.record-win').show();
		
		// 中奖记录数据
		init();
	});
	// 点击中奖记录顶部返回按钮
	$('.back-icon').on('click', function() {
		$('.record-win').hide();
	});
	// 点击关闭按钮
	$('.close-btn').on('click', function() {
		$('.success-win').hide();
	});
	// 点击中奖去领取按钮
	$('.result-win .result-con .go-receive').on('click', function() {
		$('.result-win').hide();
		$('.success-win').show();
		
		// 提现
		userCash(prizeAmount, lotteryId)
	});

	// 点击我知道了
	$('.result-win .result-con .i-know').on('click', function() {
		$('.result-win').hide();
		$('.dec2').hide();
		$('.i-know').hide();
	});
	
	var flag = true;
	// 点击获取验证码
	$('.get-code').on('click', function() {
		var mobile = $('#mobile').val();
	
		if (mobile == '') {
			common.alert({
				mask: true,
				content: '请输入您的手机号'
			})
			return;
		} else if (!(/^1[3456789]\d{9}$/.test(mobile))) {
			common.alert({
				mask: true,
				content: '请输入正确的手机格式'
			})
			return;
		}
		
		var cutDownTime = 60;
		if(flag){
			var timer = setInterval(function(){
				cutDownTime--;
				$('.get-code').html('倒计时：' + cutDownTime + 's')
				if(cutDownTime == 0){
					clearInterval(timer);
					
					cutDownTime = 60;
					clearInterval(timer);
					$('.get-code').html('获取验证码')
					flag = true;
				}else{
					flag = false;
					return;
				}
			},1000)
			
			$('#loadingWrapper').show();
			Func.getVerCode({
				mobile: mobile,
				smsTemplateId: 1,
			},function(red) {
				$('#loadingWrapper').hide();
				if(red.code == 500){
					common.alert({
						mask: true,
						content: red.msg
					})
				}
			});
		}else{
			
		}

	});

	// 点击提交信息弹窗提交按钮
	$('.submit-btn').on('click', function() {
		var mobile = $('#mobile').val();
		var verCode = $('#ver-code').val();

		if (mobile == '') {
			common.alert({
				mask: true,
				content: '请输入您的手机号'
			})
			return;
		} else if (!(/^1[3456789]\d{9}$/.test(mobile))) {
			common.alert({
				mask: true,
				content: '请输入正确的手机格式'
			})
			return;
		} else if(verCode == ''){
			common.alert({
				mask: true,
				content: '请输入验证码'
			})
			return;
		}
		
		// 绑定手机号
		$.ajax({
			url: api.saveUserInfo,
			type: 'GET',
			dataType: 'json',
			data: {
				mobile: mobile,
				verCode: verCode
			},
			headers: getHeader(),
			success: function(res) {
				if(res.code == 200){
					common.alert({
						mask: true,
						content: '绑定手机号成功',
						ok: function(){
							$('.submit-win').hide();
							// $('.success-win').show();
						}
					})
					
				}else{
					common.alert({
						mask: true,
						content: res.msg
					})
				}
			},
			error: function(res) {
				common.alert({
					mask: true,
					content: res.msg
				})
			}
		
		});
	});

	// 点击红包整个
	$('.pack-wra').on('click', function() {
		$('#loadingWrapper').show();
		
		// 用户是否绑定手机号码
		$.ajax({
			url: api.checkUserMobile,
			type: 'GET',
			dataType: 'json',
			data: {},
			headers: getHeader(),
			success: function(res) {
				$('#loadingWrapper').hide();
				
				if(res.code == 200){
					// type: 0已绑定，1未绑定
					if(res.data.type == 0){
		
						Func.toLottery(api.lottery, function(red) {
							$('#loadingWrapper').hide();
							if (red.code === 200) {
								prizeAmount = red.data.redPack.prizeAmount; // 红包金额
								if (red.data.lotteryId > 0) {
									lotteryId = red.data.lotteryId;
								}
								$('.dec1 .num').find('span').html(prizeAmount);
								
								$('.result-title').html('恭喜您获得');
								$('.result-win').show();
								$('.dec1').show();
								$('.go-receive').show();
							} else if (red.code === 201) {
						
							} else if (red.code === 202) {
								$('#loadingWrapper').hide();
								$('.result-title').html('恭喜您获得');
								$('.result-win').show();
								$('.dec1').show();
								$('.go-receive').show();
							} else {
								common.alert({
									mask: true,
									content: red.msg
								})
							}
						});
						
					}else{
						$('.result-win').hide();
						$('.submit-win').show();
					}
				}else {
					common.alert({
						mask: true,
						content: res.msg
					})
				}
			},
			error: function(res) {
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg
				})
			}
		
		});
		
		

	})

	// 自动提现
	function userCash(num, lotteryId) {
		$.ajax({
			url: api.userCash,
			type: 'GET',
			dataType: 'json',
			data: {
				lotteryId: lotteryId,
				amount: num,
				cashType: 1, // 0自动，1手动
			},
			headers: getHeader(),
			success: function(res) {

			},
			error: function(res) {

			}

		});
	}

	var companyId = getQueryVariable('companyId'); // 公司id
	var validateCode = getQueryVariable('encode'); // 扫的码
	// console.log(companyId)
	// console.log(validateCode)

	codeValidate();
	// 二维码防伪
	function codeValidate() {
		$.ajax({
			url: api.findEncodeFunction,
			type: 'GET',
			dataType: 'json',
			data: {
				companyId: companyId,
				validateCode: validateCode
			},
			headers: getHeader(),
			success: function(res) {
				var validateTime = res.data.securityCheckRecord.valiCount;
				var validateDate = res.data.securityCheckRecord.firstValiTime;

				var date = new Date(validateDate);
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				if (hour < 10) {
					hour = '0' + hour;
				}
				var munite = date.getMinutes();
				if (munite < 10) {
					munite = '0' + munite;
				}

				var dateStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + munite;
				// console.log(dateStr)
				if(validateTime <= 3){
					$('.detail-time').html(validateTime);
				}else{
					$('.validate-time').html('多次验证');
				}
				$('.validate-date').html(dateStr);
			},
			error: function(res) {

			}

		});
	}
	
	createJoinActInfo();
	/*创建参与记录*/
	function createJoinActInfo() {
		$.ajax({
			url: api.createJoinActInfo,
			type: 'GET',
			headers: getHeader(),
			success: function(res) {
				console.log(res.data)
				if (res.code === 200) {
					
				} else if (res.code === 201 ) {
					$('#loadingWrapper').hide();
					$('.result-title').html('很遗憾');
					$('.result-win').show();
					$('.dec2').show();
					$('.i-know').show();
				} else if(res.code === 202){
					if(res.data.status == 0){
						$('#loadingWrapper').hide();
						prizeAmount = res.data.prizeAmount
						$('.dec1 .num').find('span').html(prizeAmount);
						
						$('.result-title').html('恭喜您获得');
						$('.result-win').show();
						$('.dec1').show();
						$('.go-receive').show();
					}else{
						$('#loadingWrapper').hide();
						$('.result-title').html('很遗憾');
						$('.result-win').show();
						$('.dec2').show();
						$('.i-know').show();
					}
				} else {
					$('#loadingWrapper').hide();
					$('.result-title').html('很遗憾');
					$('.result-win').show();
					$('.dec2').show();
					$('.i-know').show();
				}
			},
			error: function(res) {
				// $('#loadingWrapper').hide();
				// $('.result-title').html('很遗憾');
				// $('.result-win').show();
				// $('.dec2').show();
				// $('.i-know').show();
			}
		});
	}
	
	// 个人中心中奖记录
	var page = 1;
	var hasNext;
	// 初始化中奖记录数据
	function init() {
		var page = 1;
		$('.list').html('');
		
		// 初始化数据
		Func.lotteryRecord({
			page: page,
			limit: 10
		}, function(res) {
			var data = res.data;
	
			if (res.code === 200) {
				hasNext = data.hasNext;
				render(data.lotteryRecordList);
	
				// if (data.lotteryRecordList.length >= 20) {
				// 	$('#loading').show();
				// }
			} else {
				common.alert({
					content: res.msg,
					mask: true
				});
			}
	
	
			$('#loadingWrapper').hide();
		});
	}
	
	// 分页
	var scrollWra = new BScroll('#scrollWrapper', {
		scrollbar: {
			fade: true
		},
		click: true,
		pullUpLoad: {
			threshold: 0
		}
	});
	
	scrollWra.on('pullingUp', function() {
		$('#loadingWrapper').show();
		if (!hasNext) {
			$('#loadingWrapper').hide();
	
			$('#loading').text('已经没有更多了');
			return;
		}
	
		$('#loading').text('正在加载中...');
	
		page++;
	
		// 拉取数据
		Func.lotteryRecord({
			page: page,
			limit: 10
		}, function(res) {
			$('#loadingWrapper').hide();
	
			var data = res.data;
	
			if (res.code === 200) {
				hasNext = data.hasNext;
				render(data.lotteryRecordList);
			} else {
				common.alert({
					content: res.msg,
					mask: true
				});
			}
		});
	});
	
	/**
	 * 渲染数据
	 * @param  object data 需要的数据
	 * @return null
	 */
	function render(data) {
		var html = '';
		for (var i = 0; i < data.length; i++) {
	
			html += '<li class="item">'
			html += '<div class="item-name">' + data[i].prizeAmount + '元现金红包1个</div>'
			html += '<div class="item-time">' + data[i].createDate + '</div>'
			html += '</li>'
		}
	
		$('.list').append(html);
	
		scrollWra.finishPullUp();
		scrollWra.refresh();
	}

	// 获取页面路径指定参数
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return (false);
	}
	
	// 活动规则分页
	var scrollWra1 = new BScroll('#scrollWrapper1', {
		scrollbar: {
			fade: true
		},
		click: true,
	});
})
