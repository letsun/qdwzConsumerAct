var doc = $(document);
var intDiff = 59; //验证码倒计时总秒数量
var backInterval;
var nickName;

$(function() {
    var app = $('#app');

    var isClick = false;

    $(document).on('click', '#openRedPackage', function(e) {

        if (isClick) {
            return;
        }

        isClick = true;

        Func.getPersonCenter(function(res) {
            if (res.code === 200) {
                nickName = res.data.nikeName;

                if (res.data.mobile) {
                    lottFuc();
                } else {
                    $(".phone-mask").fadeIn();
                }
            } else {
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }

            $('#loadingWrapper').hide();
        });
    });

    // 点击关闭中奖结果弹窗
    $('#app').on('click','.close-result',function () {
        $('#resultWrapper').fadeOut();
    });

    // 点击获取验证码
    doc.on('click', '#code-btn', function() {
        var phone = $('#phone').val();
        var reg = /^1[0-9]{10}$/;

        if ($.trim(phone) == '') {
            common.alert({
                mask: true,
                content: '手机号不能为空'
            });
            return;
        }
        if (!reg.test(phone)) {
            common.alert({
                mask: true,
                content: '手机号格式不正确'
            });
            return;
        }

        var self = $(this);

        self.attr("disabled", "disabled");

        if (typeof timer(intDiff) != "undefined") {
            self.html("验证码" + "(" + timer(intDiff) + ")");
        }

        Func.getVerCode({
            mobile: phone
        }, function(res) {
            common.alert({
                mask: true,
                content: res.msg
            })
        })
    });

    // 点击确定
    doc.on('click', '#submit-btn', function() {
        var phone = $('#phone').val();
        var code = $('#code').val();
        var reg = /^1[0-9]{10}$/;

        if ($.trim(phone) == '') {
            common.alert({
                mask: true,
                content: '手机号不能为空'
            });
            return;
        }
        if (!reg.test(phone)) {
            common.alert({
                mask: true,
                content: '手机号格式不正确'
            });
            return;
        }

        if ($.trim(code) == '') {
            common.alert({
                mask: true,
                content: '验证码不能为空'
            });
            return;
        }

        Func.register({
            mobile: phone,
            name: phone,
            verCode: code
        }, function(res) {
            if (res.code == 200) {
                $(".phone-mask").hide();
                lottFuc();
            } else {
                common.alert({
                    mask: true,
                    content: res.msg
                })
            }
        });
    });
});

/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim) {
    backInterval = window.setInterval(function() {

        initTim--;

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('#code-btn').html("验证码" + "(" + initTim + "s)");

        if (initTim == 0) {
            $("#code-btn").html("获取验证码");
            $("#code-btn").removeAttr("disabled");
            clearInterval(backInterval);
            intDiff = parseInt(59);
        }

    }, 1000);
}

function lottFuc() {
    Func.lottery(api.lottery, function(res) {
        if (res.code === 200 || res.code === 201) {

            Global.requestTempByAjax('/notbean/temp/result.ejs', res, function(template) {
                $('#resultWrapper').html(template);
                $('#resultWrapper').fadeIn();

            });

            if (res.code === 200 && res.data.redPack.prizeAmount) {
                Func.userCash({
                    amount: res.data.redPack.prizeAmount,
                    cashType: 0
                }, function() {});
            }
        } else {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });
}