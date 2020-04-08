$(function() {
    var prizeAmount = '';
    var lotteryId = '';
 

	Func.findActivityByEncode(function (res) {
	    $('#loadingWrapper').hide();
	    if (res.code === 200 || res.code === 201) {
	        
	    } else if (res.code === 203) {
            $('#result-win').fadeIn();
            $('.dec5').show();
            $('.result-title').html('对不起');
	    } else {
	        common.alert({
	            mask:true,
	            content:res.msg
	        })
	    }
    });
    


    // 点击领红包
    $('#receive-btn').on('click', function() {
        $('#loadingWrapper').show();
        Func.findActivityByEncode(function (res) {
            $('#loadingWrapper').hide();
            if (res.code === 200 || res.code === 201) {
                Func.isSubscribe(function(res1) {
                    if (res1.code === 200) {
                        if (!res1.data.subscribe) { //res1.data.subscribe
                            $('#loadingWrapper').hide();
                            $('#attent-win').fadeIn();
                        } else {
                            Func.lottery(api.lottery,function (reg) {
                                $('#loadingWrapper').hide();
                                if(reg.code == 200) {
                                    prizeAmount = reg.data.redPack.prizeAmount;
                                    lotteryId = reg.data.lotteryId;
                                    $('.result-title').html('恭喜您获得');
                                    $('.dec').hide();
                                    $('.dec1').show();
                                    $('.dec1 .num').find('span').html(prizeAmount);
                                    $('#result-conBg').show();
                                    userCash(prizeAmount,lotteryId);
                                } else if (reg.code == 201) {
                                    $('.result-title').html('很遗憾未中奖!');
                                    $('.name').html(reg.msg)
                                    $('.dec').hide();
                                    $('.dec4').show();
                                } else if (reg.code == 201) {
        
                                }
                                $('.result-win').fadeIn();
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
            } else if (res.code === 203) {
                $('#result-win').fadeIn();
                $('.dec5').show();
                $('.result-title').html('对不起');
            } else {
                common.alert({
                    mask:true,
                    content:res.msg
                })
            }
        });


    });
    $('#receive-btn').on('click', function() {


    });



    // 点击关闭二维码弹窗
    $('#close-attent').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 关闭当前页面
    $('#result-confirm').on('click',function () {
        // WeixinJSBridge.call('closeWindow');

        $('#result-win').fadeOut();
        $('#result-win .dec').fadeOut();
    })


});

// 自动提现
function userCash(num,lotteryId) {
    $.ajax({
        url: api.userCash,
        type: 'GET',
        dataType: 'json',
        data:{
            lotteryId: lotteryId,
            amount: num,
            cashType: 0,
        },
        headers: getHeader(),
        success: function(res) {

        },
        error:function (res) {
            common.alert({
                mask:true,
                content:res.msg
            })
        }
    });
}

