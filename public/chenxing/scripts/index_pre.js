$(function() {
    var rotate = 360;

    var perRotate = rotate / 8;
    var speed = 300; // 动画速度

    // 大转盘
    $('.js-dzpBtn').on('click', function() {

        var rand = 0;

        $('.js-dzpCon').css({
            'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
            'transform': 'rotate(' + -(360 * 4 + 67.5) + 'deg)'
        });

    });

    // 大转盘动画结束
    $('.js-dzpCon').on('transitionend', function() {
        setTimeout(function () {
            $('#result-win').fadeIn();
        },1000)

    });

    // 点击我知道了
    $('#result-confirm1').on('click',function(){
        $('#result-win').fadeOut();
    })
});





