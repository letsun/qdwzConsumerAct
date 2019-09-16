var index = 0;
var prizeAmount;
var lotteryId;
var lotteryData = {};
var awardValue;
var src = 'https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/pangaoshou/1_19.png';

$(function() {
	// 点击活动规则
	$('#viewRules').on('touchend',function () {
	    $('#rules-win').fadeIn();
	});
	
	// 点击关闭活动规则
	$('#rules-btn').on('click',function () {
	    $('#rules-win').fadeOut();
	});
	
	// 关闭温馨提示弹窗
	$('#close-warm').on('click',function () {
	    $('#warm-win').fadeOut();
	});
	
	// 关闭未激活弹窗
	$('#close-inact').on('click',function () {
	    $('#inactivated-win').fadeOut();
	});
	
	// 关闭该码已被扫弹窗
	$('#close-received').on('click',function () {
	    $('#received-win').fadeOut();
	});
	
	//查询二维码参与活动
	Func.findActivityByEncode(function (res) {
	    if (res.code === 200 || res.code === 201) {
	        $('#loadingWrapper').hide();
	    } else if (res.code === 203) {
	        $('#loadingWrapper').hide();
			/* common.alert({
			    mask:true,
			    content: res.msg,
				
				
			}) */
			$('#loadingWrapper').hide();
			$("#receive-btn").hide();
			$("#received-win").show();
			$(".win-text").html("该优惠券已被领取");
			
	    } else {
	        $('#loadingWrapper').hide();
	        common.alert({
	            mask:true,
	            content: res.msg,
	        })
	    }
	});

	// 点击抽奖
	$('#receive-btn').on('click', function() {
	debugger
        $('#loadingWrapper').show();
		$("#receive-btn").attr("src","https://wunong-1254182596.cos.ap-chengdu.myqcloud.com/shop/2/1.gif");
		
		//查询二维码参与活动
		Func.findActivityByEncode(function (res) {
		    if (res.code === 200 || res.code === 201) {
		        $('#loadingWrapper').hide();
				Func.toLottery(api.lottery, function(reg) {
				    $('#loadingWrapper').hide();
				    if (reg.code == 200) {
				       $("#winning-win").show();
					   $(".coupon-wra").show();
					   $("#receive-btn").hide();
					   
				    } else if (reg.code == 201) {
						$("#winning-win").show();
						$("#nwon-img").show();
				        $(".win-text").html(reg.msg);
				    } else {
				        /* common.alert({
				            content: reg.msg,
				            mask: true
				        }); */
						
						$('#loadingWrapper').hide();
						$("#received-win").show();
						$(".win-text").html("该优惠券已被领取");
				    }
				})
		    } else if (res.code === 203) {
				
				//该红包已领取，页面上
		        $('#loadingWrapper').hide();
				$("#received-win").show();
				$(".win-text").html("该优惠券已被领取");
				
				/* common.alert({
				    mask:true,
				    content: res.msg,
				}) */
		    } else {
		        $('#loadingWrapper').hide();
		        common.alert({
		            mask:true,
		            content: res.msg,
		        })
		    }
		});
	});

	// 关闭页面
	$('.close-lottery').on('click',function () {
        WeixinJSBridge.call('closeWindow');
    })

});

