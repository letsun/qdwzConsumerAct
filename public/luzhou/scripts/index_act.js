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

    // 大转盘
    $('.js-dzpBtn').on('click', function() {
        if (isClick) {
            isClick = false;
            $('#loadingWrapper').show();
            Func.findActivityByEncode(function (res) {
                var data = res.data;
                dzpAwardItem = data.prizes;
                if (res.code === 200 || res.code === 201) {
                    Func.lottery(api.lottery,function (reg) {
                        $('#loadingWrapper').hide();
                        var rand = 0;
                        for (var i = 0, len = dzpAwardItem.length; i < len; i++) {
                            if (dzpAwardItem[i].prizeId === reg.data.prizeId) {
                                if (dzpAwardItem[i].prizeIndex == 0) {
                                    rand = 1;
                                } else if (dzpAwardItem[i].prizeIndex == 1) {
                                    rand = 5;
                                }
                                break;
                            }
                        }

                        if (reg.code == 201) {
                            rand = 2;
                        }

                        var totalRotate = rotate * 4 + perRotate * rand - 22.5;

                        $('.js-dzpCon').css({
                            'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
                            'transform': 'rotate(' + (-totalRotate) + 'deg)'
                        });

                        if(reg.code == 200) {
                            isLottery = true;
                            prizeAmount = reg.data.redPack.prizeAmount;
                            lotteryId = reg.data.lotteryId;
                            $('.result-title').attr('src', src + '2_1.png').css('display','block');
                            if (rand == 1) {
                                $(".result-dec1").find('.result-img').attr('src', src+ '2_2.png').css('display','block');
                            } else if (rand == 5) {
                                $(".result-dec1").find('.result-img').attr('src',src+ '2_3.png').css('display','block');
                            }
                            $(".result-dec1").show().find(".num").html(reg.data.redPack.prizeAmount);
                        } else if (reg.code == 201) {
                            isLottery = false;
                            $('.result-title').attr('src', src + '3_1.jpg').css('display','block');
                            $('.result-tips').attr('src', src + '3_2.png').css('display','block');
                            $('.result-dec2').show().find('.result-text').html('您未中奖');
                        } else {
                            common.alert({
                                mask: true,
                                content: res.msg,
                            })
                        }
                    });
                } else {
                    isClick = true;
                    $('#scan-win').fadeIn();
                }
            });
        } else {
            common.alert({
                mask: true,
                content: '抽奖还未结束'
            })
        }
    });

    // 关闭已被扫弹窗
    $('#close-scan').on('click',function () {
        $('#scan-win').fadeOut();
    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        setTimeout(function () {
            if (isLottery) {
                $('#result-win').fadeIn(function () {
                    userCash(prizeAmount,lotteryId);
                });
            } else {
                $('#result-win').fadeIn();
            }
            isClick = true;
        },1000)

    });

    Func.findActivityByEncode(function (res) {
        if (res.code === 200 || res.code === 201) {
            var data = res.data;
            dzpAwardItem = data.prizes;
            var dzpAwardItems = ['谢谢参与', '一等奖', '二等奖', '幸运奖', '三等奖','四等奖','五等奖','六等奖'];

            var perRotate = 360 / dzpAwardItems.length;
            var itemRotate = 0;
            var _html = '';

            for (var i = 0, len = dzpAwardItems.length; i < len; i++) {

                itemRotate = perRotate * i - (perRotate) / 2;

                _html += '<li class="award-item" style="transform: translateX(-50%) rotate(' + itemRotate + 'deg)">';

                _html += '<div class="con"></div>';
                _html += '</li>';
            }

            $('#awardList').html(_html);
        } else {
            isClick = true;
            $('.dzp-wrapper').hide();
            $('#scan-win').fadeIn();
        }
    });

    // 点击关闭
    $('#close-win').on('click',function () {
        $('#result-win').hide();
        $('.js-dzpWrapper').fadeIn();
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



