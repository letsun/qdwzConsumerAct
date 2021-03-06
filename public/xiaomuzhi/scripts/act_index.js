$(function () {
    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {
            $('.receive-wra').show();
        } else if (res.code === 203) {
            $('#result-dec').html('该码已被扫').css({'top':'13%'});
            $('#crying-face').show();
            $('#result').fadeIn();
        } else {
            common.alert({
                mask:true,
                content:res.msg
            })
        }
    });

    // 点击开启红包
    $('#receive-btn').on('click',function () {
        $('#loadingWrapper').show();
        Func.lottery(api.lottery,function (res) {
            $('#loadingWrapper').hide();
            if (res.code === 200) {
                $('#result-title').html('恭喜获得');
                $('#result-dec').html(res.data.redPack.prizeAmount +'元');
                $('#result-tips').show();
                $('#result').fadeIn(function () {
                    if (res.data.redPack) {

                        if (res.data.redPack.prizeAmount && res.data.lotteryId) {
							rebackInfoToXmzFunc(1);
                            // userCash(res.data.redPack.prizeAmount,res.data.lotteryId);
                        } else {
                            common.alert({
                                mask:true,
                                content: '奖项Id或者中奖金额不存在'
                            })
                        }

                    } else {
                        common.alert({
                            mask:true,
                            content: '找不到中奖数据'
                        })
                    }

                });
            } else if (res.code === 201) {
                $('#result-title').html('很遗憾');
                $('#result-dec').html('您未中奖');
                $('#crying-face').show();
                $('#result').fadeIn();
            } else {
                common.alert({
                    mask:true,
                    content:res.msg
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
            lotteryId:lotteryId,
            amount:num,
            cashType:0,
        },
        headers: getHeader(),
        success: function(res) {
            rebackInfoToXmzFunc(1);
            if (res.code === 200) {
            } else {
                common.alert({
                    mask:true,
                    content:res.msg
                })
            }
        },
        error:function (res) {
            rebackInfoToXmzFunc(0);
            common.alert({
                mask:true,
                content:res.msg
            })
        }

    });
}


function rebackInfoToXmzFunc(type) {
    $.ajax({
        url: api.rebackInfoToXmz + '?type=' + type,
        type: 'GET',
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {

        }
    });
}