var intDiff = 60;

var lotteryRecordId; //中奖纪录id
$(function () {
	// 页面禁止滑动
	$('.container').on("touchmove", function (e) {
		e.preventDefault();
	});
	/**加载进度*/
	common.loading($("#percent"), function () {

		$('.loading').hide();
		$('.container').fadeIn();
	});

	/**打开弹出了解活动*/
	$('.footer-text1').on('click', function () {
		$('.huodong').show()
	})

	$('.huodong-con-img2').on('click', function () {
		$('.huodong').hide()
	})
	/**关闭公众号弹窗*/

	$('.gzh-con-img3').on('click', function () {
		$('.gzh').hide()
	})

	//关闭弹窗
	$('.btn-img').on('click', function () {
		$('#hb').hide()
	})

	Func.findActivityByEncode(function (res) {
		$('#loadingWrapper').hide();
		if (res.code === 200 || res.code === 201) {

		} else if (res.code == 202) {

			lotteryRecordId = res.data.lotteryRecordId;
			$('.hb-con1').find('.num').html(res.data.prizeAmount);
			$('.hb-con').hide();
			$('.hb-con1').show();
			$('#hb').fadeIn();
		} else if (res.code === 203) {
			$('.hb-con').hide();
			$('.hb-con3').show();
			$('#hb').fadeIn();
		} else {
			common.alert({
				mask: true,
				content: res.msg
			})
		}
	});

	// 点击开启红包
	$('#hbbtn').on('click', function () {
		$('#loadingWrapper').show();
		Func.isSubscribe(function (res) {
			if (res.code == 200) {
				if (!res.data.subscribe) { //!res1.data.subscribe 未关注
					$('#loadingWrapper').hide();
					$('.gzh').show()
				} else {
					Func.findActivityByEncode(function (res) {
						if (res.code == 200 || res.code == 201) {
							Func.lottery(function (red) {
								$('#loadingWrapper').hide();
								if (red.code == 200) {

									lotteryRecordId = red.data.lotteryId;
									$('.hb-con').hide();
									$('.hb-con1').find('.num').html(red.data.redPack.prizeAmount);
									$('.hb-con1').show();
									$('#hb').fadeIn();

								} else if (red.code == 201) {
									$('.hb-con').hide();
									$('.hb-con2').show();
									$('#hb').fadeIn();
								} else {
									common.alert({
										mask: true,
										content: red.msg
									})
								}
							});

						} else if (res.code == 203) {
							$('#loadingWrapper').hide();
							$('.hb-con').hide();
							$('.hb-con3').show();
							$('#hb').fadeIn();
						} else {
							$('#loadingWrapper').hide();
							common.alert({
								mask: true,
								content: res.msg
							})
						}
					});
				}
			} else {
				$('#loadingWrapper').hide();
			}
		})
	})





	//点击领取红包
	$('#lqhb').on('click', function () {

		//是否绑定手机号
		Func.checkUserMobile(function (res) {
			if (res.code == 200) {
				$('#loadingWrapper').hide();

				//0 已绑定 1未绑定
				if (res.data.type == 0) {
					//领取中奖
					Func.receiveLottery({
						lotteryRecordId: lotteryRecordId
					}, function (red) {
						if (red.code == 200) {
							$('.hb-con1').hide()
							$('.hb-con5').show()
							$('#loadingWrapper').hide();
						} else {
							$('#loadingWrapper').hide();
						}

					})
				} else {
					$('.hb-con4').show()
				}

			} else {
				$('#loadingWrapper').hide();
			}
		})

	});



	
	//获取验证码
	$('.cont-inp-btn').on('click', function () {
		var pattern = /^1\d{10}$/;
		var mobile = $('#phone').val();
		var self = $(this);
		if (mobile == ''||mobile==null) {
			common.alert({
				mask: true,
				content: '手机号不能为空'
			})
			return false;
		}
		
		if(!pattern.test(mobile)) {
			common.alert({
				mask: true,
				content: '手机号格式不正确'
			});
			return false;
		}



		Func.getVerCode({
			mobile: mobile
		}, function (res) {
			if (res.code == 200) {
				$('#loadingWrapper').hide();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					if (typeof timer(intDiff) != "undefined") {
						self.html("验证码" + "(" + timer(intDiff) + ")");
					}
				}
			} else {
				$('#loadingWrapper').hide();
			}

		})
	});

	//绑定手机号码
	$('#btnphone').on('click', function () {
		$('#loadingWrapper').hide();
		var mobile = $('#phone').val()
		var verCode = $('#verCode').val()
		var pattern = /^1\d{10}$/;
		if (mobile == ''|| mobile==null) {
			common.alert({
				mask: true,
				content: '手机号不能为空'
			});
			return false
		}
		if (verCode == ''|| verCode==null) {
			common.alert({
				mask: true,
				content: '验证码不能为空'
			});

			return false
		}

		if (!pattern.test(mobile)) {
			common.alert({
				mask: true,
				content: '手机号格式不正确'
			});
			return false;
		}

		Func.bindingUserInfoMobile({
			mobile: mobile,
			verCode: verCode
		}, function (res) {
			if (res.code == 200) {
				Func.receiveLottery({
					lotteryRecordId: lotteryRecordId
				}, function (res) {
					if (res.code == 200) {
						$('.hb-con').hide();
						$('.hb-con5').show();
						$('#loadingWrapper').hide();
					} else {
						$('#loadingWrapper').hide();
					}

				})
			} else {
				common.alert({
					content: res.msg,
					mask: true
				});
				$('#loadingWrapper').hide();
			}
		})
	})

})


/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim) {

	$('.cont-inp-btn').html("验证码" + "(" + initTim + "s)").css("background", "#eee");
	$('.cont-inp-btn').html("验证码" + "(" + initTim + "s)").css("color", "#333");
	backInterval = window.setInterval(function () {

		initTim--;

		if (initTim <= 9) {
			initTim = '0' + initTim;
		}

		$('.cont-inp-btn').html("验证码" + "(" + initTim + "s)");

		if (initTim == 0) {
			$(".cont-inp-btn").html("获取验证码").css("background", "#fff355");
			$(".cont-inp-btn").css('color', '#fe1504');
			$('.cont-inp-btn').removeClass('active');
			clearInterval(backInterval);
			intDiff = parseInt(10);
		}

	}, 1000);
}