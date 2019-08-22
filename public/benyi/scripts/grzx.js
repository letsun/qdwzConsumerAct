$(function () {

    var mobile;
    var phone;
    var queryUserInfo = JSON.parse(window.localStorage.getItem('queryUserInfo'));
    var phone = JSON.parse(window.localStorage.getItem('phone'));
    if (queryUserInfo != '' && queryUserInfo != null) {
        mobile = queryUserInfo.mobile;
    }

    if (phone != null && phone != '') {
        mobile =JSON.parse(window.localStorage.getItem('phone'));
    }

    var nickname = queryUserInfo.nickname  //微信昵称
    var headimgurl = queryUserInfo.headimgurl  //微信头像

    

    $('#nickname').html(nickname)
    $('#headimgurl').attr("src", headimgurl)


    if (mobile != '') {
        $('#mobile').text(mobile)
        $('#mobiletext').text('修改手机号')
    } else {
        $('#mobile').text('')
        $('#mobiletext').text('绑定手机号')
    }
})

