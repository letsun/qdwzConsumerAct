$(function() {
    var prizeAmount = '';
    var lotteryId = '';
    var dzpAwardItem = [];
    var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/luzhoulaojiao/';
    var rotate = 360;

    var perRotate = rotate / 8;
    var speed = 300; // 动画速度
    var isLottery = false;
    var isClick = true;
    var type;

    // 关闭公众号弹窗
    $('#close-attent').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 关闭中奖结果弹窗
    $('#result-confirm1').on('click',function () {
        $('#result-win').fadeOut();
    });

    Func.getShopUrl({
        type: 1,
    },function (res) {
        $('#loadingWrapper').hide();
        if (res.code == 200) {
            $('#result-confirm2').attr('href',res.data.url);
        }
    });

    // 点击跳转商城;
    $('#result-confirm2').on('click',function () {
        //
    });

    // 点击大转盘
    $('.js-dzpBtn').on('click', function() {
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
        Func.findActivityByEncode(function (res) {

            if (res.code === 200 || res.code === 201) {
                $('#loadingWrapper').show();
                Func.lottery(api.lottery,function (reg) {
                    $('#loadingWrapper').hide();
                    var rand = 0;
                    if (reg.code == 200 || reg.code == 201) {
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
                    }

                    var totalRotate = rotate * 4 + perRotate * rand - 22.5;

                    $('.js-dzpCon').css({
                        'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
                        'transform': 'rotate(' + (-totalRotate) + 'deg)'
                    });

                    if(reg.code == 200) {
                        isLottery = true;
                        type = reg.data.type;
                        if (reg.data.type == 0) {
                            prizeAmount = reg.data.redPack.prizeAmount;
                            lotteryId = reg.data.lotteryId;
                            $('.result-title').html('恭喜您获得');
                            $('.dec').hide();
                            $('.dec1').show();
                            $('.result-confirm').hide();
                            $('#result-confirm1').show();
                            $('.dec1 .num').find('span').html(prizeAmount);
                        } else if (reg.data.type == 3) {
                            $('.result-title').html('恭喜您获得');
                            $('.dec').hide();
                            $('.dec2').show();
                            $('.result-confirm').hide();
                            $('#result-confirm2').show();
                            $('.dec2 .num').find('span').html(reg.data.point.point);
                        } else if (reg.data.type == 4) {
                            var originId = reg.data.advOrigin.originId;
                            var src = reg.data.advOrigin.imgUrl;
                            var href = reg.data.advOrigin.openOriginUrl;
                            $('.result-title').html('恭喜您获得');
                            $('.coupon').find('img').attr('src',src);
                            $('.coupon').attr('href',href);
                            if (originId == 2) {
                                $('.coupon').find('img').css({'display':'block','width': '250px','margin': '0 auto'});
                            }
                            $('.dec').hide();
                            $('.dec3').show();
                            $('.result-confirm').hide();
                            $('#result-confirm1').show();
                        }
                    } else if (reg.code == 201) {
                        isLottery = false;
                        $('.result-title').html('很遗憾');
                        $('.dec').hide();
                        $('.dec4').show();
                        $('.result-confirm').hide();
                        $('#result-confirm1').show();
                    }
                });

            } else if (res.code === 203) {
                isClick = true;
                $('#loadingWrapper').hide();
                $('.result-title').html('很遗憾');
                $('.dec').hide();
                $('.dec5').show();
                $('.result-confirm').hide();
                $('#result-confirm1').show();
                $('.result-win').fadeIn();
            } else {
                isClick = true;
                $('#loadingWrapper').hide();
                common.alert({
                    mask:true,
                    content: res.msg,
                })
            }
        });
    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        setTimeout(function () {
            if (isLottery) {
                if (type == 0) {
                    userCash(prizeAmount,lotteryId);
                }
                $('#result-win').fadeIn();
            } else {
                $('#result-win').fadeIn();
            }
            isClick = true;
        },1000)

    });

    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        var data = res.data;
        if (JSON.stringify(data) != '{}') {
            dzpAwardItem = data.prizes;
            var perRotate = 360 / 8;
            var itemRotate = 0;
            var _html = '';

            for (var i = 0, len = dzpAwardItem.length; i < len; i++) {

                itemRotate = perRotate * i - (perRotate) / 2;

                _html += '<li class="award-item" style="transform: translateX(-50%) rotate(' + itemRotate + 'deg)">';

                _html += '<div class="con">' + dzpAwardItem[i].prizeName + '</div>';
                _html += '</li>';
            }

            $('#awardList').html(_html);
        }

        if (res.code === 200 || res.code === 201) {

        } else if (res.code === 203) {
            $('.result-title').html('很遗憾');
            $('.dec').hide();
            $('.dec5').show();
            $('.result-confirm').hide();
            $('#result-confirm1').show();
            $('.result-win').fadeIn();
        } else {
            common.alert({
                mask:true,
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
                content:res.msg
            })
        }
    });
}