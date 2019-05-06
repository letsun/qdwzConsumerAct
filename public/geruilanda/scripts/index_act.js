var doc = $(document);
var intDiff = 59; //验证码倒计时总秒数量
var backInterval;

$(function() {
    var app = $('#app');

    Func.getPersonCenter(function(res) {
        if (res.code === 200) {

            if (res.data.mobile) {
                // debugger;
                Func.checkPhonesUserStatus({
                    phone: res.data.mobile
                }, function(res) {
                    if (res.code === 200) {
                        if (res.data.userStatus === 0) {
                            $.ajax({
                                url: api.createJoinActInfo,
                                type: 'GET',
                                dataType: 'json',
                                headers: getHeader(),
                                success: function (res) {
                                    if(res.code == 200) {
                                        window.location.href = '/act?timestamp=' + (new Date()).getTime();
                                    }
                                }
                            });
                        } else {
                            $('#app').fadeIn();
                        }

                    } else {
                        common.alert({
                            content: res.msg,
                            mask: true
                        });
                    }

                });

            } else {
                $('#app').fadeIn();
            }
        } else {
            common.alert({
                content: res.msg,
                mask: true
            });
        }

        $('#loadingWrapper').hide();
    });

   /* findActivity(function() {

    });*/
    // 点击获取验证码
    doc.on('click', '#form-code-btn', function() {
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
            self.html("验证码" + "(" + timer(intDiff) + ")").addClass('active');
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
    doc.on('click', '#form-confirm-btn', function() {
        var phone = $('#phone').val();
        var code = $('#code').val();
        var reg = /^1[0-9]{10}$/;
        var reg_2 = /^[0-9]{6}$/;

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

        //findActivity(function(res) {
            Func.checkPhoneIsEnabelJoinAct({
                phone: phone,
                verCode: code
            }, function(res) {
                if (res.code == 200) {
                    if (res.data.phoneLimit == 1) {
                        common.alert({
                            mask: true,
                            content: '验证成功',
                            ok: function() {
                                $('#loadingWrapper').show();
                                Func.register({
                                    mobile: phone,
                                    name: phone,
                                    verCode: code
                                }, function(res) {
                                    if(res.code == 200) {
                                        $.ajax({
                                            url: api.createJoinActInfo,
                                            type: 'GET',
                                            dataType: 'json',
                                            headers: getHeader(),
                                            success: function (res) {
                                                if(res.code == 200) {
                                                    window.location.href = '/act?timestamp=' + (new Date()).getTime();
                                                }
                                            }
                                        });
                                    }
                                })
                            }
                        })

                    } else {
                        common.alert({
                            mask: true,
                            content: '该手机号无法参与活动'
                        })
                    }
                } else {
                    common.alert({
                        mask: true,
                        content: res.msg
                    })
                }

            });
       //});
    });
});

/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim) {
    backInterval = window.setInterval(function() {

        initTim--;

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('#form-code-btn').html("验证码" + "(" + initTim + "s)").addClass('active');

        if (initTim == 0) {
            $("#form-code-btn").html("获取验证码").removeClass('active');
            $("#form-code-btn").removeAttr("disabled");
            clearInterval(backInterval);
            intDiff = parseInt(59);
        }

    }, 1000);
}

function findActivity(callback) {
    $.ajax({
        url: api.findActivityByEncode,
        type: 'GET',
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200 || res.code === 201) {
                callback(res);
            } else {
                common.alert({
                    mask: true,
                    content: res.msg
                })
            }
        },
        error: function(res) {
            common.alert({
                mask: true,
                content: res.msg
            })
        }

    });
}