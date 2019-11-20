$(function () {

    var prizeAmount = '';
    var lotteryId = '';
    var dzpAwardItem = [];
    var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/luzhoulaojiao/';
    var rotate = 360;

    var perRotate = rotate / 6;
    var speed = 300; // 动画速度
    var isLottery = false;
    var isClick = true;
    var type = '';

    var height = $(document).height();
    $('body').css({ 'height': height + 'px' });


    // 打开活动须知
    $('.rules').on('click', function () {
        $('.rulesmask').fadeIn();
    });

    // 关闭活动须知
    $('.rulesmask-btn img').on('click', function () {
        $('.rulesmask').fadeOut();
    });

    //关闭关注公众号
    $('.gzhmask-btn').on('click', function () {
        $('.gzhmask').hide()
    })

    //关闭奖项弹窗
    $('.btn').on('click', function () {
        isClick = true;
        $('.mask-item').fadeOut()
        $('.mask').hide()
    })

    $('.con-btn img').on('click', function () {
        var res = Global.initValidate('.container');
        if (!res) {
            return;
        }
    })

    // 大转盘
    $('.js-dzpBtn').on('click', function () {

        if (isClick) {
            isClick = false;

            Func.findActivityByEncode(function (res) {
                var data = res.data;
                dzpAwardItem = data.prizes;
                if (res.code === 200 || res.code === 201) {
                    $('#loadingWrapper').show();
                    Func.lottery({
                        fromwhere: 'anniuxi',
                    }, function (reg) {
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

                        var totalRotate = rotate * 4 + perRotate * rand - 30;


                        if (reg.data.prizeId != 0) {
                            $('.js-dzpCon').css({
                                'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
                                'transform': 'rotate(' + (-totalRotate) + 'deg)'
                            });
                        } else {
                            $('.js-dzpCon').css({
                                'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
                                'transform': 'rotate(' + (1890) + 'deg)'
                            });
                        }


                        if (reg.code == 200) {


                            isLottery = true;
                            type = reg.data.type;
                            lotteryId = reg.data.lotteryId;

                            if (reg.data.type == 0) {
                                prizeAmount = reg.data.redPack.prizeAmount;

                                $('.mask-num').html(prizeAmount);
                                $('.mask-con1').fadeIn()
                            } else if (reg.data.type == 2) {
                                if (rand == 1) {
                                    $('.mask-con2').fadeIn();
                                } else if (rand == 2) {
                                    $('.mask-con3').show();
                                } else if (rand == 3) {
                                    $('.mask-con4').show();
                                } else if (rand == 4) {
                                    $('.mask-con5').show();
                                }
                            }
                        } else if (reg.code == 201) {
                            $('.mask-con7').fadeIn()
                        } else {
                            isLottery = false;
                            common.alert({
                                mask: true,
                                content: res.msg,
                            })
                        }
                    });
                } else if (res.code == 202) {
                    lotteryId = res.data.lotteryRecordId;
                    if (res.data.prizeType == 2) {
                        if (res.data.alreadyExistAddr == false) {
                            $('.mask').show();
                            $('.mask-con6').show()
                        } else {
                            $('.mask').show();
                            $('.mask-con8').show()
                        }
                    }
                } else if (res.code === 203) {
                    $('#loadingWrapper').hide();
                    isClick = true;
                    $('.mask').show();
                    $('.mask-con8').fadeIn()
                } else {
                    isClick = true;
                    $('#loadingWrapper').hide();
                    common.alert({
                        mask: true,
                        content: res.msg,
                    })
                }
            });
        } else {
            common.alert({
                mask: true,
                content: '抽奖还未结束'
            })
        }



    })




    Func.findActivityByEncode(function (res) {

        isClick = true;
        if (res.code === 200 || res.code === 201) {
            var data = res.data;
            dzpAwardItem = data.prizes;
            var perRotate = 360 / 8;
            var itemRotate = 0;
            var _html = '';

            for (var i = 0, len = dzpAwardItem.length; i < len; i++) {

                itemRotate = perRotate * i - (perRotate) / 2;

                // _html += '<li class="award-item" style="transform: translateX(-50%) rotate(' + itemRotate + 'deg)">';

                // _html += '<div class="con">' + dzpAwardItem[i].prizeName + '</div>';
                // _html += '</li>';
            }

            // $('#awardList').html(_html);
        } else if (res.code === 202) {
            lotteryId = res.data.lotteryRecordId;
            if (res.data.prizeType == 2) {
                if (res.data.alreadyExistAddr == false) {
                    $('.mask').show();
                    $('.mask-con6').show()
                } else {
                    $('.mask').show();
                    $('.mask-con8').show()
                }
            }


        } else if (res.code === 203) {
            $('.mask').show();
            $('.mask-con8').fadeIn()
        } else {
            common.alert({
                mask: true,
                content: res.msg,
            })
        }
    });


    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function () {

        setTimeout(function () {
            $('.mask').fadeIn();

            if (type == 0) {
                userCash(prizeAmount, lotteryId);
            }
        }, 1000)

    });




    //点击红包我知道了swbtn
    $('.hbbtn').on('click', function () {


        Func.isSubscribe(function (res) {
            if (!res.data.subscribe) {
                $('.gzhmask').show();
                $('#loadingWrapper').hide();
            } else {
                $('#loadingWrapper').hide();
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }
        })
    })

    $('.swbtn').on('click', function () {
        $('.mask-item').hide();
        $('.mask').show();
        $('.mask-con6').show()
    })


    //点击提交信息
    $('.subbtn').on('click', function () {

        var res = Global.initValidate('.container');
        var receiveName = $('#receiveName').val();
        var receivePhone = $('#receivePhone').val()
        var receiveAddress = $('#receiveAddress').val()
        var buyFrom = $('#buyFrom').val()
        var mendianName = $('#mendianName').val();
        var receiveProvince = $('#province').val()
        var receiveCity = $('#city').val()
        var receiveArea = $('#area').val()

        console.log(buyFrom)
        if (!res) {
            return;
        } else {
            Func.saveEntityObjRewardAddr({
                lotteryRecordId: lotteryId,//2198161
                receivePhone: receivePhone,
                receiveName: receiveName,
                receiveProvince: receiveProvince,
                receiveCity: receiveCity,
                receiveArea: receiveArea,
                receiveAddress: receiveAddress,
                buyFrom: buyFrom,
                mendianName: mendianName
            }, function (res) {
                if (res.code == 200) {
                    $('.mask-item').hide();
                    $('.mask').hide();
                }
            })
        }
    })
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

        },
        error: function (res) {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });
}




