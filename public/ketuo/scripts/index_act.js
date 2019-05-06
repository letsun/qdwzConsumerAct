
$(function() {
    var doc = $(document);
    // 找活动
    Func.findActivityByEncode(function (res) {
        if (res.code === 200 || res.code === 201) {
            $('#loadingWrapper').show();

            Func.lottery(api.lottery, function (res) {
                $('#loadingWrapper').hide();
                if (res.code === 200) {
                    $(".award-point").fadeIn();
                    $(".num").find("span").html(res.data.point.point);

                } else if (res.code === 201) {
                    $(".award-none").fadeIn();
                } else {
                    common.alert({
                        mask: true,
                        content: res.msg
                    })
                }
            });

        } else if (res.code === 203) {
            $(".code-scanned").fadeIn();
        } else {
            common.alert({
                mask: true,
                content: res.msg
            })
        }
    });
});



