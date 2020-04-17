var intDiff = 60;

var lotteryRecordId; //中奖纪录id



$(function () {
	// 页面禁止滑动
	$('.container').on("touchmove", function (e) {
		e.preventDefault();
	});


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
	$('#hongbao').on('click', function () {
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
						$('.mask').fadeIn();
						$('.mask-con1').fadeIn()
						$('.mask-con1').find('.num').html(red.data.redPack.prizeAmount);
						userCash(prizeAmount, lotteryId);
					} else if (red.code == 201) {
						$('.mask').fadeIn()
						$('.mask-con2').fadeIn()
					} else {
						common.alert({
							mask: true,
							content: red.msg
						})
					}
				});
			} else if (res.code == 203) {
				$('#loadingWrapper').hide();
				$('.mask').fadeIn()
				$('.mask-con3').fadeIn()
			} else {
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg
				})
			}
		});

	})

	//关闭弹窗
    $('.mask-btn').on('click',function(){
        $('.mask').fadeOut();
        $('.mask-con').fadeOut()
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

