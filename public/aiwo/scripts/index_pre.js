$(function() {

    // 点击抽奖
    $('#lottery-btn').on('click',function () {
        $('#lottery-win').fadeIn();
    });

    // 点击关闭中奖结果弹窗
    $('#close-lottery').on('click',function () {
        $('#lottery-win').fadeOut();
    })
});



