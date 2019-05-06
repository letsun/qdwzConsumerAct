$(function() {
    var timer = null;
    var count = 0;
    var index = 0;
    var delay = 300;
    var isClick = true;

    // 点击抽奖
    $('#lottery-btn').on('click',function () {
        if (!isClick) {
            common.alert({
                mask: true,
                content: '抽奖尚未结束，请稍候',
            });
            return false;
        }
        isClick = false;
        timer = setInterval(lottery, delay);
    });

    // 九宫格方法
    function lottery() {
        index = count % 8;
        $('.award-item').eq(index).addClass('active').siblings().removeClass('active');
        count++;
        delay -= 100;
        if (delay <= 80) {
            delay = 80;
        }
        if (count >= 16) {
            delay += 130;
        }
        clearInterval(timer);
        console.log(count);
        timer = setInterval(lottery, delay);
        if (count >= 24 && count % 8 == 2) {
            clearInterval(timer);
            setTimeout(function () {
                $('.result-win').fadeIn(function () {
                    isClick = true;
                    count = 0;
                    index = 0;
                    delay = 500;
                    $('.award-item').removeClass('active');
                });
            },1000);

        }

    };

    // 关闭关注二维码弹窗
    $('.close-attent').on('click',function () {
        $('.attent-win').fadeOut();
    });


    // 关闭抽奖结果弹窗
    $('.close-result').on('click',function () {
        $('.result-win').fadeOut();
    });

    // 关闭未中奖弹窗
    $('.close-notWon').on('click',function () {
        $('.notWon-win').fadeOut();
    });

    // 关闭该码已被扫弹窗
    $('.close-scan').on('click',function () {
        $('.scan-win').fadeOut();
    });
});





