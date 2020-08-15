$(function () {
    var prizeAmount = '';
    var lotteryId = '';
    var dzpAwardItem = [];
    var rotate = 360;

    var perRotate = rotate / 6;
    var speed = 300; // 动画速度
    var isLottery = false;
    var isClick = true;
    var type;

    if (window.innerHeight <= 1230) {
        $('.verification-wra').css({'top': '190px'});
        $('.verification-dec').css({'margin': '-10px auto 0 auto'});
    }

    // 打开活动须知
    $('#rule-btn').on('click', function () {
        $('#activity-rule').fadeIn();
    });

    // 关闭活动须知
    $('.close-rule').on('click', function () {
        $('#activity-rule').fadeOut();
    });

    // 提交查询
    $('.form-submit').on('click',function () {
        var num = $('#num').val();

        if ($.trim(num) == '') {
            common.alert({
                mask: true,
                content: '请输入数字验证码'
            });

            return false;
        }

        $('#loadingWrapper').show();

        submitInfo(num,function (res) {
            $('#loadingWrapper').hide();
            if (res.code == 200) {
                if (res.data.checkStatus == 1) {
                    $('.form-win').hide();
                    $('.verification-dec').find('span').html(res.data.validateDate);
                    $('.verification-item1').show();
                    getPrize();
                } else if (res.data.checkStatus == 2) {
                    $('.form-win').hide();
                    $('.verification-dec').find('span').html(res.data.validateDate);
                    $('.verification-item2').show();
                    getPrize();
                } else if (res.data.checkStatus == 0) {
                    $('.error-win').fadeIn();
                } else {
                    $('.form-win').hide();
                    $('.verification-dec').find('span').html(res.data.validateDate);
                    $('.verification-item3').show();
                    getPrize();
                }
            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }

        });
    });

    // 关闭验证失败
    $('.back-wra').on('click',function () {
        $('.error-win').hide();
    });

    
    // 大转盘
    $('.js-dzpBtn').on('click', function () {
        if (isClick) {
            isClick = false;
            $('#loadingWrapper').show();
            createJoinActInfo(function (res) {
                if (res.code === 200 || res.code === 203) {
                    $('#loadingWrapper').show();
                    Func.lottery(api.lottery, function (reg) {
                        $('#loadingWrapper').hide();
                        var rand = 0;
                        for (var i = 0, len = dzpAwardItem.length; i < len; i++) {
                            if (dzpAwardItem[i].prizeId === reg.data.prizeId) {
                                rand = dzpAwardItem[i].prizeIndex;
                                break;
                            } else {
                                if (reg.code == 201) {
                                    if (dzpAwardItem[i].prizeName == '谢谢参与') {
                                        rand = dzpAwardItem[i].prizeIndex;
                                    }
                                }
                            }
                        }

                        var totalRotate = rotate * 4 + perRotate * (dzpAwardItem.length - rand) - perRotate / 2;

                        $('.js-dzpCon').css({
                            'transition': 'transform 4s cubic-bezier(.35,.88,.33,1)',
                            'transform': 'rotate(' + totalRotate + 'deg)'
                        });

                        if (reg.code == 200) {
                            if (reg.data.type == 0) {
                                prizeAmount = reg.data.redPack.prizeAmount;
                                lotteryId = reg.data.lotteryId;
                                $('.result-title').html('恭喜您获得');
                                $('.amount').html(prizeAmount);
                                $('.result-win').find('.result-dec').hide();
                                $('.result-win').find('.result-dec1').find('.result-name').html(reg.data.redPack.prizeName);
                                $('.result-win').find('.result-dec1').show();
                            }
                        } else if (reg.code == 201) {
                            $('.result-title').html('很遗憾您未中奖');
                            $('.result-win').find('.result-dec2').show();
                        } else {
                            common.alert({
                                mask: true,
                                content: reg.msg,
                            })
                        }
                    });
                } else if (res.code === 202) {
                    $('#loadingWrapper').hide();
                    isClick = true;
                    prizeAmount = res.data.prizeAmount;
                    lotteryId = res.data.lotteryId;
                    $('.result-title').html('恭喜您获得');
                    $('.amount').html(prizeAmount);
                    $('.result-win').find('.result-dec').hide();
                    $('.result-win').find('.result-dec1').find('.result-name').html(res.data.prizeName);
                    $('.result-win').find('.result-dec1').show();
                    $('.result-win').fadeIn();
                }  else if (res.code === 201) {
                    $('#loadingWrapper').hide();
                    isClick = true;
                    $('.result-title').html('对不起');
                    $('.result-win').find('.result-dec').hide();
                    $('.result-win').find('.result-dec3').show();
                    $('.result-win').fadeIn();
                } else {
                    isClick = true;
                    $('#loadingWrapper').hide();
                    common.alert({
                        mask: true,
                        content: res.msg,
                    })
                }
            })
        } else {
            common.alert({
                mask: true,
                content: '抽奖还未结束'
            })
        }
    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function () {
        setTimeout(function () {
            isClick = true;
            $('.result-win').fadeIn();
        }, 1000)
    });

    // 关闭中奖弹窗
    $('.close-result1').on('click',function () {
        userCash(prizeAmount, lotteryId);
        $('.result-win').fadeOut();
    });

    // 关闭中奖弹窗
    $('.close-result2').on('click',function () {
        $('.result-win').fadeOut();
    });

    // 提交验证码
    function submitInfo(validateCode,callback) {
        $.ajax({
            url: api.validate,
            type: 'GET',
            dataType: 'json',
            data: {
                validateCode: validateCode,
            },
            headers: getHeader(),
            success: function (res) {
                callback(res);
            },
            error: function (res) {

            }
        });
    }

    // 获取奖项
    function getPrize () {
        $.ajax({
            url: api.findActivityPrize,
            type: 'GET',
            dataType: 'json',
            headers: getHeader(),
            success: function (res) {
                if (res.code === 200) {
                    var data = res.data;
                    dzpAwardItem = data.prizes;
                    var perRotate = 360 / 6;
                    var itemRotate = 0;
                    var _html = '';

                    for (var i = 0, len = dzpAwardItem.length; i < len; i++) {

                        itemRotate = perRotate * i + (perRotate) / 2;

                        _html += '<li class="award-item" style="transform: translateX(-50%) rotate(' + itemRotate + 'deg)">';
                        _html += '<div class="con">';
                        _html += '<div class="prize-name">' + dzpAwardItem[i].prizeName + '</div>';
                        if (dzpAwardItem[i].prizeType == 0) {
                            _html += '<img class="prize-icon" style="width: 50px;" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/saisipu/4_4_1.png" alt="">';
                        } else {
                            _html += '<img class="prize-icon" style="width: 77px;" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/saisipu/4_4_2.png" alt="">';
                        }

                        _html += '</div>';
                        _html += '</li>';
                    }

                    $('#awardList').html(_html);
                    $('.dzp-wrapper').fadeIn();
                } else {
                    common.alert({
                        mask: true,
                        content: res.msg,
                    })
                }
            },
            error: function (res) {

            }
        });
    }

    // 创建参与记录
    function createJoinActInfo (callback) {
        $.ajax({
            url: api.createJoinActInfo,
            type: 'GET',
            dataType: 'json',
            headers: getHeader(),
            success: function (res) {
                callback(res);
            },
            error: function (res) {

            }
        });
    }
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
        success: function (res) {
            common.alert({
                mask: true,
                content: '领取成功',
            })
        },
        error: function (res) {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });
}