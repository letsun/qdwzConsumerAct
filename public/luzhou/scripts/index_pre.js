$(function() {
    var rotate = 360;

    var perRotate = rotate / 8;
    var speed = 300; // 动画速度

    // 大转盘
    $('.js-dzpBtn').on('click', function() {

        var rand = 0;

        $('.js-dzpCon').css({
            'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
            'transform': 'rotate(' + -(360 * 4 + 22.5) + 'deg)'
        });

    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        $('#result-win').fadeIn();
    });
});



