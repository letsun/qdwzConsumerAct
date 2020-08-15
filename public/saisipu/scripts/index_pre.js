$(function() {
    var rotate = 360;

    var perRotate = rotate / 6;
    var speed = 300; // 动画速度

    // 大转盘
    $('.js-dzpBtn').on('click', function() {

        var rand = 0;

        $('.js-dzpCon').css({
            'transition': 'transform 4s cubic-bezier(.35,.88,.33,1)',
            'transform': 'rotate(' + (360 * 4 + 30) + 'deg)'
        });

    });

    // 打开活动须知
    $('#rule-btn').on('click',function () {
        $('#activity-rule').fadeIn();
    });

    // 关闭活动须知
    $('#activity-rule-btn').on('click',function () {
        $('#activity-rule').fadeOut();
    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        setTimeout(function () {
            $('#result-win').fadeIn();
        },1000)

    });

    // 点击防伪查询
    $('.inquire-btn').on('click',function () {
        $('.gzh').fadeIn();
    });

    // 点击二维码
    $('.code').on('click',function (e) {
        e.stopPropagation();
    });

    // 关闭公众号弹窗
    $('.gzh').on('click',function () {
        $('.gzh').fadeOut();
    });

    // 提交查询
    $('.form-submit').on('click',function () {
        var num = $('#num').val();

        if ($.trim(num) == '') {
            common.alert({
                mask: true,
                content: '请输入数字验证码'
            })
        }
    });

    // 关闭验证失败
    $('.back-wra').on('click',function () {
        $('.error-win').hide();
    })
});





