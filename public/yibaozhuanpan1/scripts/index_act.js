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

    // 打开活动须知
    $('#rule-btn').on('click',function () {
        $('#activity-rule').fadeIn();
    });

    // 关闭活动须知
    $('#activity-rule-btn').on('click',function () {
        $('#activity-rule').fadeOut();
    });

    // 关闭中奖弹窗
    $('.close-result').on('click',function () {
        $('#result-win').fadeOut();
    });

    // 大转盘
    $('.js-dzpBtn').on('click', function() {
        if (isClick) {
            isClick = false;
            $('#loadingWrapper').show();
            Func.findActivityByEncode(function (res) {
                var data = res.data;
                dzpAwardItem = data.prizes;
                if (res.code === 200 || res.code === 201) {
                    $('#loadingWrapper').show();
                    Func.lottery(api.lottery,function (reg) {
                        $('#loadingWrapper').hide();
                        var rand = 0;
                        for (var i = 0, len = dzpAwardItem.length; i < len; i++) {
                            if (dzpAwardItem[i].prizeId === reg.data.prizeId) {
                                rand = dzpAwardItem[i].prizeIndex;
                                break;
                            }
                        }

                        var totalRotate = rotate * 4 + perRotate * rand + 22.5;

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
                                $('.result-title').html('现金红包');
                                $('.amount').html(prizeAmount);
                                $('.result-dec').hide();
                                $('.result-dec1').show();
                            }
                        } else {
                            isLottery = false;
                            common.alert({
                                mask: true,
                                content: res.msg,
                            })
                        }
                    });
                } else if (res.code === 203) {
                    $('#loadingWrapper').hide();
                    isClick = true;
                    $('.result-title').html('很遗憾,该码已被扫');
                    $('.result-dec').hide();
                    $('.result-dec3').show();
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
        } else {
            common.alert({
                mask: true,
                content: '抽奖还未结束'
            })
        }
    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        $('.remaining-wra').find('.remaining-text').find('span').html(0);
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
        isClick = true;
        if (res.code === 200 || res.code === 201) {
            var data = res.data;
            dzpAwardItem = data.prizes;
            var perRotate = 360 / 8;
            var itemRotate = 0;
            var _html = '';

            for (var i = 0, len = dzpAwardItem.length; i < len; i++) {

                itemRotate = perRotate * i - (perRotate) / 2;

                _html += '<li class="award-item" style="transform: translateX(-50%) rotate(' + itemRotate + 'deg)">';

                _html += '<div class="con"></div>';
                _html += '</li>';
            }

            $('#awardList').html(_html);
            $('.remaining-wra').find('.remaining-text').find('span').html(1);
            $('.remaining-wra').show();
        } else if (res.code === 203) {
            $('.result-title').html('很遗憾,该码已被扫');
            $('.result-dec').hide();
            $('.result-dec3').show();
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


// 企业中奖用户
function companyLotteryRecord() {
    $.ajax({
        url: api.companyLotteryRecord,
        type: 'GET',
        dataType: 'json',
        data:{
            prizeType: 0,
            prizeAmount: 1,
            limit:5
        },
        headers: getHeader(),
        success: function(res) {
            $('#loadingWrapper').hide();
            var lotteryRecordLists = res.data.lotteryRecordList;

            var html ='';
            for (const lotteryRecordList of lotteryRecordLists) {

                html += `<div class="swiper-slide">`;
                html += `<div class="item-text">`;
                html += `<div>恭喜${lotteryRecordList.nickname}</div>`;
                html += `<div>抽中${lotteryRecordList.prizeAmount}元红包</div>`;
                html += `</div>`;
                html += `</div>`;
            }

            $('.swiper-wrapper').html(html);
            swipers();
        },
        error:function (res) {
            common.alert({
                mask:true,
                content:res.msgc 
            })
        }
    });
};

function swipers(){
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        loop: true,				//是否无缝轮播
        autoplay: 2000,		//轮播时间
        direction: 'vertical',//改变轮播图方向,
        simulateTouch: false,//禁止滑动
    });
}