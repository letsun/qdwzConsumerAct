$(function() {
    var app=$('#app');

    // 点击摇一摇红包
    app.on('click','#shake-btn',function() {
        lottery();
        // $('.js-con2').fadeIn(function() {
        //     window.addEventListener('devicemotion', rock);
        // });
    });


    /*//点击提现
    app.on('click','.js-con2',function() {
        lottery();
    });*/

    //点击领字
    app.on('click','#withdraw-btn',function() {
        window.location.href = '/attention?timestamp=' + (new Date()).getTime();
    });

    /*// 点击关闭二维码弹窗
    $('#closeBtn').on('click',function () {
        $('#erweimaWrapper').fadeOut();
    });*/

    /**
     * 是否关注公众号接口
     * @param  function 	callback 	成功后的回调
     * @return null
     */
    function isSubscribe(callback) {
        $.ajax({
            url: api.isSubscribe,
            type: 'GET',
            headers: getHeader(),
            dataType: 'json',
            success: function(res) {
                callback(res);
            }
        });
    }

});

// 摇一摇
var rock = yyy(lottery);

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(res) {

    $('#loadingWrapper').hide();

    if (res.code === 200) {
        
        $('#shake-result-wra').html('恭喜获得<span class="shake-result">' + currency('', res.data.redPack.prizeAmount) + '</span>元');
        $('.js-con3').fadeIn(300);
    } else {

        $('#error').html(res.msg);
        $('.js-con4').fadeIn(300);
    }

    Func.userCash({
        amount: res.data.redPack.prizeAmount,
        cashType: 0
    }, function() {

    });

    window.removeEventListener('devicemotion', rock);
    rock = null;

    $('#container-bg').hide();
    $('.js-con1').hide();
    $('.js-con2').hide();
    $('#con-wra').fadeIn();

}

function findActivityByEncode() {
    $.ajax({
        type: 'GET',
        url: api.findActivityByEncode,
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            $('#loadingWrapper').hide();

            if (res.code === 203 || res.code === 204 || res.code === 500) {

                if (res.code === 203) {
                    $('#errorText').html('该码已经被扫!');
                } else if (res.code === 204) {
                    $('#errorText').html('没有找到参与活动!');
                } else if (res.code === 500) {
                    $('#errorText').html('系统异常!');
                }

                $('#errorText').show();
                $('#shake-btn').hide();
                
            } else if (res.code === 201 || res.code === 200) {
                $('#errorText').hide();
                $('#shake-btn').show();
            } else {
                $('#errorText').hide();
                $('#shake-btn').hide();

                common.alert({
                    content: res.msg,
                    mask: true
                });
            }

        }
    });
}

function lottery() {

    $('#loadingWrapper').show();

    $.ajax({
        type: 'GET',
        url: api.lottery,
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            typePage(res);
        }
    });
}
