// 没有类型
var NO_TYPE = 0; 

// 活动背景图类型
var IMAGE_TYPE = 1; 

// 活动外部链接类型
var URL_TYPE = 2;

var prizeAmount = '';
var lotteryId = '';
$(function() {

    var doc = $(document);
    var speed = 300; // 动画速度

    // 关闭
    doc.on('click', '.js-closeResultBtn', function() {
        $('.js-resultWrapper').fadeOut(speed);
    });

    // 开红包
    doc.on('click', '.js-openAwardBtn', function() {
        /*$('#loadingWrapper').show();*/
        Func.findActivityByEncode(function(res) {
            var data = res.data;
            wechatData = res.data;

            if (res.code === 200 || res.code === 201 || res.code === 206) {
                isopenFollowWechat = res.data.isopenFollowWechat;
                if (res.data.isopenFollowWechat) {

                    Func.isSubscribe(function(res1) {
                        if (res1.code === 200) {
                            if (!res1.data.subscribe) {
                                $('#loadingWrapper').hide();
                                $('#erweima').html('<img src="' + data.wechatLogo + '" />');
                                $('#erweimaWrapper').fadeIn();
                                $('#erweimaContainer').addClass('show');
                            } else {
                                Func.toLottery(url,function (res) {
                                    $('.js-awardWrapper').fadeOut(speed).removeClass('show');
                                    $('.js-resultWrapper').fadeIn(speed, function() {

                                    }).addClass('show');
                                    if (res.code == 200) {
                                        prizeAmount = res.data.redPack.prizeAmount;
                                        lotteryId = res.data.lotteryId;
                                        userCash(prizeAmount,lotteryId);
                                    }
                                });
                            }

                        } else {
                            common.alert({
                                content: res1.msg,
                                mask: true
                            });
                        }
                    });
                } else {
                    Func.toLottery(url,function (res) {
                        $('.js-awardWrapper').fadeOut(speed).removeClass('show');
                        $('.js-resultWrapper').fadeIn(speed, function() {

                        }).addClass('show');
                        if (res.code == 200) {
                            prizeAmount = res.data.redPack.prizeAmount;
                            lotteryId = res.data.lotteryId;
                            userCash(prizeAmount,lotteryId);
                        }
                    });
                }

            } else {
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }
        });
    });

    doc.on('click', '.js-closeResultBtn', function() {
        $('.js-resultWrapper').fadeOut(speed).removeClass('show');
        $('.js-dzpWrapper').fadeOut(speed);
        $('.js-awardWrapper').fadeOut(speed);
        $('.js-zjdWrapper').fadeOut(speed);
        $('#page1').fadeOut(speed);
    });


    doc.on('click', '#closeErweima-btn', function() {
        $('#erweimaWrapper').fadeOut();
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



