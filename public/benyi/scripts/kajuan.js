var main = {};

var hasNext = true;
var page = 1;

var status =0; //0未使用 1已使用 2已过期

(function ($) {
    'use strict';

    main.init = function () {
        initData();

        scroll.on('pullingUp', function () {
            if (!hasNext) {
                $('#loading').text('已经没有更多数据了');
                return;
            }

            $('#loading').text('正在加载中...');

            page++;

            // 拉取数据
            Func.findCoupon({
                status: status,
                pageSize: page,
                pageNum: 5
            }, function (res) {
                var data = res.data;
                if (res.code === 200) {
                    hasNext = data.hasNext;

                    render(data.couponList);

                    $('#loading').text('上滑加载更多...');
                } else {
                    common.alert({
                        content: res.msg,
                        mask: true
                    });
                }
            });
        });
    };
})(jQuery);



$('.header-con a').on('click', function () {
    var index = $(this).index();
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $(".content-item").remove();

    page = 1 //初始化加载页面数据
    if (index == 0) {
        status = 0   
        
        $('.header-con-item:nth-child(1) img').attr('src','/benyi/images/9_7.png')
        $('.header-con-item:nth-child(2) img').attr('src','/benyi/images/9_8.png')
        $('.header-con-item:nth-child(3) img').attr('src','/benyi/images/9_9.png')
    } else if (index == 1) {
        status = 1;   

        $('.header-con-item:nth-child(1) img').attr('src','/benyi/images/9_10.png')
        $('.header-con-item:nth-child(2) img').attr('src','/benyi/images/9_11.png')
        $('.header-con-item:nth-child(3) img').attr('src','/benyi/images/9_9.png')
    } else {
        status = 2;

        $('.header-con-item:nth-child(1) img').attr('src','/benyi/images/9_10.png')
        $('.header-con-item:nth-child(2) img').attr('src','/benyi/images/9_8.png')
        $('.header-con-item:nth-child(3) img').attr('src','/benyi/images/9_12.png')
    }

    Func.findCoupon({
        status: status,
        pageSize: page,
        pageNum: 5
    }, function (res) {
        var data = res.data;
        if (res.code === 200) {
            hasNext = data.hasNext;
            render(data.couponList);
            if (data.couponList.length >= 5) {
                $('#loading').show();
            }
        }
        $('#loadingWrapper').hide();
    });



})


// 初始化数据
function initData() {

    var status = 0;
    Func.findCoupon({
        status: status,
        pageSize: page,
        pageNum: 5
    }, function (res) {
        var data = res.data;

        if (res.code === 200) {
            hasNext = data.hasNext;
            render(data.couponList);

            if (data.couponList.length >= 20) {
                $('#loading').show();
            }
        }

        $('#loadingWrapper').hide();
    });
}


//时间戳转换
function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    return y + '-' + m + '-' + d;
};

/**
 * 渲染数据
 * @param  object data 需要的数据
 * @return null
 */
function render(data) {

    var html = '';

    for (var i = 0; i < data.length; i++) {

        if (status==0){
            if (data[i].couponType == 0) {

                html += '<div class="content-item" style="background:url(/benyi/images/9_3.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].price + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else if (data[i].couponType == 1) {
                html += '<div class="content-item" style="background:url(/benyi/images/9_6.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '<span>' + data[i].discount + '</span>折';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else if (data[i].couponType == 2) {
                html += '<div class="content-item" style="background:url(/benyi/images/9_5.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].price + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else {
                html += '<div class="content-item" style="background:url(/benyi/images/9_4.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].reducePrice + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            }
        }else if(status==1){

            
            if (data[i].couponType == 0) {

                html += '<div class="content-item" style="background:url(/benyi/images/9_19.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].price + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else if (data[i].couponType == 1) {
                html += '<div class="content-item" style="background:url(/benyi/images/9_20.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '<span>' + data[i].discount + '</span>折';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else if (data[i].couponType == 2) {
                html += '<div class="content-item" style="background:url(/benyi/images/9_21.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].price + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else {
                html += '<div class="content-item" style="background:url(/benyi/images/9_22.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].reducePrice + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            }
        }else{
            if (data[i].couponType == 0) {

                html += '<div class="content-item" style="background:url(/benyi/images/9_15.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].price + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else if (data[i].couponType == 1) {
                html += '<div class="content-item" style="background:url(/benyi/images/9_16.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '<span>' + data[i].discount + '</span>折';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else if (data[i].couponType == 2) {
                html += '<div class="content-item" style="background:url(/benyi/images/9_17.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].price + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            } else {
                html += '<div class="content-item" style="background:url(/benyi/images/9_18.png) no-repeat">';
    
                html += '<div class="content-item-left">';
                html += '¥<span>' + data[i].reducePrice + '</span>';
                html += '<p>' + data[i].name + '</p>';
    
                html += '</div>';
            }          
        }


        html += '<div class="content-item-right">';
        html += '<p>有效期至</p>';
        html += '<p>' + formatDateTime(data[i].endTime) + '</p>';
        html += '<span>编号:' + data[i].couponCode + '</span>';
        html += '</div>';
        html += '</div>';
    }



    $('#list').append(html);

    scroll.finishPullUp();
    scroll.refresh();
}

