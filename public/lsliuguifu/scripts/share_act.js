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

    });

    doc.on("click",".rule-btn",function() {
        $(".rule-mask").fadeIn();
    });

    $(".rule-mask").on("click",".close",function() {
        $(".rule-mask").fadeOut();
    });
});

// 摇一摇
var rock = yyy(lottery);

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(res) {

    if (res.code === 200) {
        if(res.data.type == 0) {
            $(".desc1").show();
            $('.desc1').find(".main-num").html(res.data.redPack.prizeAmount + '<span>元</span>');
        }
        if(res.data.type == 1) {
            $(".desc2").show();
            $('.desc2').find(".desc-num").html('￥'+ '<span>' + res.data.couponGrants[0].couponPrice + '</span>');
            $('.desc2').find(".desc-warn").html(res.data.couponGrants[0].remark);
            $('.desc2').find(".desc-quan").html(res.data.couponGrants[0].couponCode);
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
        url: api.fissionActLottery,
        type: 'GET',
        headers: getHeader(),
        dataType: 'json',
        success: function(res) {
           typePage(res);
            $('#loadingWrapper').hide();
        }
    });
}