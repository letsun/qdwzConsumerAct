$(function () {
    var queryUserInfo = JSON.parse(window.localStorage.getItem('queryUserInfo'))
    var mobilea = queryUserInfo.mobile; //手机号
    $('.mobilea').text(mobilea);
    var intDiff = 60;

    if (mobile == '') {
        $('.container').hide();
        $('.containera').show();


    } else {


        $('.containera').hide();
        $('.container').show();
    }


    $('#btna').on('click', function () {
        $('.container').hide();
        $('.containera').show();
    })


    //获取手机号验证码
    $('#getVerCode').on('click', function () {

        var mobile = $('#mobile').val()
        var _this = $(this)

        Func.getVerCode({
            mobile: mobile

        }, function (res) {
            if (res.code == 200) {
                if (mobile != '') {
                    if (!_this.hasClass('active')) {
                        _this.addClass('active');

                        if (typeof timer(intDiff) != "undefined") {
                            _this.html("验证码" + "(" + timer(intDiff) + ")");
                        }
                    }

                }

                $('#loadingWrapper').hide();
            } else {
                $('#loadingWrapper').hide();
            }
        })



    })

    //绑定修改手机号
    $('#btnb').on('click', function () {

        var phone
        var mobile = $('#mobile').val()
        var verCode = $('#verCode').val()

        Func.bindingUserInfoMobile({
            mobile: mobile,
            verCode: verCode
        }, function (res) {
            if (res.code == 200) {
                window.localStorage.setItem('phone', JSON.stringify(mobile))
                window.location.href = '/template/benyi/grzx';
                $('#loadingWrapper').hide();
            } else {
                common.alert({
                    mask: true,
                    content: res.msg,
                });

                $('#loadingWrapper').hide();
            }
        })
    })
})



/* 验证码倒计时函数 -- 参数initTim为秒数 */
function timer(initTim) {

    $('#getVerCode').html("验证码" + "(" + initTim + "s)").css("background", "#eee");
    $('#getVerCode').html("验证码" + "(" + initTim + "s)").css("color", "#333");
    backInterval = window.setInterval(function () {

        initTim--;

        if (initTim <= 9) {
            initTim = '0' + initTim;
        }

        $('#getVerCode').html("验证码" + "(" + initTim + "s)");

        if (initTim == 0) {
            $("#getVerCode").css("background", "#ff7350");
            $("#getVerCode").html("获取验证码").css("color", "#eee");
            $('#getVerCode').removeClass('active');
            clearInterval(backInterval);
            intDiff = parseInt(10);
        }

    }, 1000);
}