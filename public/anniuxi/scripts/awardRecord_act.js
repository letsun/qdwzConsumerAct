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


    //点击收货
    // $('.content').on('click', '.btncolor2', function () {
    //     var prizeName = $(this).parent().attr('data-prizeName');

    //     console.log(prizeName)
    //     $('.mask').fadeIn()
    // })

    /**
     * 渲染数据
     * @param  object data 需要的数据
     * @return null
     */
    function render(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {

            html += '<div class="content-item" data-prizeName="' + data[i].prizeName + ' ">';
            html += '<div class="item-img">';

            if (data[i].prizeType == 0) {
                html += '<img src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/anniuxi/1_44.png">';
            } else {
                html += '<img src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/anniuxi/1_45.png">';
            }


            html += '</div>';
            html += '<div class="item-text">';
            html += '<div class="text1">' + data[i].prizeName + ' </div>';
            html += '<div class="text2">' + data[i].createDate + '</div>';
            html += '</div>';
            if (data[i].status == 0) {
                html += '<div class="item-btn btncolor1">未领取</div>';
            } else if (data[i].status == 1) {
                html += '<div class="item-btn btncolor1">已发货</div>';
            }
            html += '</div>';
        }

        $('.list').append(html);

        scroll.finishPullUp();
        scroll.refresh();
    }

    // 初始化数据
    function initData() {
        Func.lotteryRecord({
            page: page,
            limit: 20
        }, function (res) {
            var data = res.data;

            if (res.code === 200) {
                // common.alert({
                //     content: JSON.stringify(res),
                //     mask: true
                // });

                hasNext = data.hasNext;
                render(data.lotteryRecordList);

                if (data.lotteryRecordList.length > 20) {
                    $('#loading').show();
                }else{
                    $('#loading').text('暂无数据')
                }
            }

            $('#loadingWrapper').hide();
        });
    }
})(jQuery);
