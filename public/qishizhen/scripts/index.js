$(function () {
    var encode = Global.getUrlParam('encode');
    console.log(encode);
    if (encode != '' && encode != 'null') {
        $.ajax({
            url: api.getOrderInfo,
            type: 'GET',
            dataType: 'json',
            data:{
                encode: encode,
            },
            success: function(res) {
                if (res.code == 200) {
                    $('.title-wra').show();
                    var infor = res.result;
                    Global.requestTempByAjax('/qishizhen/temp/inforList.html', infor, function(template) {
                        $('.wrapper').append(template);
                    });
                } else {
                    $('.tips-text').html(res.msg);
                    $('.tips').show();
                }

                scroll.refresh();
            }
        });
    }
});