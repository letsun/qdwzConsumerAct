var intDiff = 59;//验证码倒计时总秒数量
var backInterval;
var type;
var prizeImgList = [
    {
        'name': '手机',
        'imgurl': 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yiquan/4_1.png'
    },
    {
        'name': '彩电',
        'imgurl': 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yiquan/4_2.png'
    },
    {
        'name': '空调',
        'imgurl': 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yiquan/4_3.png'
    },
    {
        'name': '电脑',
        'imgurl': 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yiquan/4_4.png'
    },
    {
        'name': '平衡车',
        'imgurl': 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yiquan/4_5.png'
    },
];

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

    Func.checkUser(function (red) {
        if (red.code == 200) {
            var type = red.data.type;
            if (type == 1) {
                $('#loadingWrapper').hide();
                $('#submit-infor').fadeIn();

            } else if (type == 0) {
                // 开始活动
                Func.findActivityByEncode(function(res) {
                    $('#loadingWrapper').hide();
                    var data = res.data;
                    if (res.code === 200 || res.code === 201 || res.code === 206) {

                    } else if (res.code === 203) {
                        $('.result-title').html('很遗憾');
                        $('.dec').hide();
                        $('#result-win .dec3 .name').html('该码已参与活动');
                        $('#result-win .dec3').show();
                        $('#result-confirm2').show();
                        $('#result-win').fadeIn();
                    } else {
                        $('.redResult-tips').hide();
                        common.alert({
                            content: res.msg,
                            mask: true
                        });
                    }
                });
            } else {
                $('.dec').hide();
                $('#loadingWrapper').hide();
                $('.result-title').html('很遗憾');
                $('#result-win .dec3 .name').html('该码已参与活动');
                $('#result-win .dec3').show();
                $('#result-confirm2').show();
                $('#result-win').fadeIn();
            }
        } else {
            $('.dec').hide();
            $('#loadingWrapper').hide();
            $('.result-title').html('很遗憾');
            $('#result-win .dec3 .name').html('该码已参与活动');
            $('#result-win .dec3').show();
            $('#result-confirm2').show();
            $('#result-win').fadeIn();
        }
    });

    // 点击关闭二维码弹窗
    $('#close-attent').on('click',function () {
        $('#attent-win').fadeOut();
    });

    // 点击领大奖
    $('#receive-btn').on('click',function () {
        Func.checkUser(function (red) {
            if (red.code == 200) {
                var type = red.data.type;
                if (type == 1) {
                    $('#loadingWrapper').hide();
                    $('#submit-infor').fadeIn();
                } else if (type == 0) {
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
                                            $('#loadingWrapper').hide();
                                            if(reg.code == 200) {
                                                type = reg.data.type;
                                                $('.dec').hide();
                                                if (type == 0) {
                                                    prizeAmount = reg.data.redPack.prizeAmount;
                                                    if (reg.data.lotteryId > 0) {
                                                        lotteryId = reg.data.lotteryId;
                                                    }
                                                    $('#result-win .dec1 .num').find('span').html(prizeAmount);
                                                    $('#result-win .dec1').show();
                                                } else if (type == 2) {
                                                    $('#result-win .dec2 .name .award-name').html(reg.data.materialObj.prizeName);
                                                    $('#result-confirm1').show();
                                                    for (var i = 0; i < prizeImgList.length; i++) {
                                                        if (reg.data.materialObj.prizeName.indexOf(prizeImgList[i].name) != -1) {
                                                            $('.award-img').attr('src',prizeImgList[i].imgurl);
                                                        }
                                                    }
                                                    $('#result-win .dec2').show();

                                                }
                                                $('.result-title').html('恭喜您获得');
                                                $('#result-win').fadeIn(function () {
                                                    if (type == 0) {
                                                        userCash(prizeAmount,lotteryId);
                                                    }
                                                });
                                            } else if (reg.code == 201) {
                                                $('#loadingWrapper').hide();
                                                $('.dec').hide();
                                                $('.result-title').html('很遗憾');
                                                $('#result-win .dec3 .name').html('您未中奖，谢谢惠顾！');
                                                $('#result-win .dec3').show();
                                                $('#result-confirm2').show();
                                                $('#result-win').fadeIn();
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
                            $('.dec').hide();
                            $('.result-title').html('很遗憾');
                            $('#result-win .dec3 .name').html('该码已参与活动');
                            $('#result-win .dec3').show();
                            $('#result-confirm2').show();
                            $('#result-win').fadeIn();
                        } else {
                            $('#loadingWrapper').hide();
                            $('.redResult-tips').hide();
                            common.alert({
                                mask: true,
                                content: res.msg,
                            })
                        }
                    });
                } else {
                    $('#loadingWrapper').hide();
                    $('.dec').hide();
                    $('.result-title').html('很遗憾');
                    $('#result-win .dec3 .name').html('该码已参与活动');
                    $('#result-win .dec3').show();
                    $('#result-confirm2').show();
                    $('#result-win').fadeIn();
                }
            }
        });

    });

    // 关闭二维码弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });


    // 打开提交信息弹窗
    $('#result-confirm1').on('click',function () {
        $('#submit-infor').fadeIn();
    });

    // 关闭提交信息弹窗
    $('#close-submit').on('click',function () {
        $('#submit-infor').fadeOut();
    });

    // 打开二维码弹窗
    $('#result-confirm2').on('click',function () {
        $('#result-win').hide();
        $('#attent-win').fadeIn();
    });

    // 获取验证码
    /*$('#form-btn').on("click",function(e) {
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
    });*/

    // 提交信息
    $('#form-submit').on('click',function () {
        var companyName = $('#companyName').val();
        var name = $('#name').val();
        var age = $('#age').val();
        var mobile = $('#mobile').val();
        var address = $('#address').val();
        var reg1 = /^1[0-9]{10}$/;
        var reg3 = /^[0-9]{1,3}$/;

        if ($.trim(companyName) == '') {
            common.alert({
                mask: true,
                content: '公司名称不能为空',
            });
            return false;
        }

        if ($.trim(name) == '') {
            common.alert({
                mask: true,
                content: '姓名不能为空',
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

        if ($.trim(address) == '') {
            common.alert({
                mask: true,
                content: '联系地址不能为空',
            });
            return false;
        }

        var addUserInfo = {
            companyName: companyName,
            name: name,
            age: age - 0,
            mobile: mobile,
            address: address,
        };
        $('#loadingWrapper').show();
        Func.addUserInfo(addUserInfo,function (res) {
            $('#loadingWrapper').hide();
            if (res.code == 200) {
                $('#result-win').hide();
                $('#submit-infor').hide();
                $('#submit-success').fadeIn();
            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                });
            }
        })
    });

    // 关闭提交成功弹窗
    $('#success-close').on('click',function () {
        $('#submit-success').fadeOut();
    })
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