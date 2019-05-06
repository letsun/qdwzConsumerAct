$(function () {
    var index = 0;


    // 关闭公众号弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 点击戳我领红包
    $('#receive-btn').on('click',function () {
        $('#result-win').fadeIn();
    });


    // 点击我知道了
    $('#result-confirm').on('click',function () {
        $('#result-win').fadeOut();
    })

});