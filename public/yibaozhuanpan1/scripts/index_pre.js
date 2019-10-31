
$(function() {

    var rotate = 360;

    var perRotate = rotate / 8;
    var speed = 300; // 动画速度

    // 大转盘
    $('.js-dzpBtn').on('click', function() {
        var rand = 0;

        $('.js-dzpCon').css({
            '-webkit-transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
            'transform': 'rotateZ(' + -(360 * 4 + 67.5) + 'deg)',
        });

    });

    // 打开活动须知
    $('#rule-btn').on('click',function () {
        $('#activity-rule').fadeIn();
    });

    // 关闭活动须知
    $('.close-rule').on('click',function () {
        $('#activity-rule').fadeOut();
    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        setTimeout(function () {
            $('#result-win').fadeIn();
        },1000)

    });


    // 关闭中奖弹窗
    $('.close-result').on('click',function () {
        $('#result-win').fadeOut();
    })
});





