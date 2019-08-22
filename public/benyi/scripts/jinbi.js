var main = {};

var hasNext = true;
var page = 1;
var index;

var lotteryRecordId

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
                prizeType: 3,
                page: page,
                limit: 20
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

    /**
     * 渲染数据
     * @param  object data 需要的数据
     * @return null
     */
    function render(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<div class="content-item">';
            html += '<div class="content-item-left"> ' + data[i].prizeAmount + ' '+data[i].prizeName+' </div>';
            html += '<div class="content-item-middel">' + data[i].createDate + '</div>';

            if (data[i].status == 0) {
                html += '<div class="content-item-right"><a class="weilinqu" data-lotteryRecordId="' + data[i].lotteryRecordId + '">待领取</a></div>';
            }
            if (data[i].status == 1) {
                html += '<div class="content-item-right"><a class="yilinqu">已领取</a></div>';
            }
            html += '</div>';
        }

        $('#list').append(html);

        scroll.finishPullUp();
        scroll.refresh();
    }

    // 初始化数据
    function initData() {
        Func.lotteryRecord({
            prizeType:3,
            page: page,
            limit: 20
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
    }



})(jQuery);



$('#list').on('click', '.weilinqu', function () {

    lotteryRecordId = $(this).attr('data-lotteryRecordId')
    var _this = $(this)
    //是否关注公众号
    Func.isSubscribe(function (res) {
        if (!res.code === 200) {
            if (res.data.subscribe) { //res1.data.subscribe 未关注
                $('.gzhtc').show()
            } else {
                //扫码领奖
                Func.receiveLottery({
                    lotteryRecordId: lotteryRecordId
                }, function (res) {
                    if (res.code == 200) {

                        $('.lqlp').fadeIn().delay(500).fadeOut(function () {
                            _this.removeClass('weilinqu').addClass('yilinqu').html('已领取');
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

//关闭公众号
$('.gzhtc-gb').on('click', function () {
    $('.gzhtc').fadeOut()
})