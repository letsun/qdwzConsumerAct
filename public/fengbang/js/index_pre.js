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
    $('.footer-text1').on('click', function () {
        $('.huodong').show()
    })

    $('.huodong-con-img2').on('click', function () {
        $('.huodong').hide()
    })


    /**点击领取红包*/
    $('#hbbtn').on('click', function () {
        $('.hb').show()
        $('.hb-con1').show()
    })

    $('.hb-con-btn').on('click',function(){
        $('.hb').hide()
    })

    //获取验证码
    $('.cont-inp-btn').on('click',function(){
        var self = $(this);
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			if(typeof timer(intDiff) != "undefined"){
			    self.html("验证码" + "(" + timer(intDiff) + ")");
			}
		}
	})
})


/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim){

    $('.cont-inp-btn').html("验证码" + "(" + initTim + "s)").css("background", "#eee");
	$('.cont-inp-btn').html("验证码" + "(" + initTim + "s)").css("color", "#333");
    backInterval = window.setInterval(function(){

        initTim --;

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('.cont-inp-btn').html("验证码" + "(" + initTim + "s)");
		
        if(initTim == 0) {
            $(".cont-inp-btn").html("获取验证码").css("background", "#fff355");
            $(".cont-inp-btn").css('color','#fe1504')
            $('.cont-inp-btn').removeClass('active');
            clearInterval(backInterval);
            intDiff = parseInt(10);
        }

    }, 1000);
}
