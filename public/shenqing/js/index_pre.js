var intDiff =10;

$(function () {
    // 页面禁止滑动
    $('.container').on("touchmove", function (e) {
        e.preventDefault();
    });
    /**加载进度*/
    common.loading($("#percent"), function () {

        $('.loading').hide();
        $('.container').fadeIn();
    });


    $('#hongbao').on('click',function(){

        $('.mask').fadeIn();
        $('.mask-con1').fadeIn()
    })

    $('.mask-btn').on('click',function(){
        
        $('.mask').fadeOut();
        $('.mask-con').fadeOut()
    })


})



