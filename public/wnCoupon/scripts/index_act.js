var intDiff = 59;//验证码倒计时总秒数量
var backInterval;
var prizeId;
$(function () {
    // 输入框失去焦点兼容苹果系统
    $('#container').on('blur','input,textarea,select',function(){
        setTimeout(function () {
            var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
            if (!hasFocus) {
                window.scroll(0,0);
            }
        },100);
    });


    // 点击开红包
    $('.redPack-btn').on('click',function () {
        Func.findActivityByEncode(function (res) {
            if (res.code === 200 || res.code === 201) {
                Func.isSubscribe(function (res1) {
                    if (res1.code === 200) {
                        if (!res1.data.subscribe) { //!res1.data.subscribe
                            $('#loadingWrapper').hide();
                            $('#attent-win').fadeIn();
                        } else {
                            Func.lottery(api.lottery,function (reg) {
                                $('#loadingWrapper').hide();
                                if(reg.code == 200) {
                                    prizeId = reg.data.prizeId;
                                    if (reg.data.type == 1) {
                                        var couponGrants = reg.data.couponGrants;
                                        if (couponGrants.length > 0) {
                                            $('#redPack-win').hide();
                                            $('.coupon-title2').hide();
                                            $('.coupon-title').show();
                                            $('.coupon-amount').find('span').html(couponGrants[0].couponPrice);
                                            $('#coupon-win').fadeIn();
                                            getCoupon(prizeId);
                                        }
                                    }

                                } else if (reg.code == 201) {
                                    $('#redPack-win').hide();
                                    $('.coupon-title').hide();
                                    $('.coupon-title2').show();
                                    $('.coupon-amount').html('未中奖！');
                                    $('#coupon-win').fadeIn();
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
                $('#redPack-win').hide();
                $('.coupon-title').hide();
                $('.coupon-title2').show();
                $('.coupon-amount').html('该红包已被领取！');
                $('#coupon-win').fadeIn();
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    mask: true,
                    content: res.msg,
                })
            }
        });
    });
    
    
    // 关闭优惠券弹窗
    $('.close-coupon').on('click',function () {
        $('#coupon-win').fadeOut();
    });


    // 关闭公众号弹窗
    $('.attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });


    Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {

        } else if (res.code === 203) {
            $('#redPack-win').hide();
            $('.coupon-title').hide();
            $('.coupon-title2').show();
            $('.coupon-amount').html('该红包已被领取！');
            $('#coupon-win').fadeIn();
        } else {
            common.alert({
                mask:true,
                content: res.msg,
            })
        }
    });

});

//
function getCoupon(prizeId) {
    $.ajax({
        url: api.coupon,
        type: 'POST',
        dataType: 'json',
        data:{
            prizeId: prizeId,
        },
        headers: getHeader(),
        success: function(res) {

        },
        error:function (res) {

        }

    });
}