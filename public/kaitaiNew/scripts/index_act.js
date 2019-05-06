$(function() {
    var timer = null;
    var count = 0;
    var index = 0;
    var delay = 500;
    var isClick = true;
    var prizeAmount = '';
    var lotteryId = '';
    var lotteryData = '';
    var path = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/kaitai/';
    var adImgRound = parseInt(Math.random() * 7);
    var lotteryRound = parseInt(Math.random() * 8);
    var adImgList = [
        path + '3_1.png',
        path + '3_2.png',
        path + '3_3.png',
        path + '3_4.png',
        path + '3_5.png',
        path + '3_6.png',
        path + '3_7.png'
    ];

    var adTextList = [
        path + '3_9.png',
        path + '3_10.png',
        path + '3_11.png',
        path + '3_12.png',
        path + '3_13.png',
        path + '3_14.png',
        path + '3_15.png'
    ];

    // 输入框失去焦点兼容苹果系统
    $('input,textarea,select').on('blur',function(){
        setTimeout(function () {
            var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
            if (!hasFocus) {
                window.scroll(0,0);
            }
        },100);
    });

    // 点击验证按钮
    $('#form-submit').on('click',function () {
        var phone = $('#phone').val();
        var reg = /^1[0-9]{10}/;
        if ($.trim(phone) == '') {
            common.alert({
                mask:true,
                content: '请输入手机号码',
            });

            return false;
        }

        if (!reg.test(phone)) {
            common.alert({
                mask: true,
                content: '手机号码格式不正确'
            })

            return false;
        }

        Func.checkUserInfoExist({
            mobile: phone,
        },function (res) {
            $('#loadingWrapper').hide();
            $('#verific-win').hide();
            if (res.code == 200) {
                if (res.data.type == 0) {
                    $('#verificSucc-win').fadeIn(function () {
                        setTimeout(function () {
                            location.reload();
                        },500)

                    });
                } else {
                    $('.error-tips').html(res.data.msg);
                    $('#attent-win').fadeIn();
                }

            }
        })
    });

    // 点击抽奖
    $('#lottery-btn').on('click',function () {
        Func.checkUserInfoExist({
        },function (rem) {
            $('#loadingWrapper').hide();
            if (rem.code == 200) {
                var type = rem.data.type;
                if (type == 0) {
                    $('#loadingWrapper').show();
                    if (!isClick) {
                        $('#loadingWrapper').hide();
                        common.alert({
                            mask: true,
                            content: '抽奖尚未结束，请稍候',
                        });
                        return false;
                    }
                    isClick = false;
                    Func.findActivityByEncode(function (req) {
                        if (req.code === 200 || req.code === 201) {
                            $('#loadingWrapper').show();
                            Func.lottery(api.lottery,function (reg) {
                                $('#loadingWrapper').hide();
                                lotteryData = reg;
                                timer = setInterval(lottery, delay);
                            })

                        } else if (req.code === 203) {
                            isClick = true;
                            $('#loadingWrapper').hide();
                            $('#scan-win').fadeIn();
                        } else {
                            isClick = true;
                            $('#loadingWrapper').hide();
                            common.alert({
                                mask: true,
                                content: req.msg,
                            })
                        }
                    });
                } else {
                    $('#verific-win').fadeIn();
                }
            } else {
                common.alert({
                    mask:true,
                    content: res.msg,
                });
            }
        });
    });

    // 九宫格方法
    function lottery() {
        index = count % 8;
        $('.award-item').eq(index).addClass('active').siblings().removeClass('active');
        delay -= 130;
        if (delay <= 80) {
            delay = 80;
        }
        if (count >= 10) {
            delay += 130;
        }
        clearInterval(timer);
        timer = setInterval(lottery, delay);

        if (lotteryRound == 4) {
            lotteryRound = 3;
        }

        if (lotteryData.code == 201) {
            lotteryRound = 4;
        }
        count++;
        console.log('count' + count);
        if (count >= 8 && (count - 1) % 8 == lotteryRound) {
            console.log('index' + index);
            clearInterval(timer);
            setTimeout(function () {
                if(lotteryData.code == 200) {
                    prizeAmount = lotteryData.data.redPack.prizeAmount;
                    if (lotteryData.data.lotteryId > 0) {
                        lotteryId = lotteryData.data.lotteryId;
                    }
                    $('.amount').html(lotteryData.data.redPack.prizeAmount);
                    $('#result-win').find('.ad-title').attr('src',adImgList[adImgRound]);
                    $('#result-win').find('.ad-dec').attr('src',adTextList[adImgRound]);
                    $('#result-win').fadeIn(function () {
                        userCash(prizeAmount,lotteryId);
                    });
                } else if (lotteryData.code == 201) {
                    $('#notWon-win').fadeIn();
                } else {
                    common.alert({
                        mask: true,
                        content: lotteryData.msg,
                    })
                }
                isClick = true;
                count = 0;
                index = 0;
                delay = 500;
                // $('.award-item').removeClass('active');
            },1000);
        }
    }

    // 关闭关注二维码弹窗
    $('.close-attent').on('click',function () {
        $('.attent-win').fadeOut();
    });

    // 关闭验证成功弹窗
    $('#verificSucc-win').on('click',function () {
        $('#verificSucc-win').fadeOut();
    });


    // 关闭抽奖结果弹窗
    $('.close-result').on('click',function () {
        $('.result-win').fadeOut();
    });

    // 关闭未中奖弹窗
    $('.close-notWon').on('click',function () {
        $('.notWon-win').fadeOut();
    });

    // 关闭验证弹窗
    $('#close-verific').on('click',function () {
        $('#verific-win').fadeOut();
    });

    // 关闭该码已被扫弹窗
    $('.close-scan').on('click',function () {
        $('.scan-win').fadeOut();
    });

    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {

        } else if (res.code === 203) {
            $('#scan-win').fadeIn();
        } else {
            common.alert({
                mask: true,
                content: res.msg,
            })
        }
    });

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
