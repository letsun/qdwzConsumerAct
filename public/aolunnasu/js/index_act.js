$(function () {

	var str = window.location.href;
	var search = "resultType=0";
	var start = str.indexOf(search);//获得字符串的开始位置
	var result = str.substring(start, start + search.length);//截取字符串

	var status; //0未领奖 1已领奖 2领取失败
	console.log(result)

	if (result == "resultType=0") {
		$('.text-title').html('验证为正品');
		$('.footer').hide();
	} else {
		$.ajax({
			url: api.findScanNum,
			type: 'POST',
			dataType: 'json',
			data: {},
			headers: getHeader(),
			success: function (res) {
				$('.scanNum').text(res.data.scanNum);
				$('.scanDate').text(res.data.scanDate)
			},
			error: function (res) {

			}

		});

		Func.createJoinActInfo(function (res) {
			if (res.code == 200) {
				findActivityByEncode()
				status = 4
			} if (res.code == 201) {
				status = 5
			} else if (res.code == 202) {
				status = res.data.status
			}
		})

	}


	//参与抽奖
	function findActivityByEncode() {
		Func.findActivityByEncode(function (res) {
			$('#loadingWrapper').hide();
			if (res.code === 200 || res.code === 201) {
				$('#loadingWrapper').show();
				Func.lottery(api.lottery, function (red) {
					$('#loadingWrapper').hide();
					if (red.code === 200) {
						$('.num').html(red.data.point.point);
						// $('.mask').fadeIn();
						// $('.mask-con2').fadeIn()
						status = 6
						var prizeId = red.data.prizeId;
						var score = red.data.point.point;
						var lotteryId = red.data.lotteryId;
						beijianpoint(prizeId, score);
					} else if (red.code === 201) {
						//    $('.content1').show();
						//    $('#hb').fadeIn();
					} else {
						common.alert({
							mask: true,
							content: red.msg
						})
					}
				});

			} else if (res.code === 203) {
				$('.mask').fadeIn();
				$('.mask-con5').fadeIn()
			} else {
				common.alert({
					mask: true,
					content: res.msg
				})
			}
		});
	}



	// 点击开启积分
	$('.submit').on('click', function () {
		console.log(status)
		if (status == 6 || status == 0) {
			$('.mask').fadeIn();
			$('.mask-con2').fadeIn()
		} else if (status == 5) {
			$('.mask').fadeIn();
			$('.mask-con5').fadeIn()
		} else if (status == 1) {
			$('.mask').fadeIn();
			$('.mask-con5').fadeIn()
		}

	})

	$('.container').on('click', '.mask', function () {
		$('.maskcon').fadeOut();
		$('.mask').fadeOut();
	})

	$('.mask-btn').on('click', function (e) {

		e.stopPropagation();

		$('.mask-con2').hide();
		$('.mask-con3').fadeIn();
	})


	// 自动提现
	function beijianpoint(prizeId, score) {
		$.ajax({
			url: api.beijianpoint,
			type: 'POST',
			dataType: 'json',
			data: {
				prizeId: prizeId,
				score: score,
				// lotteryId:lotteryId,
			},
			headers: getHeader(),
			success: function (res) {

			},
			error: function (res) {

			}

		});
	}




})