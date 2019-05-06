
$(function() {
    var doc = $(document);
    // 找活动
    Func.findActivityByEncode(function (res) {
        if (res.code === 200 || res.code === 201) {
            $('#loadingWrapper').show();
            getShopUrl(function (res) {
                var url = res.data.url;
                Func.lottery(api.lottery,function (res) {
                    $('#loadingWrapper').hide();
                    if (res.code === 200) {
                        if (res.data.type == 1) {
                            var list = res.data.couponGrants;
                            Global.requestTempByAjax('/laonianrenshangcheng/temp/result.ejs', {list:list}, function(template) {
                                $('.coupon-wrapper').append(template);
                                $('.result-container').css({'background':'url(/laonianrenshangcheng/images/1/1_4.png) no-repeat'});
                                $('.result-container').fadeIn(function () {
                                    $('.coupon-user').attr('href',url);
                                    $('.coupon-wrapper').fadeIn();
                                    if (list.length > 2) {
                                        var scroll = new BScroll('#couponScroll',{
                                            click:true,
                                        });
                                    }
                                });

                            });
                        }

                    } else if (res.code === 201) {
                        $('.result-container').css({'background':'url(/laonianrenshangcheng/images/1/1_3.png) no-repeat'});
                        $('.result-container').fadeIn(function () {
                            var src = '/laonianrenshangcheng/images/1/1_6.png';
                            $('.noAward-tip').attr('src',src);
                            $('#shopBtn').attr('href',url);
                            $('.noAward-wrapper').fadeIn();
                        });

                    } else {
                        common.alert({
                            mask:true,
                            content:res.msg,
                        })
                    }
                });
            });

        } else if (res.code === 203) {
            getShopUrl(function (res) {
                var url = res.data.url;
                $('.result-container').css({'background':'url(/laonianrenshangcheng/images/1/1_3.png) no-repeat'});
                $('.result-container').fadeIn(function () {
                    var src = '/laonianrenshangcheng/images/1/1_1.png';
                    $('.noAward-tip').attr('src',src);
                    $('#shopBtn').attr('href',url);
                    $('.noAward-wrapper').fadeIn();
                });
            });

        } else {
            if (res.msg == '红包已被领取') {
                getShopUrl(function (res) {
                    var url = res.data.url;
                    $('.result-container').css({'background':'url(/laonianrenshangcheng/images/1/1_3.png) no-repeat'});
                    $('.result-container').fadeIn(function () {
                        var src = '/laonianrenshangcheng/images/1/1_1.png';
                        $('.noAward-tip').attr('src',src);
                        $('#shopBtn').attr('href',url);
                        $('.noAward-wrapper').fadeIn();
                    });
                });
            } else {
                common.alert({
                    mask:true,
                    content:res.msg,
                })
            }

        }
    });
});

// 获取商城url
function getShopUrl(callback) {
    $.ajax({
        url: api.getShopUrl,
        type: 'GET',
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200) {
                callback(res)
            } else {
                common.alert({
                    mask:true,
                    content:res.msg
                })
            }
        },
    });
}



