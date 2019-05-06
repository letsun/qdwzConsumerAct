$(function() {
    var NO_NOTICE = 0; // 未关注
    var NOTICED = 1; // 已关注

    var doc = $(document);
    var notice_type = NO_NOTICE; // 关注类型

    var speed = 300; // 动画速度

    // 点击抢红包
    doc.on('click', '#yyy-btn', function() {

        $('#loadingWrapper').show();

        $.ajax({
            url: api.isSubscribe,
            type: 'GET',
            headers: getHeader(),
            dataType: 'json',
            success: function(res) {

                if (res.code === 200) {
                    var data = res.data;

                    if (data.subscribe) {
                        $('#yyy-wrapper').fadeIn(speed, function() {
                            window.addEventListener('devicemotion', rock);
                        });
                    } else {
                        $('#notice-publicAccount').fadeIn(speed);
                    }
                } else {
                    common.alert({
                        content: res.msg,
                        mask: true
                    });
                }

                $('#loadingWrapper').hide();
            }
        });

    });

    // 点击关闭二维码弹窗
    doc.on('click', '#close-btn', function() {
        $('#notice-publicAccount').fadeOut(speed);
    });

    // doc.on('click', '#yyy-wrapper', function() {
    //     lottery();
    // });
});

// 摇一摇
var rock = yyy(lottery);

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(res) {

    if (res.code === 200) {
        $('#con').html('恭喜获得红包<br />' + currency('￥', res.data.redPack.prizeAmount) + '元');
        userCash({
            amount: res.data.redPack.prizeAmount,
            cashType: 0,
            signature: res.data.signature
        });
    } else {

        common.alert({
            content: res.msg,
            mask: true
        });

        $('#con').html(res.msg);
    }

    window.removeEventListener('devicemotion', rock);
    rock = null;

    $('#loadingWrapper').hide();
    $('#yyy-wrapper').fadeOut();
    $('#yyy-btn').fadeOut();
    $('#toPersonBtn').fadeIn();
    $('#result').fadeIn();

}

function findActivityByEncode() {
    $.ajax({
        type: 'GET',
        url: api.findActivityByEncode,
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            $('#loadingWrapper').hide();

            if (res.code === 203 || res.code === 204 || res.code === 500) {
                $('#result').show();
                $('#con').show();

                if (res.code === 203) {
                    $('#con').html('该码已经被扫!');
                } else if (res.code === 204) {
                    $('#con').html('没有找到参与活动!');
                } else if (res.code === 500) {
                    $('#con').html('系统异常!');
                }
                
            } else if (res.code === 201 || res.code === 200) {
                $('#result').hide();
                $('#yyy-btn').show();
                $('#erweima').show();
                $('#tip').show();
                $('#con').show();

            } else {
                $('#result').hide();
                $('#yyy-btn').show();
                $('#erweima').show();
                $('#tip').show();
                $('#con').show();

                common.alert({
                    content: res.msg,
                    mask: true
                });
            }

        }
    });
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