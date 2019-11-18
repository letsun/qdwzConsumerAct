var intDiff = 60;

var lotteryRecordId; //中奖纪录id



$(function () {
	// 页面禁止滑动
	$('.container').on("touchmove", function (e) {
		e.preventDefault();
	});
	/**加载进度*/
	common.loading($("#percent"), function () {

		$('.loading').hide();
		$('.container').fadeIn();
	});

	// 打开弹窗滑动
	// var scrollWra = new BScroll('.huodong-con-text', {
	// 	click: true,
	// })

    /**打开弹出了解活动*/
    $('.container-img1').on('click', function () {
		$('.huodong').fadeIn();
		
		// scrollWra.refresh();
	})
	
    $('.huodong-con-img2').on('click', function () {
        $('.huodong').fadeOut()
    })

	/**关闭公众号弹窗*/

	$('.gzh-con-img3').on('click', function () {
		$('.gzh').hide()
	})




	Func.findActivityByEncode(function (res) {
		$('#loadingWrapper').hide();
		if (res.code === 200 || res.code === 201) {

		} else if (res.code == 202) {

			lotteryRecordId = res.data.lotteryRecordId;
			$('.hb-con1').find('.num').html(res.data.prizeAmount);
			$('.hb-con').hide();
			$('.hb-con1').show();
			$('#hb').fadeIn();
		} else if (res.code === 203) {
			$('.hb-con').hide();
			$('.hb-con3').show();
			$('#hb').fadeIn();
		} else {
			common.alert({
				mask: true,
				content: res.msg
			})
		}
	});

	// 点击开启红包
	$('#hbbtn').on('click', function () {
		$('#loadingWrapper').show();
		Func.findActivityByEncode(function (res) {
			if (res.code == 200 || res.code == 201) {
				Func.lottery(function (red) {
					$('#loadingWrapper').hide();
					if (red.code == 200) {
						if (red.data.lotteryId > 0) {
							lotteryId = red.data.lotteryId;
						}
						var prizeAmount = red.data.redPack.prizeAmount;
						
						$('.hb-con').hide();
						$('.hb-con1').find('.num').html(red.data.redPack.prizeAmount);
						$('.hb-con1').show();
						$('#hb').fadeIn();
						
						userCash(prizeAmount, lotteryId);
					} else if (red.code == 201) {
						$('.hb-con').hide();
						$('.hb-con2').show();
						$('#hb').fadeIn();
					} else {
						common.alert({
							mask: true,
							content: red.msg
						})
					}
				});

			} else if (res.code == 203) {
				$('#loadingWrapper').hide();
				$('.hb-con').hide();
				$('.hb-con3').show();
				$('#hb').fadeIn();
			} else {
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg
				})
			}
		});

	})


	$('.hb-con-btn').on('click',function(){
		
		$('.hb-con-item').hide();
		$('.hb').fadeOut();


		Func.isSubscribe(function (res) {
			if (res.code == 200) {
				if (!res.data.subscribe) { //!res1.data.subscribe 未关注
					$('#loadingWrapper').hide();
					$('.gzh').show()
				}else{
					$('#loadingWrapper').hide();
				} 
			} else {
				$('#loadingWrapper').hide();
			}
		})
	})


    // // 自动提现
    function userCash(num, lotteryId) {
        $.ajax({
            url: api.userCash,
            type: 'GET',
            dataType: 'json',
            data: {
                lotteryId: lotteryId,
                amount: num,
                cashType: 0,
            },
            headers: getHeader(),
            success: function (res) {

            },
            error: function (res) {

            }

        });
    }





	


})

