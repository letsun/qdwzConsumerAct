var intDiff = 60;//验证码倒计时总秒数量
var backInterval;
$(function() {
    var doc = $(document);
    var isGetVerCode = false;
    var isRegister = false;

    // 点击领取红包按钮
    doc.on('click','#receive-btn',function () {
        Func.getPersonCenter(function(res) {

            if (res.code === 200) {
                if (!res.data.mobile) {
                    $('#register-win').fadeIn();
                } else {
                    lottery();
                }
            } else {
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }
        });
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

        if (isGetVerCode) {
            return;
        }

        isGetVerCode = true;

        Func.btmGetVerCode({mobile: $('#mobile').val()}, function(res) {
           
            if (res.code === 200) {

                self.attr("disabled","disabled");
                if(typeof timer(intDiff) != "undefined"){
                    self.html("验证码" + "(" + timer(intDiff) + ")");
                }

            }

            isGetVerCode = false;

            common.alert({
                content: res.msg,
                mask: true
            });
        });

    });

    doc.on('click','#form-sub-btn',function () {
        var res = Global.initValidate('#form');

        if (!res) {
            return;
        }

        if (isRegister) {
            return;
        }

        isRegister = true;

        Func.register({
            mobile: $('#mobile').val(),
            name: $('#name').val(),
            verCode: $('#verCode').val()
        }, function(res) {
            if (res.code === 200) {

                lottery();

            } else {
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }
        }); 

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

function lottery() {
    Func.lottery(api.lottery, function(res) {
        var html = '';

        if (res.code === 200) {
            html += '<img class="result-btn" id="result-btn" src="/biteming/images/1_4.png" alt="">';
            html += '<div class="result-title" id="result-title">恭喜获得红包</div>';
            html += '<div class="result-dec" id="result-dec">￥<span class="result-dec-num">' + currency('', res.data.redPack.prizeAmount) + '</span>元</div>';
        } else {
            html += '<div class="result-title" id="result-title"></div>';
            html += '<div class="result-dec" id="result-dec" style="top: 35%">' + res.msg + '</div>';
        }

        $('#result-con').html(html);

        $('#register-win').fadeOut();
        $('#result-win').fadeIn();
    });
}

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





