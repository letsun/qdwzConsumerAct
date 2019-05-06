
var prizeAmount;
var lotteryId;
$(function () {

    // 关闭公众号弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 关闭中奖结果弹窗
    $('#result-confirm').on('click',function () {
        $('#result-win').fadeOut();
    });

    // 开始活动
    Func.findActivityByEncode(function(res) {
        $('#loadingWrapper').hide();
        var prizes = res.data.prizes;
        if (res.code === 200 || res.code === 201 || res.code === 206) {

        } else if (res.code === 203) {
            $('#loadingWrapper').hide();
            $('.result-title').html('很遗憾');
            $('.dec').hide();
            $('.dec2').find('.name').html('该码已参与过活动');
            $('.dec2').show();
            $('#result-win').fadeIn();
        } else {
            $('#loadingWrapper').hide();
            common.alert({
                mask: true,
                content: res.msg,
            })
        }
    });

    // 关闭二维码弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    $('#receive-btn').on('click',function () {
        Func.findActivityByEncode(function (res) {
            if (res.code === 200 || res.code === 201) {
                Func.isSubscribe(function(res1) {
                    if (res1.code === 200) {
                        if (!res1.data.subscribe) {
                            $('#loadingWrapper').hide();
                            $('#attent-win').fadeIn();
                        } else {
                            Func.lottery(api.lottery,function (reg) {
                                $('#loadingWrapper').hide();
                                if(reg.code == 200) {
                                    prizeAmount = reg.data.redPack.prizeAmount;
                                    if (reg.data.lotteryId > 0) {
                                        lotteryId = reg.data.lotteryId;
                                    }
                                    $('#loadingWrapper').hide();
                                    $('.result-title').html('恭喜您获得');
                                    $('.dec').hide();
                                    $('.dec1').find('.num').find('span').html(prizeAmount);
                                    $('.dec1').show();
                                    $('.result-img').show();
                                    $('#result-win').fadeIn();
                                } else if (reg.code == 201) {
                                    $('#loadingWrapper').hide();
                                    $('.result-title').html('很遗憾');
                                    $('.dec').hide();
                                    $('.dec2').find('.name').html('感恩使用!');
                                    $('.dec2').show();
                                    $('#result-win').fadeIn();
                                } else {
                                    $('#loadingWrapper').hide();
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

            } else if (res.code === 203) {
                $('#loadingWrapper').hide();
                $('.result-title').html('很遗憾');
                $('.dec').hide();
                $('.dec2').find('.name').html('该码已参与过活动');
                $('.dec2').show();
                $('#result-win').fadeIn();
            } else {
                $('#loadingWrapper').hide();
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
                content:res.msg,
            })
        }
    });
}