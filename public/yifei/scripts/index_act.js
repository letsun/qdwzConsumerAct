
var index = 0;
var prizeAmount;
var lotteryId;
var lotteryData = {};
var awardValue;
var isClick = true;
$(function () {

    // 关闭公众号弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 点击抽奖
    $('#container').on('click','.award-item',function () {
        if (!isClick) {
            $('#loadingWrapper').hide();
            common.alert({
                mask: true,
                content: '抽奖尚未结束，请稍候',
            });
            return false;
        }
        isClick = false;
        awardValue = $(this).find('.num').html();
        index = $(this).index();
        Func.findActivityByEncode(function (res) {
            if (res.code === 200 || res.code === 201) {
                Func.isSubscribe(function(res1) {
                    if (res1.code === 200) {
                        if (!res1.data.subscribe) {
                            isClick = true;
                            $('#loadingWrapper').hide();
                            $('#attent-win').fadeIn();
                        } else {
                            Func.lottery(api.lottery,function (reg) {
                                lotteryData = reg;
                                $('#loadingWrapper').hide();
                                $('.award-item').addClass('active');
                                if(lotteryData.code == 200) {
                                    prizeAmount = lotteryData.data.redPack.prizeAmount;
                                    if (lotteryData.data.lotteryId > 0) {
                                        lotteryId = lotteryData.data.lotteryId;
                                    }

                                    $('.award-item').each(function (i,item) {
                                        var value = $(item).find('.num').html();

                                        if (value == prizeAmount) {
                                            $(item).find('.num').html(awardValue);
                                        }
                                    })
                                }
                                setTimeout(function () {
                                    $('.award-item').addClass('lottActive');
                                },500);
                            })
                        }
                    } else {
                        isClick = true;
                        $('#loadingWrapper').hide();
                        common.alert({
                            content: res1.msg,
                            mask: true
                        });
                    }
                });

            } else {
                isClick = true;
                $('#loadingWrapper').hide();
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
    });

    // 监听动画结束
    $('#container').on('transitionend','.back-item', function() {
        isClick = true;
        $('.layer').show();
        $('.award-item').find('.layer-item').show();
        $('.award-item').eq(index).find('.layer-item').hide();
        $('.award-item').eq(index).find('.award-item-bg').show();
        if(lotteryData.code == 200) {
            $('.tips').show();
            prizeAmount = lotteryData.data.redPack.prizeAmount;
            if (lotteryData.data.lotteryId > 0) {
                lotteryId = lotteryData.data.lotteryId;
                $('.award-item').eq(index).find('.num').html(prizeAmount);
                $('.award-item').eq(index).find('.award-title').html('恭喜您获得');
                $('.award-item').find('.award-dec1').show();
                // userCash(prizeAmount,lotteryId);
            }

        } else if (lotteryData.code == 201) {
            $('.award-item').eq(index).find('.award-title').html('很遗憾');
            $('.award-item').eq(index).find('.award-dec2').show();
            $('.award-item').eq(index).siblings().find('.award-dec1').show();
        } else {
            $('#loadingWrapper').hide();
            common.alert({
                mask: true,
                content: res.msg,
            })
        }

    });

    // 开始活动
    Func.findActivityByEncode(function(res) {
        $('#loadingWrapper').hide();
        var prizes = res.data.prizes;
        var html = '';
        for (var i = 0, len = prizes.length; i < len; i++) {
            html += '<div class="award-item">';
            html += '<img class="positive-item" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifei/1_4.png">';
            html += '<div class="back-item">';
            html += '<div class="award-title"></div>';
            html += '<div class="award-dec award-dec1">';
            html += '<div class="amount"><span class="num">'+ prizes[i].amount +'</span>元</div>';
            html += '</div>';
            html += '<div class="award-dec award-dec2">';
            html += '<div class="amount">您未中奖</div>';
            html += '<img class="award-dec-img" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifei/1_6.png" alt="">';
            html += '</div>';
            html += '</div>';
            html += '<img class="award-item-bg" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifei/1_11.png" alt="">';
            html += '<div class="layer-item"></div>';
            html += '</div>';
        }
        $('.award-list').html(html);
        if (res.code === 200 || res.code === 201 || res.code === 206) {
        } else {
            common.alert({
                content: res.msg,
                mask: true
            });
        }
    });

    // 关闭二维码弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
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