$(function() {
    var NO_NOTICE = 0; // 未关注
    var NOTICED = 1; // 已关注

    var doc = $(document);
    var notice_type = NO_NOTICE; // 关注类型

    var speed = 300; // 动画速度

    // 点击抢红包
    doc.on('click', '#yyy-btn', function() {

        if (notice_type === NOTICED) {
            $('#notice-publicAccount').fadeIn(speed);
        } else {
            $('#yyy-wrapper').fadeIn(speed, function(){
             window.addEventListener('devicemotion', rock);
            });
        }

    });

    // 点击关闭二维码弹窗
    doc.on('click', '#close-btn', function() {
        $('#notice-publicAccount').fadeOut(speed);
    });
});

// 摇一摇
var rock = yyy(lottery);

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(res) {
    
    if (res.code === 200) {
        $('#con').html('恭喜获得红包<br />' + currency('￥', res.data.prizeAmount) + '元');
        userCash({
            amount: res.data.prizeAmount,
            cashType: 0,
            signature: res.data.signature
        });
    } else {
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

function lottery() {

    typePage(1);
}

