$(function() {

    var signature = '';

    Func.getPersonCenter(function(res) {
        $('#avator').html('<img src="' + res.data.headimage + '" >');
        $('#nickname').text(res.data.nikeName);
        $('#historyAmount').text(currency('', res.data.historyAmount));
        $('#balance').text(currency('', res.data.balance));

        signature = res.data.signature;
    });

    // 点击提现
    $('#container').on('click', '#withdraw-btn', function() {
        
        var res = Global.initValidate('#form');

        $('#amount').blur();

        if (!res) {
            return;
        }

        Func.userCash({
            amount: $('#amount').val(),
            cashType: 1,
            signature: signature
        }, function(res) {
            $('#historyAmount').text(currency('', parseFloat($('#historyAmount').text()) + parseFloat($('#amount').val())));
            $('#balance').text(currency('', $('#balance').text() - $('#amount').val()));
        });

    });

    
})