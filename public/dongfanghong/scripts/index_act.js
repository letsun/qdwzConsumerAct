
$(function() {
    var doc = $(document);

    // 找活动
    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {

        } else if (res.code === 203) {
            $('#result-win').find('.result-title').html('很遗憾');
            $('#result-win').find('.result-tips').html('——&nbsp;该码已被扫&nbsp;——');
            $('#result-win').find('.result-text').html('');
            $('#result-win').find('.result-cry').show();
            $('#result-win').fadeIn();
        } else {
            common.alert({
                mask:true,
                content:res.msg
            })
        }
    });

    // 点击开奖按钮
    doc.on('click','#lotteryBtn',function () {
        $('#loadingWrapper').show();
        Func.lottery(api.lottery,function (res) {
            $('#loadingWrapper').hide();
            if (res.code === 200) {
                if (res.data.type == 0) {
                    $('#result-win').find('.result-title').html('现金红包');
                    $('#result-win').find('.result-tips').html('——&nbsp;恭喜您获得&nbsp;——');
                    $('#result-win').find('.result-text').html(res.data.redPack.prizeAmount + '<span>元</span>');
                    $('#result-win').find('.result-cry').hide();
                    $('#result-win').find('.zhu').show();
                    $('#result-win').find('#goWinning').show();
                    $('#result-win').fadeIn(function () {
                        userCash(res.data.redPack.prizeAmount,res.data.lotteryId);
                    });
                } else if (res.data.type == 4) {
                    var originId = res.data.advOrigin.originId;
                    var src = res.data.advOrigin.imgUrl;
                    var href = res.data.advOrigin.openOriginUrl;
                    if (originId == 1) {
                        $('#result-win').find('.result-title').html('京东优惠券');
                    } else if (originId == 2) {
                        $('#result-win').find('.result-title').html('天猫优惠券');
                    } else if (originId == 3) {
                        $('#result-win').find('.result-title').html('爱奇艺VIP券');
                    } else if (originId == 4) {
                        $('#result-win').find('.result-title').html('移动流量券');
                    }

                    $('#result-win').find('.result-tips').html('——&nbsp;恭喜您获得&nbsp;——');
                    $('#result-win').find('.result-text').hide();
                    $('#result-win').find('.result-img').show().find('a').attr('href',href);
                    $('#result-win').find('.result-img').show().find('img').attr('src',src);
                    $('#result-win').find('.result-cry').hide();
                    $('#result-win').find('#goWinning').show();
                    $('#result-win').fadeIn();
                }

            } else if (res.code === 201) {
                $('#result-win').find('.result-title').html('很遗憾');
                $('#result-win').find('.result-tips').html('——&nbsp;您未中奖&nbsp;——');
                $('#result-win').find('.result-text').hide();
                $('#result-win').find('.result-cry').show();
                $('#result-win').find('#goWinning').hide();
                $('#result-win').fadeIn();
            } else {
                $('#result-win').find('.result-title').html('很遗憾');
                $('#result-win').find('.result-tips').html('——&nbsp;该码已被扫&nbsp;——');
                $('#result-win').find('.result-text').html('');
                $('#result-win').find('.result-cry').show();
                $('#result-win').fadeIn();
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

        },
        error:function (res) {
            common.alert({
                mask:true,
                content:res.msg
            })
        }

    });
}



