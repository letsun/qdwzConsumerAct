var index = 0;
var prizeAmount;
var lotteryId;
var lotteryData = {};
var awardValue;
var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/pangaoshou/1_19.png';

$(function () {

    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {

        } else if (res.code == 202) {

            $('.amount').html(reg.data.regPack.prizeAmount);
            $('.lottery-win').show();
            $('.winPrize').show()
        } else if (res.code === 203) {
            $('#loadingWrapper').hide();

            $('.lottery-win').show();

            $('.scanCode').show()
        } else {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });



    //点击拆
    $('.demolition').on('click', function () {

        Func.findActivityByEncode(function (res) {
            if (res.code == 200 || res.code == 201) {
                Func.lottery(function (reg) {

                    if (reg.code == 200) {
                        $('#loadingWrapper').hide();
                        var prizeAmount = reg.data.redPack.prizeAmount;
                        $('.amount').html(reg.data.redPack.prizeAmount);
                        $('.lottery-win').show();
                        $('.winPrize').show()

                        if (reg.data.lotteryId > 0) {
                            lotteryId = reg.data.lotteryId;
                        }

                        userCash(prizeAmount, lotteryId);
                    } else if (reg.code == 201) {
                        $('#loadingWrapper').hide();
                        $('.lottery-win').show();
                        $('.noPrize').show()
                    } else {
                        $('#loadingWrapper').hide();
                        common.alert({
                            mask: true,
                            content: reg.msg
                        })
                    }
                });

            } else if (res.code == 203) {
                $('#loadingWrapper').hide();

                $('.lottery-win').show();

                $('.scanCode').show()
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    mask: true,
                    content: res.msg
                })
            }
        });

    });


    // // 自动提现
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
            success: function (res) {

            },
            error: function (res) {

            }

        });
    }

    //点击我知道了
    $('.lottery-zd').on('click', function () {

        $('.close').hide()
        $('.lottery-win').fadeOut()
    })

    // 关闭页面
    // $('.lottery-zd').on('click',function () {
    //     WeixinJSBridge.call('closeWindow');
    // })

});


