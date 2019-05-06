// 没有类型
var NO_TYPE = 0;

// 活动背景图类型
var IMAGE_TYPE = 1;

// 活动外部链接类型
var URL_TYPE = 2;


$(function() {

    var doc = $(document);
    var speed = 300; // 动画速度

    var rotate = 360;

    var perRotate = rotate / 6;

    // 大转盘
    doc.on('click', '.js-dzpBtn', function() {

        // ajax得到的值
        // var rand = Math.floor(Math.random() * 6);

        Func.lottery(url, function(res) {

            var rand = 0;

            if (res.data.prizeId == 0) {
                rand = 0;
            } else {
                for (var i = 0, len = dzpAwardItem.length; i < len; i++) {
                    if (dzpAwardItem[i].prizeId === res.data.prizeId) {
                        rand = dzpAwardItem[i].prizeIndex + 1;
                        break;
                    }
                }
            }

            if (rand === 3 || rand === 4) {
                rand += 1;
            } else if (rand >= 5) {
                rand = 3;
            }

            var totalRotate = rotate * 4 + perRotate * rand;
      
            $('.js-dzpCon').css({
                'transition': 'transform 4s cubic-bezier(.68,.06,.39,.97)',
                'transform': 'rotate(' + (-totalRotate) + 'deg)'
            });

        });

    });

    // 大转盘动画结束
    doc.on('transitionend', '.js-dzpCon', function() {
        var timer = setTimeout(function() {
            $('.js-resultWrapper').fadeIn(speed, function() {
                if (scroll1) {
                    scroll1.refresh();
                }
            }).addClass('show');
        }, 500);
    });

    // 关闭
    doc.on('click', '.js-closeResultBtn', function() {
        $('.js-resultWrapper').fadeOut(speed);
        $('#page1').hide();
    });

    // 开红包
    doc.on('click', '.js-openAwardBtn', function() {
        // 抽奖
        Func.lottery(url, function() {
            $('.js-awardWrapper').fadeOut(speed).removeClass('show');
            $('.js-resultWrapper').fadeIn(speed, function() {
                if (scroll1) {
                    scroll1.refresh();
                }
            }).addClass('show');
        });
    });

    doc.on('click', '.js-closeResultBtn', function() {
        $('.js-resultWrapper').fadeOut(speed).removeClass('show');
        $('.js-dzpWrapper').fadeOut(speed);
        $('.js-awardWrapper').fadeOut(speed);
        $('.js-zjdWrapper').fadeOut(speed);
        $('#page1').fadeOut(speed);
    });


    // 选金蛋
    var jdIndex = 0;
    doc.on('click', '.js-jdWrapper li', function() {
        jdIndex = $(this).index();

        $('.js-jdResult img').attr('src', $(this).attr('data-noZ'));
        $('.js-jdResult').fadeIn();

    });

    var flag = false;

    // 砸金蛋
    doc.on('click', '.js-jdResult', function() {
        if (flag) {
            return;
        }

        flag = true;

        $('.js-hammer').fadeIn(10).addClass('animate');

        var that = $(this);

        var timer1 = setTimeout(function() {

            // 抽奖
            Func.lottery(url, function() {

                that.addClass('vibration');
                $('.js-hammer').fadeOut(10).removeClass('animate');

                var timer2 = setTimeout(function() {
                    that.removeClass('vibration');
                    
                    $('.js-jdResult img').attr('src', $('.js-jdWrapper li').eq(jdIndex).attr('data-result'));
                    $('.js-effect').fadeIn(speed);

                    $('.js-resultWrapper').fadeIn(speed, function() {
                        if (scroll1) {
                            scroll1.refresh();
                        }
                    }).addClass('show');

                }, 1000);
            });

        }, 500);    
    });

    doc.on('click', '#tip', function() {
        $(this).fadeOut();
    });

    doc.on('click', '#closeErweima-btn', function() {
        $('#erweimaWrapper').fadeOut();
    });

});