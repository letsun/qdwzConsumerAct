
var doc=$(document);
var intDiff = 5;//验证码倒计时总秒数量
var backInterval;
$(function () {

});

/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim){
    backInterval = window.setInterval(function(){

        initTim --;

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('#form-code-btn').html("验证码" + "(" + initTim + "s)").addClass('active');

        if(initTim == 0) {
            $("#form-code-btn").html("获取验证码").removeClass('active');
            $("#form-code-btn").removeAttr("disabled");
            clearInterval(backInterval);
            intDiff = parseInt(5);
        }

    }, 1000);
}