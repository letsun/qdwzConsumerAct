$(function () {

	// $('.submit').on('click',function() {
	// 	$('.mask').fadeIn();
	// 	$('.mask-con1').fadeIn();
	// })

	$.ajax({
		url: api.findScanNum,
		type: 'POST',
		dataType: 'json',
		data:{},
		headers: getHeader(),
		success: function (res) {
			$('.scanNum').text(res.data.scanNum);

			$('.scanDate').text(res.data.scanDate)
		},
		error: function (res) {

		}

	});






	// 点击开启积分
	$('.submit').on('click', function () {
		Func.findActivityByEncode(function (res) {
			$('#loadingWrapper').hide();
			if (res.code === 200 || res.code === 201) {
				$('#loadingWrapper').show();
				Func.lottery(api.lottery, function (red) {
					$('#loadingWrapper').hide();
					if (red.code === 200) {
						$('.num').html(red.data.point.point);
						$('.mask').fadeIn();
						$('.mask-con2').fadeIn()

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

	})

	$('.container').on('click','.mask',function(){
		$('.maskcon').fadeOut();
		$('.mask').fadeOut();
	})

	$('.mask-btn').on('click',function(e){
		
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