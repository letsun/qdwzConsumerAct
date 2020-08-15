$(function() {

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
});





