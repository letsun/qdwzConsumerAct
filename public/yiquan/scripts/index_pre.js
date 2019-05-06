$(function () {

    // 点击领大奖
    $('#receive-btn').on('click',function () {
        $('#result-win').fadeIn();
    });

    // 关闭公众号弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    $('#result-confirm1 img').on('click',function () {
        $('#result-win').fadeOut();
    });
});