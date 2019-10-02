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

    /**打开弹出了解活动*/
    $('.container-img1').on('click', function () {
        $('.huodong').show()
    })

    $('.huodong-con-img2').on('click', function () {
        $('.huodong').hide()
    })

    $('.gzh-con-img3').on('click',function (){
        $('.gzh').hide()
    })

    /**点击领取红包*/
    $('#hbbtn').on('click', function () {
        $('.hb').show()
        $('.hb-con1').show()
    })

    $('.hb-con-btn').on('click',function(){
        $('.hb').hide()
    })


})



