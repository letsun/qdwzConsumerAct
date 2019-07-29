var main = {};

var hasNext = true;
var page = 1;


var lotid1_1, lotid1_2, lotid1_3, lotid1_4, lotid1_5, lotid1_6, lotid2;
var kxRes1, kxRes2, kxRes3, kxRes4;

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
                pageSize: page,
                pageNum: 20
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

            html += '<li class="money-item">';

            if (data[i].prizeType === 0) {
                html += '<a href="javascript:void(0);">';
                html += '<div class="title">红包' + data[i].prizeAmount + '元</div>';
                html += '<div class="btn">已领取</div>';
            } else if (data[i].prizeType === 3) {
                html += '<a href="javascript:void(0);">';
                html += '<div class="title">' + data[i].prizeName + '</div>';
                html += '<div class="btn">已领取</div>';
            } else if (data[i].prizeType === 4) {
                html += '<a href="' + data[i].openOriginUrl + '">';
                html += '<div class="title">' + data[i].prizeName + '</div>';
                html += '<div class="btn">查看详情</div>';
            }

            html += '<div class="time">' + data[i].createDate + '</div>';

            html += '</a>';
            html += '</li>';
        }

        $('#money-list').append(html);

        scroll.finishPullUp();
        scroll.refresh();
    }

    // 初始化数据
    function initData() {
        Func.lotteryRecord({
            pageSize: page,
            pageNum: 20
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
