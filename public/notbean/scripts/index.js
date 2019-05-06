$(function() {
    var NO_NOTICE = 0; // 未关注
    var NOTICED = 1; // 已关注

    var doc = $(document);
    var notice_type = NOTICED; // 关注类型

    var speed = 300; // 动画速度

    // 点击抢红包
    doc.on('click', '#yyy-btn', function() {
        if (notice_type === NO_NOTICE) {

            $('#notice-publicAccount').fadeIn(speed);


        } else if (notice_type === NOTICED) {

            $('#yyy-wrapper').fadeIn(speed, function(){
                window.addEventListener('devicemotion', rock);
            });

        }
    });

    // 点击关闭二维码弹窗
    doc.on('click', '#close-btn', function() {
        $('#notice-publicAccount').fadeOut(speed);
    });

    doc.on('click', '#shareBtn', function() {
        $('#share').fadeIn();
    });
    doc.on('click', '#share', function() {
        $('#share').fadeOut();
    });
});

/*判断摇一摇结果函数，类型为1则有红包，类型为2则无*/
function typePage(type) {

    if (type == 1) {
        $('#con').html('恭喜获得红包<br />66.6元');
    } else {
        $('#con').html('很遗憾，没中奖~');
    }

    window.removeEventListener('devicemotion', rock);
    rock = null;

    $('#page1_content').fadeOut();
    $('#yyy-wrapper').fadeOut();
    $('#yyy-btn').fadeOut();
    $('#result').fadeIn();

    
}

/**
 * 摇一摇相关
 */
var yes1 = new Audio();
var yes2 = new Audio();

wx.config({
    debug: false,
    appId: '',
    timestamp: 1,
    nonceStr: '',
    signature: '',
    jsApiList: []
});
yes1.src = "../resource/audio/suc.mp3";
yes2.src = "../resource/audio/suc2.mp3";
wx.ready(function() {

    yes1.play();
    yes1.pause();
    yes2.play();
    yes2.pause();
})

var shakeNum = 0;
var shakeThreshold = 1000; //定义一个摇动的阈值
var lastTime = 0; //定义一个变量记录上一次摇动的时间
var x = 0, //定义x、y、z记录三个轴的数据以及上一次触发的时间
    y = 0,
    z = 0,
    last_x = 0,
    last_y = 0,
    last_z = 0;

/**
 * 摇一摇事件
 */
function rock(event) {
    // 获取重力加速
    var acceleration = event.accelerationIncludingGravity;

    var curTime = new Date().getTime(); //获取当前时间戳
    var diffTime = curTime - lastTime; //获取摇动的间隔

    if (diffTime > 100) {
        lastTime = curTime; //记录上一次摇动的时间
        x = acceleration.x; //获取加速度X方向
        y = acceleration.y; //获取加速度Y方向
        z = acceleration.z; //获取加速度垂直方向

        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; //计算阈值

        if (speed > shakeThreshold) {
            shakeNum++;
            yes1.play();


        }
        //记录上一次加速度
        last_x = x;
        last_y = y;
        last_z = z;
    }
    if (shakeNum > 5) {
        window.removeEventListener('devicemotion', rock);
        yes1.pause();
        yes2.play();

        typePage(1);
    }
}