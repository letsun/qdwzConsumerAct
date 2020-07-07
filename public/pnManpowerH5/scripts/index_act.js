$(function() {
    var prizeAmount = '';
    var lotteryId = '';
    Func.findActivityByEncode(function (res) {
        if (res.code === 200 || res.code === 201) {

        } else {
            common.alert({
                mask: true,
                content: res.msg,
            })
        }
    });

    // 点击抽奖
    $('#lottery-btn').on('click',function () {
        // 找活动
        Func.findActivityByEncode(function (res) {
            if (res.code === 200 || res.code === 201) {
                $('#loadingWrapper').show();

                Func.lottery(api.lottery,function (reg) {
                    $('#loadingWrapper').hide();

                    if(reg.code == 200) {
                        prizeAmount = reg.data.redPack.prizeAmount;
                        lotteryId = reg.data.lotteryId;
                        $(".lottery-dec1").find(".num").find('span').html(reg.data.redPack.prizeAmount);
                        $('.lottery-title').html('恭喜您获得现金红包');
                        $('.lottery-dec1').show();
                        $('#lottery-win').fadeIn(function () {
                            userCash(prizeAmount,lotteryId);
                        });
                    } else if (reg.code == 201) {
                        $('.lottery-title').html('很遗憾您未中奖');
                        $('.lottery-dec2').show();
                        $('#lottery-win').fadeIn();
                    } else {
                        common.alert({
                            mask: true,
                            content: res.msg,
                        })
                    }
                })
            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
    });

    // 点击关闭中奖结果弹窗
    $('#close-lottery').on('click',function () {
        $('#lottery-win').fadeOut();
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



