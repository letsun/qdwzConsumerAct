var index = 0;
var prizeAmount;
var lotteryId;
var lotteryData = {};
var awardValue;
var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/pangaoshou/1_19.png';

$(function() {
	// 点击活动规则
	$('#viewRules').on('touchend',function () {
	    $('#rules-win').fadeIn();
	});
	
	// 点击关闭活动规则
	$('#rules-btn').on('click',function () {
	    $('#rules-win').fadeOut();
	});
	
	// 点击二维码本身
	$('#qrcode').on('click',function (e) {
	    e.stopPropagation();
	});
	
	// 关闭温馨提示弹窗
	$('#close-warm').on('click',function () {
	    $('#warm-win').fadeOut();
	});
	
	// 关闭未激活弹窗
	$('#close-inact').on('click',function () {
	    $('#inactivated-win').fadeOut();
	});
	
	// 关闭该码已被扫弹窗
	$('#close-received').on('click',function () {
	    $('#received-win').fadeOut();
	});

	// 点击抽奖
	$('.demolition').on('click', function() {
        $('#loadingWrapper').show();
        Func.isSubscribe(function(res1) {
            if (res1.code === 200) {
                if (!res1.data.subscribe) {
                    $('#loadingWrapper').hide();
                    $('#tip').show();
                } else {
                    Func.lottery(api.lottery, function(reg) {
                        $('#loadingWrapper').hide();
                        if (reg.code == 200) {
                            prizeAmount = reg.data.redPack.prizeAmount;
                            if (reg.data.lotteryId > 0) {
                                lotteryId = reg.data.lotteryId;
                            }
                            $('.lottery-dec').find('.amount').html(reg.data.redPack.prizeAmount);
                            $('.winPrize').show();
                            userCash(prizeAmount,lotteryId);
                            $('#lottery-win').fadeIn();
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
	$('.close-lottery').on('click',function () {
        WeixinJSBridge.call('closeWindow');
    })

});

securityFunc(function (red) {
    createJoinActInfo(function (rep) {
        Func.findActivityByEncode(function (res) {
            if (res.code === 200 || res.code === 201) {
                $('#loadingWrapper').hide();
            } else if (res.code === 203) {
                $('#loadingWrapper').hide();
                $(".scanCode").show();
                $('#lottery-win').fadeIn();
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    mask:true,
                    content: res.msg,
                })
            }
        });
    })
})


/*创建参与记录*/
function createJoinActInfo(callback) {
    $.ajax({
        url: api.createJoinActInfo,
        type: 'GET',
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200) {
                callback(res);
            } else if (res.code === 201 || res.code === 202) {
                $('#loadingWrapper').hide();
                $(".scanCode").show();
                $('#lottery-win').fadeIn();
            } else {
                $('.scanCode-title').attr('src',src);
                $('#loadingWrapper').hide();
                $(".scanCode").show();
                $('#lottery-win').fadeIn();
            }
        },
        error:function (res) {
            $('.scanCode-title').attr('src',src);
            $('#loadingWrapper').hide();
            $(".scanCode").show();
            $('#lottery-win').fadeIn();
        }
    });
}


/*真溯源*/
function securityFunc(callback) {
    $('#loadingWrapper').show();
    $.ajax({
        url: api.findRealTracing,
        type: 'GET',
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200) {
                var data = res.data;
                if (data.originRecord.length > 0) {
                    callback(res)
                } else {
                    $('.scanCode-title').attr('src',src);
                    $('#loadingWrapper').hide();
                    $(".scanCode").show();
                    $('#lottery-win').fadeIn();
                }

            } else {
                $('.scanCode-title').attr('src',src);
                $('#loadingWrapper').hide();
                $(".scanCode").show();
                $('#lottery-win').fadeIn();
            }
        },
        error:function (res) {
            $('.scanCode-title').attr('src',src);
            $('#loadingWrapper').hide();
            $(".scanCode").show();
            $('#lottery-win').fadeIn();
        }
    });
}
