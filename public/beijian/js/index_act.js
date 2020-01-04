$(function () {

	// $('.submit').on('click',function() {
	// 	$('.mask').fadeIn();
	// 	$('.mask-con1').fadeIn();
	// })


	$('.mask-close').on('click',function(){
		$('.mask').fadeOut();
		$('.mask-con').fadeOut();
	})
	// 点击开启积分
	$('.submit').on('click',function () {
		Func.findActivityByEncode(function (res) {
		    $('#loadingWrapper').hide();
		    if (res.code === 200 || res.code === 201) {
				$('#loadingWrapper').show();
				Func.lottery(api.lottery,function (red) {
				    $('#loadingWrapper').hide();
				    if (red.code === 200) {
						$('.num').html(red.data.point.point);
						$('.mask').fadeIn();
						$('.mask-con1').fadeIn()

						var prizeId =  red.data.prizeId ;
						var score =  red.data.point.point;
						var lotteryId = red.data.lotteryId;
						beijianpoint(prizeId,score,lotteryId);
				    } else if (red.code === 201) {
				    //    $('.content1').show();
				    //    $('#hb').fadeIn();
				    } else {
				        common.alert({
				            mask:true,
				            content:red.msg
				        })
				    }
				});
		        
		    } else if (res.code === 203) {
				$('.mask').fadeIn();
				$('.mask-con2').fadeIn();
		    } else {
		        common.alert({
		            mask:true,
		            content:res.msg
		        })
		    }
		});
		
	})
	
	
		// 自动提现
		function beijianpoint(prizeId,score,lotteryId) {
			$.ajax({
				url: api.beijianpoint,
				type: 'POST',
				dataType: 'json',
				data:{
					prizeId:prizeId,
					score:score,
					lotteryId:lotteryId,
				},
				headers: getHeader(),
				success: function(res) {
				  
				},
				error:function (res) {
				   
				}
		
			});
		}
	
})