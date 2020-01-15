$(function() {

    // 点击提现
    $('#container').on('click','#withdraw-btn',function() {
        var withdrawalAmount=$('#withdrawalAmount').val();

        if ($.trim(withdrawalAmount)=='') {
            common.alert({
                content:"请输入提现金额"
            })

            return false;
        }
    })
})