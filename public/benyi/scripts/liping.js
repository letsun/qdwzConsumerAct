var main = {};

var hasNext = true;
var page = 1;
var lotteryRecordId
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
            Func.lotteryRecord({
                prizeType:2,
                page: page,
                limit: 10,
                status:status
            }, function (res) {
                var data = res.data;
                if (res.code === 200) {
                    hasNext = data.hasNext;

                    render(data.lotteryRecordList);

                    $('#loading').text('下拉加载更多...');
                } else {
                    common.alert({
                        content: res.msg,
                        mask: true
                    });
                }
            });
        });
    };


    $('.header-con a').on('click', function () {
        var index = $(this).index();
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');

        $('#content .content').hide();

        $('#content .content').eq(index).show();


        $(".content-item").remove();
        page = 1 //初始化加载页面数据

        if(index==0){

            status = 0;
            $('.header-con-item:first-child img').attr('src','/benyi/images/2_6.png')
            $('.header-con-item:nth-child(2) img').attr('src','/benyi/images/2_10.png')
            // $('.header-con-item:nth-child(3) img').attr('src','/benyi/images/2_11.png')
        }

        if(index==1){
            status = 1;
            $('.header-con-item:first-child img').attr('src','/benyi/images/2_9.png')
            $('.header-con-item:nth-child(2) img').attr('src','/benyi/images/2_7.png')
            // $('.header-con-item:nth-child(3) img').attr('src','/benyi/images/2_11.png')
        }

        // if(index==2){
        //     $('.header-con-item:first-child img').attr('src','/benyi/images/2_9.png')
        //     $('.header-con-item:nth-child(2) img').attr('src','/benyi/images/2_10.png')
        //     $('.header-con-item:nth-child(3) img').attr('src','/benyi/images/2_8.png')
        // }


        Func.lotteryRecord({
            prizeType:2,
            page: page,
            limit: 10,
            status:status
        }, function (res) {
            var data = res.data;
    
            if (res.code === 200) {
                hasNext = data.hasNext;
                render(data.lotteryRecordList);
    
                if (data.lotteryRecordList.length >= 20) {
                    $('#loading').show();
                }
            }
    
            $('#loadingWrapper').hide();
        });
    })


    $('#list').on('click', '.weilinqu', function () {
        var _this = $(this)
        lotteryRecordId = $(this).attr('data-lotteryRecordId')
        
        //是否关注公众号
        Func.isSubscribe(function (res) {
            if (res.code === 200) {
                if (res.data.subscribe) { //res1.data.subscribe 未关注
                    $('.gzhtc').show()
                } else {
                    //扫码领奖
                    Func.receiveLottery({
                        lotteryRecordId: lotteryRecordId
                    }, function (res) {
                        if (res.code == 200) {
                            $('.lqlp').fadeIn().delay(500).fadeOut(function () {
                                _this.parents('.content-item').remove();

                            });
    
                            $('#loadingWrapper').hide();
                        } else {
                            $('#loadingWrapper').hide();
                        }
                    })
                }
            } else {
    
                $('#loadingWrapper').hide();
                // common.alert({
                //     content: res.msg,
                //     mask: true
                // });
            }
        })
    

    })
})(jQuery);


// 初始化数据
function initData() {

    var status = 0;
    Func.lotteryRecord({
        prizeType:2,
        page: page,
        limit: 10,
        status:status
    }, function (res) {
        var data = res.data;

        if (res.code === 200) {
            hasNext = data.hasNext;
            render(data.lotteryRecordList);

            if (data.lotteryRecordList.length >= 10) {
                $('#loading').show();
            }
        }

        $('#loadingWrapper').hide();
    });
}




/**
 * 渲染数据
 * @param  object data 需要的数据
 * @return null
 */
function render(data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += ' <div class="content-item">';
        html += '<div class="content-item-left">'+ data[i].prizeName+'</div>';
        html += '<div class="content-item-middel">'+ data[i].createDate+'</div>';

        if (status==0){
            html += '<div class="content-item-right"><a class="weilinqu"  data-lotteryRecordId="' + data[i].lotteryRecordId + '">待领取</a></div>';
        }else{
            html += '<div class="content-item-right"><a class="yilinqu" >已领取</a></div>';
        }
        
        html += '</div>';
    }


    $('#list').append(html);

    scroll.finishPullUp();
    scroll.refresh();
}

