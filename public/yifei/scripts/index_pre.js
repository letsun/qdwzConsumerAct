$(function () {
    var index = 0;


    // 关闭公众号弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    $('#container').on('click','.award-item',function () {
        index = $(this).index();
        $('.award-item').addClass('active');
    });

    // 监听动画结束
    $('.back-item').on('transitionend', function() {
        $('.layer').show();
        $('.award-item').find('.layer-item').show();
        $('.award-item').eq(index).find('.layer-item').hide();
        $('.award-item').eq(index).find('.award-item-bg').show();
    });
});