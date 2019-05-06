$(function() {
    var doc = $(document);

    $('.obtain-btn').on('click',function () {
        $(this).hide();
        $.ajax({
            url: api.createJoinActInfo,
            type: 'GET',
            dataType: 'json',
            headers: getHeader(),
            success: function(res) {
                // 找活动
                Func.findActivityByEncode(function (res) {
                    if (res.code === 200 || res.code === 201) {
                        $('#loadingWrapper').show();

                        Func.lottery(api.lottery,function (res) {
                            $('#loadingWrapper').hide();

                            if(res.code == 200) {
                                $(".award-info").find(".txt2").html(res.data.redPack.prizeAmount + "<span>元</span>");
                                $(".award-info").find('.txt2').show();
                                $(".award-info").find('.txt3').show();

                                Func.userCash({
                                    amount: res.data.redPack.prizeAmount,
                                    cashType: 0,
                                    lotteryId: res.data.lotteryId
                                },function() {
                                    if(res.code == 200) {

                                    } else {
                                        common.alert({
                                            content: "红包发送失败"
                                        })
                                    }
                                })
                            } else {
                                $(".award-fail").show();
                            }
                        })
                    } else if (res.code === 203) {
                        $(".code-status").html("您无抽奖机会<br />请扫新码参与活动").show();
                    }
                });
            },
        });
    })
});



