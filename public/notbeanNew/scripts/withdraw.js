$(function() {

    // 点击提现
    $('#container').on('click', '#withdraw-btn', function() {
        var withdrawalAmount = $('#withdrawalAmount').val();

        if ($.trim(withdrawalAmount) == '') {
            common.alert({
                content: "请输入提现金额"
            })

            return false;
        }
    });

    var scroll = new BScroll(document.getElementById('rebate-container'), {
        pullUpLoad: {
            threshold: -30
        }
    });

    // 下拉加载更多
    scroll.on('pullingUp', function() {

        $('#tip').html('正在加载中...');

        $.ajax({
            type: 'GET',
            url: './../resource/data/data.json',
            dataType: 'json',
            success: function(res) {

                let html = ``;
                if (res.length > 0) {
                    for (var i = 0, len = res.length; i < len; i++) {
                        html += `<li class="item" data-style="true" style="display: none;">${res[i].title}<span class="time">${res[i].date}</span></li>`
                    }
                    $('#rebate-list').append(html);
                    $('#rebate-list .item[data-style]').fadeIn();
                    $('#tip').html('下拉加载更多');

                } else {
                    $('#tip').html('已经加载完成');
                }

                scroll.refresh();
                scroll.finishPullUp()
            }
        });

    });
})