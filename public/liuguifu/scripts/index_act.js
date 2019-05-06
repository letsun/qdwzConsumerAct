var music = new Audio();

wx.config({
    debug: false,
    appId: '',
    timestamp: 1,
    nonceStr: '',
    signature: '',
    jsApiList: []
});

music.src = "https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/liuguifu/audio/music.mp3";
wx.ready(function() {
    music.play();
    music.pause();
});

$(function() {
    var doc = $(document);

    var speed = 300; // 动画速度

    // 点击抢红包
    doc.on('click', '.yyy-btn', function() {
        $(this).hide();

        //$('#loadingWrapper').show();
        //lottery();

        $('.yyy-mask').fadeIn(speed, function() {
            window.addEventListener('devicemotion', rock);
        });

        // lottery();

    });

    doc.on("click",".rule-btn",function() {
        $(".rule-mask").fadeIn();
    });

    $(".rule-mask").on("click",".close",function() {
        $(".rule-mask").fadeOut();
    });

    doc.on("click",".share-mask",function() {
        $(this).hide();
    });
});

// 摇一摇
var rock = yyy(lottery);

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(res) {

    if (res.code === 200) {
        if(res.data.prizeType == 0) {
            if (res.data.type == 0) {
                //$('.info-desc').addClass('descActive');
                $(".desc1").show();
                $('.desc1').find(".main-num").html(res.data.redPack.prizeAmount + '<span>元</span>');
            }
            if (res.data.type == 1) {
                //$('.info-desc').removeClass('descActive');
                $(".desc2").show();
                $('.desc2').find(".desc-num").html('￥' + '<span>' + res.data.couponGrants[0].couponPrice + '</span>');
                $('.desc2').find(".desc-warn").html(res.data.couponGrants[0].remark);
                $('.desc2').find(".desc-quan").html(res.data.couponGrants[0].couponCode);
            }
        }

        if(res.data.prizeType == 1) {
            if (res.data.type == 0) {
                $(".desc4").show();
                $(".desc4").find(".left-num1").show();
                $('.desc4').find(".desc-left .left-num").html(res.data.redPack.prizeAmount);
                $(".desc4").find(".desc-right .desc-num").html(res.data.couponGrants[0].couponPrice);
                $(".desc4").find(".desc-right .right-info").html(res.data.couponGrants[0].remark);
            }

            if (res.data.type == 1) {
                if(res.data.couponGrants.length <= 1) {
                    $(".desc2").show();
                    $('.desc2').find(".desc-num").html('￥' + '<span>' + res.data.couponGrants[0].couponPrice + '</span>');
                    $('.desc2').find(".desc-warn").html(res.data.couponGrants[0].remark);
                    $('.desc2').find(".desc-quan").html(res.data.couponGrants[0].couponCode);
                } else {
                    $(".desc4").show();
                    $(".desc4").find(".left-num2").show();
                    $('.desc4').find(".left-num2 .desc-num").html(res.data.couponGrants[1].couponPrice);
                    $('.desc4').find(".left-num2 .num-info").html(res.data.couponGrants[1].remark);

                    $(".desc4").find(".desc-right .desc-num").html(res.data.couponGrants[0].couponPrice);
                    $(".desc4").find(".desc-right .right-info").html(res.data.couponGrants[0].remark);
                }
            }
        }
    } else {
        $(".info-desc").find(".desc-tit").html("");
        $(".desc3").show();
        $(".desc3").find(".fail-text").html(res.msg);
        /*common.alert({
            content: res.msg,
            mask: true
        });*/
    }

    window.removeEventListener('devicemotion', rock);
    rock = null;

    $('#loadingWrapper').hide();
    $('.yyy-mask').fadeOut();
    $('.award-mask').fadeIn();

    setTimeout(function() {
        $(".share-mask").fadeIn();
    },2000);
}

function userCash(data) {

    $.ajax({
        type: 'GET',
        url: api.userCash,
        data: data,
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200) {

            } else {
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }
        }
    });
}

function lottery() {

    $('#loadingWrapper').show();

    $.ajax({
        type: 'GET',
        url: api.lottery,
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            typePage(res);
        }
    });
}