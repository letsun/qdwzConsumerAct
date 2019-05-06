var intDiff = 59;//验证码倒计时总秒数量
var backInterval;
$(function () {
    var prizeAmount = '';
    var lotteryId = '';
    var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/luoboke/';

    // 输入框失去焦点兼容苹果系统
    $('#container').on('blur','input,textarea,select',function(){
        setTimeout(function () {
            var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
            if (!hasFocus) {
                window.scroll(0,0);
            }
        },100);
    });

    Func.checkUserInfo(function (red) {
        if (red.code == 200) {
            var type = red.data.type;
            if (type == 1) {
                $('#loadingWrapper').hide();
                $('#submit-infor').fadeIn();
                prizeAmount = red.data.redPack.prizeAmount;
                if (red.data.redPack.lotteryId > 0) {
                    lotteryId = red.data.redPack.lotteryId;
                }

            } else {
                // 开始活动
                Func.findActivityByEncode(function(res) {
                    $('#loadingWrapper').hide();
                    var data = res.data;
                    if (res.code === 200 || res.code === 201 || res.code === 206) {

                    } else if (res.code === 203) {
                        $('.redResult-tips').hide();
                        $('.redResult-title').attr('src', src + '1_10.png');
                        $('.redResult-text').html('该码已参与活动');
                        $('.redResult-dec2').show();
                        $('#redResult-win').fadeIn();
                    } else {
                        $('.redResult-tips').hide();
                        common.alert({
                            content: res.msg,
                            mask: true
                        });
                    }
                });
            }
        }
    });

    // 点击关闭二维码弹窗
    $('#close-attent').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 点击抢红包
    $('#receive-btn').on('click',function () {
        Func.checkUserInfo(function (red) {
            if (red.code == 200) {
                var type = red.data.type;
                if (type == 1) {
                    $('#loadingWrapper').hide();
                    $('#submit-infor').fadeIn();
                    prizeAmount = red.data.redPack.prizeAmount;
                    if (red.data.redPack.lotteryId > 0) {
                        lotteryId = red.data.redPack.lotteryId;
                    }
                } else {
                    // 找活动
                    Func.findActivityByEncode(function (res) {
                        if (res.code === 200 || res.code === 201) {
                            Func.isSubscribe(function(res1) {
                                if (res1.code === 200) {
                                    if (!res1.data.subscribe) {
                                        $('#loadingWrapper').hide();
                                        $('#attent-win').fadeIn();
                                    } else {
                                        Func.lottery(api.lottery,function (reg) {
                                            if(reg.code == 200) {
                                                prizeAmount = reg.data.redPack.prizeAmount;
                                                if (reg.data.lotteryId > 0) {
                                                    lotteryId = reg.data.lotteryId;
                                                }
                                                $('.redResult-title').attr('src', src + '1_6.png');
                                                $('.redResult-amount').find('.num').html(reg.data.redPack.prizeAmount);
                                                $('.redResult-dec1').show();

                                                Func.checkUserInfo(function (req) {
                                                    $('#loadingWrapper').hide();
                                                    if (req.code == 200) {
                                                        var type = req.data.type;
                                                        if (type == 0) {
                                                            $('.redResult-tips').show();
                                                            userCash(prizeAmount,lotteryId);
                                                        } else {
                                                            $('#receive-btn2').show();
                                                        }
                                                    }

                                                    $('#redResult-win').fadeIn(function () {

                                                    });
                                                })
                                            } else if (reg.code == 201) {
                                                $('#loadingWrapper').hide();
                                                $('.redResult-tips').hide();
                                                $('.redResult-title').attr('src', src + '1_10.png');
                                                $('.redResult-text').html('您未中奖');
                                                $('.redResult-dec2').show();
                                                $('#redResult-win').fadeIn();
                                            } else {
                                                $('#loadingWrapper').hide();
                                                common.alert({
                                                    mask: true,
                                                    content: res.msg,
                                                })
                                            }
                                        })
                                    }
                                } else {
                                    $('#loadingWrapper').hide();
                                    common.alert({
                                        content: res1.msg,
                                        mask: true
                                    });
                                }
                            });

                        } else if (res.code === 203) {
                            $('#loadingWrapper').hide();
                            $('.redResult-tips').hide();
                            $('.redResult-title').attr('src', src + '1_10.png');
                            $('.redResult-text').html('该码已参与活动');
                            $('.redResult-dec2').show();
                            $('#redResult-win').fadeIn();
                        } else {
                            $('#loadingWrapper').hide();
                            $('.redResult-tips').hide();
                            common.alert({
                                mask: true,
                                content: res.msg,
                            })
                        }
                    });
                }
            }
        });

    });

    // 打开提交信息弹窗
    $('#receive-btn2').on('click',function () {
        $('#submit-infor').fadeIn();
    });

    // 关闭提交信息弹窗
    $('#close-infor').on('click',function () {
        $('#submit-infor').fadeOut();
    });

    // 获取验证码
    $('#form-btn').on("click",function(e) {
        var mobile = $('#mobile').val();
        var reg1 = /^1[0-9]{10}$/;

        if ($.trim(mobile) == '') {
            common.alert({
                mask: true,
                content: '电话号码不能为空',
            });
            return false;
        }

        if (!reg1.test(mobile)) {
            common.alert({
                mask: true,
                content: '电话号码格式不正确',
            });
            return false;
        }

        var self = $(this);
        self.attr("disabled","disabled");
        if(typeof timer(intDiff) != "undefined"){
            self.html("验证码" + "(" + timer(intDiff) + ")");
        }
    });

    // 提交信息
    $('#form-submit').on('click',function () {
        var name = $('#name').val();
        var sex = $('#sex option:selected').val();
        var age = $('#age').val();
        var mobile = $('#mobile').val();
        var verCode = $('#verCode').val();
        var address = $('#address').val();
        var reg1 = /^1[0-9]{10}$/;
        var reg2 = /^[0-9]{6}$/;
        var reg3 = /^[0-9]{1,3}$/;

        if ($.trim(name) == '') {
            common.alert({
                mask: true,
                content: '姓名不能为空',
            });
            return false;
        }

        if (sex == '2') {
            common.alert({
                mask: true,
                content: '请选择性别',
            });
            return false;
        }

        if ($.trim(age) == '') {
            common.alert({
                mask: true,
                content: '年龄不能为空',
            });
            return false;
        }

        if (!reg3.test(age)) {
            common.alert({
                mask: true,
                content: '年龄格式不正确',
            });
            return false;
        }

        if ($.trim(mobile) == '') {
            common.alert({
                mask: true,
                content: '电话号码不能为空',
            });
            return false;
        }

        if (!reg1.test(mobile)) {
            common.alert({
                mask: true,
                content: '电话号码格式不正确',
            });
            return false;
        }

        if ($.trim(verCode) == '') {
            common.alert({
                mask: true,
                content: '验证码不能为空',
            });
            return false;
        }

        if (!reg2.test(verCode)) {
            common.alert({
                mask: true,
                content: '验证码格式不正确',
            });
            return false;
        }

        if ($.trim(address) == '') {
            common.alert({
                mask: true,
                content: '联系地址不能为空',
            });
            return false;
        }

        var addUserInfo = {
            name: name,
            sex: sex,
            age: age - 0,
            mobile: mobile,
            address: address,
            verCode: verCode
        };

        Func.addUserInfo(addUserInfo,function (res) {
            if (res.code == 200) {
                $('#submit-infor').hide();
                $('.redResult-title').attr('src', src + '1_6.png');
                $('.redResult-amount').find('.num').html(prizeAmount);
                $('.redResult-dec1').show();
                $('#receive-btn2').hide();
                $('.redResult-tips').show();
                $('#redResult-win').fadeIn(function () {
                    userCash(prizeAmount,lotteryId);
                });
            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                });
            }
        })
    });
});


/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim){
    var mobile = $('#mobile').val();
    $('#form-btn').html("验证码" + "(" + initTim + "s)").addClass('active');
    Func.getVerCode({mobile:mobile},function (res) {
        if (res.code != 200) {
            $("#form-btn").html("获取验证码").removeClass('active');
            $("#form-btn").removeAttr("disabled");
            clearInterval(backInterval);
            common.alert({
                mask: true,
                content: res.msg,
            });
        }
    });

    backInterval = window.setInterval(function(){

        initTim --;

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('#form-btn').html("验证码" + "(" + initTim + "s)");

        if(initTim == 0) {
            $("#form-btn").html("获取验证码").removeClass('active');
            $("#form-btn").removeAttr("disabled");
            clearInterval(backInterval);
            intDiff = parseInt(59);
        }

    }, 1000);
}

// 自动提现
function userCash(num,lotteryId) {
    $.ajax({
        url: api.userCash,
        type: 'GET',
        dataType: 'json',
        data:{
            lotteryId: lotteryId,
            amount: num,
            cashType: 0,
        },
        headers: getHeader(),
        success: function(res) {

        },
        error:function (res) {
            common.alert({
                mask:true,
                content:res.msg,
            })
        }
    });
}