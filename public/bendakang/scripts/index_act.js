$(function() {
    var prizeAmount = '';
    var lotteryId = '';

    // 点击领红包
    $('#receive-btn').on('click', function() {
        $('#loadingWrapper').show();
        Func.isSubscribe(function(res1) {
            if (res1.code === 200) {
                if (!res1.data.subscribe) { //res1.data.subscribe
                    $('#loadingWrapper').hide();
                    $('#attent-win').fadeIn();
                } else {
                    Func.lottery(api.lottery,function (reg) {
                        $('#loadingWrapper').hide();
                        if(reg.code == 200) {
                            prizeAmount = reg.data.redPack.prizeAmount;
                            lotteryId = reg.data.lotteryId;
                            $('.result-title').html('恭喜您获得');
                            $('.dec').hide();
                            $('.dec1').show();
                            $('.dec1 .num').find('span').html(prizeAmount);
                            $('#result-conBg').show();
                            userCash(prizeAmount,lotteryId);
                        } else if (reg.code == 201) {
                            $('.result-title').html('很遗憾未中奖!');
                            $('.dec').hide();
                            $('.dec4').show();
                        }
                        $('.result-win').fadeIn();
                    });
                }
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    content: res1.msg,
                    mask: true
                });
            }
        });
    });


    /*Func.findActivityByEncode(function (res) {
        $('#loadingWrapper').hide();
        if (res.code === 200 || res.code === 201) {

        } else if (res.code === 203) {
            $('.result-title').html('很遗憾');
            $('.dec').hide();
            $('.dec5').show();
            findScanNum(function (req) {
                $('.scan-num').html(req.data.scanNum);
                $('.result-win').fadeIn();

            });
        } else {
            common.alert({
                mask: true,
                content: res.msg,
            })
        }
    });*/

    securityFunc(function (red) {
        createJoinActInfo(function (rep) {
            Func.findActivityByEncode(function (res) {
                if (res.code === 200 || res.code === 201) {
                    $('#loadingWrapper').hide();
                } else if (res.code === 203) {
                    $('#loadingWrapper').hide();
                    $('.result-title').html('很遗憾');
                    $('.dec').hide();
                    $('.dec5').show();
                    findScanNum(function (req) {
                        $('.scan-num').html(req.data.scanNum);
                        $('.result-win').fadeIn();
                    });

                } else {
                    $('#loadingWrapper').hide();
                    common.alert({
                        mask:true,
                        content: res.msg,
                    })
                }
            });
        })
    })

    // 点击关闭二维码弹窗
    $('#close-attent').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 关闭当前页面
    $('#result-confirm').on('click',function () {
        WeixinJSBridge.call('closeWindow');
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

/*创建参与记录*/
function createJoinActInfo(callback) {
    $.ajax({
        url: api.createJoinActInfo,
        type: 'GET',
        headers: getHeader(),
        success: function(res) {
            $('#loadingWrapper').hide();
            if (res.code === 200) {
                callback(res);
            } else if (res.code === 201 || res.code === 202) {
                $('#loadingWrapper').hide();
                $('.result-title').html('很遗憾');
                $('.dec').hide();
                $('.dec5').show();
                findScanNum(function (req) {
                    $('.scan-num').html(req.data.scanNum);
                    $('.result-win').fadeIn();
                });
            } else {
                $('.result-title').html('很遗憾');
                $('.dec').hide();
                $('.dec5').show().find('.dec-text').html('活动未开启');
                $('.result-win').fadeIn();
            }
        },
        error:function (res) {
            $('#loadingWrapper').hide();
            $('.result-title').html('很遗憾');
            $('.dec').hide();
            $('.dec5').show().find('.dec-text').html('活动未开启');
            $('.result-win').fadeIn();
        }
    });
}


/*真溯源*/
function securityFunc(callback) {
    $.ajax({
        url: api.findRealTracing,
        type: 'GET',
        headers: getHeader(),
        success: function(res) {
            $('#loadingWrapper').hide();
            if (res.code === 200) {
                var data = res.data;
                if (data.originRecord.length > 0) {
                   callback(res)
                } else {
                    $('.result-title').html('很遗憾');
                    $('.dec').hide();
                    $('.dec5').show().find('.dec-text').html('活动未开启');
                    $('.result-win').fadeIn();
                }

            } else {
                $('.result-title').html('很遗憾');
                $('.dec').hide();
                $('.dec5').show().find('.dec-text').html('活动未开启');
                $('.result-win').fadeIn();
            }
        },
        error:function (res) {
            $('#loadingWrapper').hide();
            $('.result-title').html('很遗憾');
            $('.dec').hide();
            $('.dec5').show().find('.dec-text').html('活动未开启');
            $('.result-win').fadeIn();
        }

    });
}


// 扫码次数查询
function findScanNum (callback) {
    $.ajax({
        url: api.findScanNum,
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200) {
                callback(res);
            } else {
                common.alert({
                    mask: true,
                    content: res.msg
                })
            }
        },
        error:function (res) {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });
}