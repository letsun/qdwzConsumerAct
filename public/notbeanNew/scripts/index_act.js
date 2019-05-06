var doc = $(document);
var intDiff = 59; //验证码倒计时总秒数量
var backInterval;
var nickName;

$(function() {
    var app = $('#app');

    var isClick = false;

    $(document).on('click', '#openRedPackage', function(e) {

        if (isClick) {
            return;
        }

        isClick = true;

        Func.getPersonCenter(function(res) {
            if (res.code === 200) {
                nickName = res.data.nikeName;
                lottFuc();
            } else {
                common.alert({
                    content: res.msg,
                    mask: true
                });
            }

            $('#loadingWrapper').hide();
        });
    });


});

function lottFuc() {
    Func.lottery(api.lottery, function(res) {
        if (res.code === 200 || res.code === 201) {

            Global.requestTempByAjax('/notbean/temp/result.ejs', res, function(template) {
                $('#resultWrapper').html(template);
                $('#resultWrapper').fadeIn();

            });

            if (res.code === 200 && res.data.redPack.prizeAmount) {
                Func.userCash({
                    amount: res.data.redPack.prizeAmount,
                    cashType: 0
                }, function() {});
            }
        } else {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });
}