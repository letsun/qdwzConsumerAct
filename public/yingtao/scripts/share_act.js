$(function() {

    var doc = $(document);

    var speed = 300; // 动画速度

    // 点击抢红包
    doc.on('click', '#yyy-btn', function() {

        Func.isSubscribe(function(res) {
            if (res.data.subscribe) {
                $('#yyy-wrapper').fadeIn(speed, function(){
                    window.addEventListener('devicemotion', rock);
                });
            } else {
                $('#notice-publicAccount').fadeIn(speed);
            }
        });
    });

    // 点击关闭二维码弹窗
    doc.on('click', '#close-btn', function() {
        $('#notice-publicAccount').fadeOut(speed);
    });

    doc.on('click', '#shareBtn', function() {
        $('#share').fadeIn();
    });
    doc.on('click', '#share', function() {
        $('#share').fadeOut();
    });

    doc.on('click', '#toWithdraw', function() {
        window.location.href = '/withdraw';
    });

    doc.on('click', '#yyy-wrapper', function() {
        Func.fissionActLottery(function(res) {
            typePage(res);
        });
    });
});

// 摇一摇
var rock = yyy(function() {
    Func.fissionActLottery(function(res) {
        typePage(res);
    });
});

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(res) {
    var data = res.data;

    if (data.prizeType === 0) {
        $('#con').html('恭喜获得红包<br />' + currency('￥', data.prizeAmount) + '元');
    } else {
        $('#con').html('很遗憾，没中奖~');
    }

    window.removeEventListener('devicemotion', rock);
    rock = null;

    $('#page1_content').fadeOut();
    $('#yyy-wrapper').fadeOut();
    $('#yyy-btn').fadeOut();
    $('#result').fadeIn();

    
}

