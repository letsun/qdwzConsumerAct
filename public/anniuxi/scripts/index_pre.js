$(function () {
    var rotate = 360;

    var perRotate = rotate / 6;
    var speed = 300; // 动画速度

    // 大转盘
    $('.js-dzpBtn').on('click', function () {
        var rand = 0;
        $('.js-dzpCon').css({
            'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
            'transform': 'rotate(' + -(360 * 4 + 90) + 'deg)'
        });

    });


    // 打开活动规格
    $('.rules').on('click', function () {
        $('.rulesmask').show()
    })

    $('.rulesmask-btn').on('click', function () {
        $('.rulesmask').hide()
    })

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function () {
        setTimeout(function () {
            $('.mask').show();
            $('.mask-con1').show()
        }, 1000)

    });

    //点击我知道了关闭弹窗
    $('.mask-btn').on('click', function () {
        $('.mask').hide();
        $('.mask-item').hide()
    })
});





