$(function() {
    var NO_NOTICE = 0; // 未关注
    var NOTICED = 1; // 已关注

    var doc = $(document);
    var notice_type = NOTICED; // 关注类型

    var speed = 300; // 动画速度

    var rotate = 360;

    var perRotate = rotate / 6;


    doc.on('click', '.js-dzpBtn', function() {
        
        // ajax得到的值

        var rand = Math.floor(Math.random() * 6); 

        var totalRotate = rotate * 3 + perRotate * rand;    

        $('.js-dzpCon').css({'transition': 'transform 2s ease-in-out', 'transform': 'rotate(' + (-totalRotate) + 'deg)'});
        
    });

    doc.on('transitionend', '.js-dzpCon', function() {
        $('.js-resultWrapper').fadeIn(speed, function() {
            scroll1.refresh();
        }).addClass('show');
    });

    doc.on('click', '.js-closeResultBtn', function() {
        $('.js-resultWrapper').fadeOut(speed);
    });

    doc.on('click', '.js-openAwardBtn', function() {
        $('.js-awardWrapper').fadeOut(speed).removeClass('show');
        $('.js-resultWrapper').fadeIn(speed).addClass('show');
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
            that.addClass('vibration');
            $('.js-hammer').fadeOut(10).removeClass('animate');
        }, 500);

        var timer2 = setTimeout(function() {
            that.removeClass('vibration');
            
            $('.js-jdResult img').attr('src', $('.js-jdWrapper li').eq(jdIndex).attr('data-result'));
            $('.js-effect').fadeIn(speed);
        }, 1000);

        var timer3 = setTimeout(function() {
            $('.js-resultWrapper').fadeIn(speed).addClass('show');
        }, 1500);
    });


});

function showSeletMe(con) {
    var item = $(con).find('div');

    var timer = null;
    var index = 0;

    timer = setInterval(function() {
       
        if (index === 3) {
           index = 0; 
           item.eq(1).hide();
           item.eq(2).hide();
        }

        item.eq(index).fadeIn(400);
        index++;

    }, 800);
}

