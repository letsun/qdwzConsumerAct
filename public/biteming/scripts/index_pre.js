var intDiff = 5;//验证码倒计时总秒数量
var backInterval;
$(function() {
    var doc = $(document);

    // 点击领取红包按钮
    doc.on('click','#receive-btn',function () {
        $('#register-win').fadeIn();
    });

    // 点击注册弹窗关闭弹窗
    doc.on('click','#form-close',function () {
        $('#register-win').fadeOut();
    });

    /**
     * @desc 获取验证码事件
     */
    doc.on("click",'#form-code-btn',function(e) {
        var self = $(this);

        var validate = new Validate();
        validate.add($('#mobile'), [{strategy: 'isEmpty', msg: '手机号不能为空'}, {strategy: 'isMobile', msg: '手机号格式有错'}]);

        var msg = validate.start();

        if (msg) {
            common.alert({
                content: msg,
                mask: true
            });

            return;
        }

        self.attr("disabled","disabled");
        if(typeof timer(intDiff) != "undefined"){
            self.html("验证码" + "(" + timer(intDiff) + ")");
        }
    });

    doc.on('click','#form-sub-btn',function () {
        var res = Global.initValidate('#form');

        if (!res) {
            return;
        }

        $('#register-win').fadeOut();
        $('#result-win').fadeIn();

    });

    // 点击红包弹窗领取按钮
    doc.on('click','#result-btn',function () {
        $('#qrcode-win').fadeIn();
    });

    // 点击二维码弹窗关闭弹窗
    doc.on('click','#code-close',function () {
        $('#qrcode-win').fadeOut();
    });

});

/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim){

    $('#form-code-btn').html("验证码" + "(" + initTim + "s)");

    backInterval = window.setInterval(function(){

        initTim --;

        console.log(initTim);

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('#form-code-btn').html("验证码" + "(" + initTim + "s)");

        if(initTim == 0) {
            $("#form-code-btn").html("获取验证码");
            $("#form-code-btn").removeAttr("disabled");
            clearInterval(backInterval);
            intDiff = parseInt(5);
        }
    }, 1000);
}





