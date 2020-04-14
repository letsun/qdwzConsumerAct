var index = 0;
var prizeAmount;
var lotteryId;
var lotteryData = {};
var awardValue;
var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/pangaoshou/1_19.png';
var prizes; // 转盘奖项
var prizeLength; // 奖项数组长度
var isLottery = true; // 抽奖单次校验

// 输入框失去焦点兼容苹果系统
$('input,textarea,select').on('blur',function(){
    setTimeout(function () {
        var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
        if (!hasFocus) {
            window.scroll(0,0);
        }
    },100);
});

window.pushHistory(); // 监听返回
window.addEventListener("popstate", function(e) {
//苹果底部导航条处理
//console.log(111)
});

// 监听返回按钮
function pushHistory() {
	window.history.pushState(null, null, '');
}
	  
$(function() {
	// 弹出活动规则
	$(".rule-btn").click(function() {
		$(".cover").show();
	})

	//关闭活动规则
	$(".rule-close-btn").click(function() {
		$(".cover").hide();
	})

	//关闭提示关注公众号弹窗
	$("#tip .rule-close-btn").click(function() {
		$("#tip").hide();
	})

	// 岗位下拉选
	$('.select-post').on('click', function() {
		$('.post-select').slideToggle();
	})
	//选中的那个岗位
	$('.post-option').on('click', function() {
		var selectPost = $(this).html();
		$('.select-post').html(selectPost);
		$('.post-select').hide();
	})

	// 点击确认提交按钮
	$('.confirm-submit').on('click', function() {
		var province = $('#province').val();
		var city = $('#city').val();
		// console.log(province)
		// console.log(city)
		var nameValue = $('.name').val(); // 姓名
		var nativePlace = $('.native-place').val(); // 籍贯
		var phone = $('.phone').val(); // 手机号码
		var post = $('.select-post').html(); // 岗位

		if (nameValue == '') {
			common.alert({
				content: "请填写您的姓名",
				mask: true
			});
			return false;
		} else if (post == '请选择您的岗位') {
			common.alert({
				content: "请选择您的岗位",
				mask: true
			});
			return false;
		}else if (province == '' || city=='') {
			common.alert({
				content: "请选择您的省份和城市",
				mask: true
			});
			return false;
		} else if (phone == '') {
			common.alert({
				content: "请填写您的手机号码",
				mask: true
			});
			return false;
		} else if (!(/^1[3456789]\d{9}$/.test(phone))) {
			common.alert({
				content: "请填写正确的手机号码",
				mask: true
			});
			return false;
		}

		// 新增用户信息
		Func.addUserInfo({
			userName: nameValue,
			position: post,
			province: province,
			city: city,
			mobile: phone
		}, function(res2) {
			if (res2.code == 200) {
				$('#loadingWrapper').hide();
				$('.submit-info-wrap').hide();

			} else {
				$('#loadingWrapper').hide();
				common.alert({
					content: res2.msg,
					mask: true
				});
			}
		});

	})
	//关闭提交信息弹窗
	$('.submit-info-wrap .rule-close-btn').on('click', function() {
		$('.submit-info-wrap').hide();
	})
	
	// 点击立即领取
	$('.winPrize .lottery-text').on('click', function() {
		$('#lottery-win').hide();
		$('#lottery-win .winPrize').hide();
		userCash(prizeAmount, lotteryId); // 提现
	})
	
	// 点击我知道了
	$('.scanCode .lottery-text').on('click', function() {
		$('#lottery-win').hide();
		$('#lottery-win .scanCode').hide();
		userCash(prizeAmount, lotteryId); // 提现
	})

	// 获取大转盘奖项
	Func.findActivityByEncode(function(res) {
		if (res.code === 200 || res.code === 201 || res.code === 203) {
			$('#loadingWrapper').hide();
			// 转盘奖项
			prizes = res.data.prizes;
			prizeLength = prizes.length;

			// 转盘奖项
			var html = '';
			for (var i = 0; i < prizeLength; i++) {
				html += '<li>' +
					'<img src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/guanli/1_6.png" alt="">' +
					'<div><span class="award-num">' + prizes[i].amount + '</span><br>元</div>' +
					'</li>';
			}

			$('.award-list').append(html);
		} else {
			$('#loadingWrapper').hide();
			common.alert({
				mask: true,
				content: res.msg,
			})
		}
	});

	// 点击抽奖
	$('#lottery-btn').on('click', function() {
		$('#loadingWrapper').show();

		// 判断是否关注公众号
		Func.isSubscribe(function(res1) {
			if (res1.code == 200) {
				// 此处应该如此 !res1.data.subscribe
				if (!res1.data.subscribe) {
					$('#loadingWrapper').hide();
					$('#tip').show();
				} else {

					// 查询是否填写用户信息
					Func.checkUserInfo(function(res2) {
						if (res2.code == 200) {

							$('#loadingWrapper').hide();
							if (res2.data.type == 1) {
								// type=1 表示需要填写信息
								$('.submit-info-wrap').fadeIn();
							} else {
								// 单次抽奖校验
								if(isLottery){
									
									// 判断二维码状态
									Func.findActivityByEncode(function(res) {
										if (res.code === 200 || res.code === 201) {
											$('#loadingWrapper').hide();
											
											// 抽奖
											Func.lottery(api.lottery, function(reg) {
												$('#loadingWrapper').hide();
												isLottery = false; // 正在抽奖时候不能再次抽奖
												if (reg.code == 200) {
													prizeAmount = reg.data.redPack.prizeAmount; // 红包金额
													if (reg.data.lotteryId > 0) {
														lotteryId = reg.data.lotteryId;
													}
													var prizeId = reg.data.prizeId;
													$('.lottery-dec .amount').find('.award-num').html(prizeAmount);
											
													// 判断选中那个
													var checkIndex; // 中奖的奖项下标
													for (let i = 0; i < prizeLength; i++) {
														if (prizes[i].prizeId == prizeId) {
															// 中奖的奖励index
															checkIndex = i;
														}
													}
											
													// 转盘转动
													var totalRotate = 360 * 4 + 360 / 10 * (checkIndex+1) - 18; // 转盘转动的角度
											
													$('#turn-table-wrap').css({
														'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
														'transform': 'rotate(' + (-totalRotate) + 'deg)'
													});
													
													// 大转盘动画结束
													$('#turn-table-wrap').on('transitionend', function() {
														setTimeout(function() {
															// 中奖弹窗弹出
															$('#lottery-win').fadeIn();
															$('.winPrize').fadeIn();
															
															// 转盘复原
															$('#turn-table-wrap').css({
																'transition': 'transform 0s',
																'transform': 'rotate(' + 0 + 'deg)'
															});
															
															// 能够重新抽奖
															isLottery = true;
														}, 1000)
													
													});
											
												} else if (reg.code == 201) {
													$('.noPrize').show();
													$('#lottery-win').fadeIn();
												} else {
													common.alert({
														content: reg.msg,
														mask: true
													});
												}
											})
									
										}else if(res.code === 203){
											$('#loadingWrapper').hide();
											$('#lottery-win').show();
											$('#lottery-win .scanCode').show();
										} else {
											$('#loadingWrapper').hide();
											common.alert({
												mask: true,
												content: res.msg,
											})
										}
									});
									
								}else{
									alert('正在抽奖中,请稍后...')
								}
								
							}

						} else {
							$('#loadingWrapper').hide();
							common.alert({
								content: res2.msg,
								mask: true
							});
						}
					});
				}
			} else {
				$('#loadingWrapper').hide();
				common.alert({
					content: res1.msg,
					mask: true
				});
			}
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
			success: function(res) {

			},
			error: function(res) {

			}

		});
	}


	// 关闭页面
	// $('.close-lottery').on('click',function () {
	// $('.lottery-win').hide();
	// WeixinJSBridge.call('closeWindow');
	//    })

});

// securityFunc(function (red) {
//     createJoinActInfo(function (rep) {
//         Func.findActivityByEncode(function (res) {
//             if (res.code === 200 || res.code === 201) {
//                 $('#loadingWrapper').hide();
//             } else if (res.code === 203) {
//                 $('#loadingWrapper').hide();
//                 $(".scanCode").show();
//                 $('#lottery-win').fadeIn();
//             } else {
//                 $('#loadingWrapper').hide();
//                 common.alert({
//                     mask:true,
//                     content: res.msg,
//                 })
//             }
//         });
//     })
// })


/*创建参与记录*/
// function createJoinActInfo(callback) {
//     $.ajax({
//         url: api.createJoinActInfo,
//         type: 'GET',
//         headers: getHeader(),
//         success: function(res) {
//             if (res.code === 200) {
//                 callback(res);
//             } else if (res.code === 201 || res.code === 202) {
//                 $('#loadingWrapper').hide();
//                 $(".scanCode").show();
//                 $('#lottery-win').fadeIn();
//             } else {
//                 $('.scanCode-title').attr('src',src);
//                 $('#loadingWrapper').hide();
//                 $(".scanCode").show();
//                 $('#lottery-win').fadeIn();
//             }
//         },
//         error:function (res) {
//             $('.scanCode-title').attr('src',src);
//             $('#loadingWrapper').hide();
//             $(".scanCode").show();
//             $('#lottery-win').fadeIn();
//         }
//     });
// }


/*真溯源*/
// function securityFunc(callback) {
//     $('#loadingWrapper').show();
//     $.ajax({
//         url: api.findRealTracing,
//         type: 'GET',
//         headers: getHeader(),
//         success: function(res) {
//             if (res.code === 200) {
//                 var data = res.data;
//                 if (data.originRecord.length > 0) {
//                     callback(res)
//                 } else {
//                     $('.scanCode-title').attr('src',src);
//                     $('#loadingWrapper').hide();
//                     $(".scanCode").show();
//                     $('#lottery-win').fadeIn();
//                 }

//             } else {
//                 $('.scanCode-title').attr('src',src);
//                 $('#loadingWrapper').hide();
//                 $(".scanCode").show();
//                 $('#lottery-win').fadeIn();
//             }
//         },
//         error:function (res) {
//             $('.scanCode-title').attr('src',src);
//             $('#loadingWrapper').hide();
//             $(".scanCode").show();
//             $('#lottery-win').fadeIn();
//         }
//     });
// }
