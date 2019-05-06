var doc=$(document);
var shakeNum = 0;
var speed,flag = false;
var shakeThreshold = 1000;//定义一个摇动的阈值
var lastTime = 0;//定义一个变量记录上一次摇动的时间
var x = 0,   //定义x、y、z记录三个轴的数据以及上一次触发的时间
    y = 0,
    z = 0,
    last_x = 0,
    last_y = 0,
    last_z = 0;

/**
 * 摇一摇相关
 */
var yes1 = new Audio();
var yes2 = new Audio();
wx.config({
    debug:false,
    appId:'',
    timestamp:1,
    nonceStr:'',
    signature:'',
    jsApiList:[]
});

if (yes1) {
    yes1.src = "/zhuojiu/audio/suc.mp3";
    yes2.src = "/zhuojiu/audio/suc2.mp3";
}
wx.ready(function(){
    yes1.play();
    yes1.pause();
    yes2.play();
    yes2.pause();
});
$(function() {
    var app=$('#app');


    // lottery();

    // 点击摇一摇抢红包
    /*doc.on('click','#shake-btn',function () {
        $('#shake-tips').fadeIn(function () {
            window.addEventListener('devicemotion', rock);
        });
    })*/
});


/**
 * 摇一摇事件
 */
function rock(event) {
    // 获取重力加速
    var acceleration = event.accelerationIncludingGravity;

    var curTime = new Date().getTime();//获取当前时间戳
    var diffTime = curTime - lastTime;//获取摇动的间隔

    if (diffTime > 100) {
        lastTime = curTime;//记录上一次摇动的时间
        x = acceleration.x;//获取加速度X方向
        y = acceleration.y;//获取加速度Y方向
        z = acceleration.z;//获取加速度垂直方向

        speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;//计算阈值


        //记录上一次加速度
        last_x = x;
        last_y = y;
        last_z = z;

        if (speed > shakeThreshold) {
            shakeNum++;
            yes1.play();

            if(shakeNum > 5) {
                window.removeEventListener('devicemotion', rock);
                yes1.pause();
                yes2.play();
                lottery();
            }
        }
    }
}

// 摇一摇结果
function lottery() {
    $.ajax({
        url: api.findActivityByEncode,
        type: 'GET',
        dataType: 'json',
        headers: getHeader(),
        success: function(res) {
            if (res.code === 200 || res.code === 201) {
                $.ajax({
                    url: api.lottery,
                    type: 'GET',
                    dataType: 'json',
                    headers: getHeader(),
                    success: function(res) {
                        $('#shake-tips').hide();
                        $('#shake-btn').hide();
                        $('.bottom-bg').hide();
                        var data = res.data;
                        if (res.code === 200) {
                            $('#result').fadeIn(function () {
                                var html = '<span class="num" id="num">'+ data.redPack.prizeAmount +'</span>元';
                                $('.num-wra').html(html);
                            });
                        } else if (res.code === 201) {
                            $('#result').fadeIn(function () {
                                $('.num-wra').html('未中奖');
                                $('#loty-text').hide();
                                $('#result-tips').show();
                            });
                        } else {
                            common.alert({
                                mask:true,
                                content:res.msg
                            })
                        }
                    },
                    error:function() {
                        common.alert({
                            mask:true,
                            content:res.msg
                        })
                    }
                });
            } else {
                common.alert({
                    mask:true,
                    content:res.msg
                })
            }
        },
        error:function (res) {
            common.alert({
                mask:true,
                content:res.msg
            })
        }

    });

}