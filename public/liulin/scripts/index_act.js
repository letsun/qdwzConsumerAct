$(function () {
    var prizeAmount = '';
    var lotteryId = '';

    // 开始活动
    Func.findActivityByEncode(function(res) {
        $('#loadingWrapper').hide();
        var data = res.data;
        if (res.code === 200 || res.code === 201 || res.code === 206) {
            $('#loadingWrapper').show();
            Func.isSubscribe(function(res1) {
                $('#loadingWrapper').hide();
                if (res1.code === 200) {
                    if (!res1.data.subscribe) {
                        $('#attent-win').fadeIn();
                    }
                } else {
                    common.alert({
                        content: res1.msg,
                        mask: true
                    });
                }
            });

        } else {
            common.alert({
                content: res.msg,
                mask: true
            });
        }


    });

    // 点击抢红包
    $('#receive-btn').on('click',function () {
        // 找活动
        Func.findActivityByEncode(function (res) {
            $('#loadingWrapper').hide();
            if (res.code === 200 || res.code === 201) {
                $('#loadingWrapper').show();
                Func.isSubscribe(function(res1) {
                    $('#loadingWrapper').hide();
                    if (res1.code === 200) {
                        if (!res1.data.subscribe) {
                            $('#attent-win').fadeIn();
                        } else {
                            $('#loadingWrapper').show();
                            Func.lottery(api.lottery,function (reg) {
                                $('#loadingWrapper').hide();
                                if(reg.code == 200) {
                                    prizeAmount = reg.data.redPack.prizeAmount;
                                    lotteryId = reg.data.lotteryId;
                                    $('.redResult-title').html('恭喜您获得');
                                    $(".redResult-dec").find(".num").html(reg.data.redPack.prizeAmount);
                                    $('#redResult-win').fadeIn(function () {
                                        userCash(prizeAmount,lotteryId);
                                    });
                                } else if (reg.code == 201) {
                                    $('.redResult-tip').hide();
                                    $('.redResult-title').html('很遗憾');
                                    $(".redResult-dec").html('<span class="num" style="font-size: 48px;">您未中奖</span>').addClass('active');
                                    $('#redResult-win').fadeIn();
                                } else {
                                    common.alert({
                                        mask: true,
                                        content: res.msg,
                                    })
                                }
                            })
                        }
                    } else {
                        common.alert({
                            content: res1.msg,
                            mask: true
                        });
                    }
                });

            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
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