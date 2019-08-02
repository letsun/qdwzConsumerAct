$(function () {

	Func.findActivityByEncode(function (res) {
	    $('#loadingWrapper').hide();
	    if (res.code === 200 || res.code === 201) {
	        
	    } else if (res.code === 203) {
			$('.content2').show();
	        $('#hb').fadeIn();
	    } else {
	        common.alert({
	            mask:true,
	            content:res.msg
	        })
	    }
	});
		
	// 点击开启红包
	$('#reviceBtn').on('click',function () {
		Func.findActivityByEncode(function (res) {
		    $('#loadingWrapper').hide();
		    if (res.code === 200 || res.code === 201) {
				$('#loadingWrapper').show();
				Func.lottery(api.lottery,function (red) {
				    $('#loadingWrapper').hide();
				    if (red.code === 200) {
						$('.content').find('.num').html(red.data.redPack.prizeAmount);
				        $('.content').show();
				        $('#hb').fadeIn();
						$('.content').show();
						userCash(red.data.redPack.prizeAmount,red.data.lotteryId);
				    } else if (red.code === 201) {
				       $('.content1').show();
				       $('#hb').fadeIn();
				    } else {
				        common.alert({
				            mask:true,
				            content:red.msg
				        })
				    }
				});
		        
		    } else if (res.code === 203) {
				$('.content2').show();
		        $('#hb').fadeIn();
		    } else {
		        common.alert({
		            mask:true,
		            content:res.msg
		        })
		    }
		});
		
	})
	
	
	
	// 自动提现
	function userCash(num,lotteryId) {
	    $.ajax({
	        url: api.userCash,
	        type: 'GET',
	        dataType: 'json',
	        data:{
	            lotteryId:lotteryId,
	            amount:num,
	            cashType:0,
	        },
	        headers: getHeader(),
	        success: function(res) {
	          
	        },
	        error:function (res) {
	           
	        }
	
	    });
	}
	
})