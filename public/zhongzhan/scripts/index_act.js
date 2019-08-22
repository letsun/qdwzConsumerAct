$(function() {
    var prizeAmount = '';
    var lotteryId = '';

    // 点击领红包
    $('#receive-btn').on('click', function() {
        $('#loadingWrapper').show();
        Func.findActivityByEncode(function (res) {
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
                                    $('.result-title').html('很遗憾');
                                    $('.dec').hide();
                                    $('.dec4').show();
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
                $('#loadingWrapper').hide();
                $('.result-title').html('很遗憾');
                $('.dec').hide();
                $('.dec5').show();
                $('.result-win').fadeIn();
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    mask:true,
                    content: res.msg,
                })
            }
        });
    });


    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {

        } else if (res.code === 203) {
            $('.result-title').html('很遗憾');
            $('.dec').hide();
            $('.dec5').show();
            $('.result-win').fadeIn();
        } else {
            common.alert({
                mask:true,
                content: res.msg,
            })
        }
    });


    // 点击关闭二维码弹窗
    $('#close-attent').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 关闭当前页面
    $('#result-confirm').on('click',function () {
        WeixinJSBridge.call('closeWindow');
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