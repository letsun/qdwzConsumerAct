$(function () {

    // 点击开启红包
    $('#receive-btn').on('click',function () {
        $(this).hide();
        $('#receive-wra').hide();
        $('#result').fadeIn();
    })
});