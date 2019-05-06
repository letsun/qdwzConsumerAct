$(function() {
    var doc=$(document);


    var isWithdrawSuc=true;    // 是否提现成功
    // 点击提现
    doc.on('click','#withdraw-btn',function() {
        var withdrawNum=$('#withdraw-num').val();

        if ($.trim(withdrawNum)=='') {
            common.alert({
                mask:true,
                content:"提现金额不能为空"
            });

            return false;
        }

        if (isWithdrawSuc) {

            $('#withdrawal-suc-win').fadeIn();

        } else {
            $('#withdrawal-err-win').fadeIn();
        }
    });

    //点击关闭提现成功弹窗
    doc.on('click','#withdrawal-suc-close',function() {
        $('#withdrawal-suc-win').fadeOut();
    });

    //点击关闭提现失败弹窗
    doc.on('click','#withdrawal-err-close',function() {
        $('#withdrawal-err-win').fadeOut();
    });

})