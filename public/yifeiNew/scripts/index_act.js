var index = 0;
var prizeAmount;
var lotteryId;
var lotteryData = {};
var awardValue;
var isClick = true;
var yes1 = new Audio();
/*var yes2 = new Audio();*/
var yes3 = new Audio();

yes1.src = "/yifeiNew/audio/xuanzhuan.mp3";
/*yes2.src = "/yifeiNew/audio/baozha.mp3";*/
yes3.src = "/yifeiNew/audio/chenggong.mp3";
wx.config({
    debug:false,
    appId:'',
    timestamp:1,
    nonceStr:'',
    signature:'',
    jsApiList:[]
});

wx.ready(function(){
    yes1.play();
	yes1.pause();
	/*yes2.play();
	yes2.pause();*/
    yes3.play();
	yes3.pause();
});
$(function() {

	$(document).on('click','img',function () {
		return false;
    });

	// 关闭公众号弹窗
	$('#attent-btn').on('click', function() {
		$('#attent-win').fadeOut();
	});

	// 点击遮罩阻止冒泡
	$('#container').on('click','.layer-item',function (e) {
        e.stopPropagation();
        return false;
    });

    // 点击阻止冒泡
    $('#container').on('click','.positive-item',function (e) {
        e.stopPropagation();
        return false;
    });

    // 点击阻止冒泡
    $('#container').on('click','.award-item-bg',function (e) {
        e.stopPropagation();
        return false;
    });

	// 点击抽奖
	$('#container').on('click', '.award-item', function() {
		if (!isClick) {
			$('#loadingWrapper').hide();
			common.alert({
				mask: true,
				content: '抽奖尚未结束，请稍候',
			});
			return false;
		}
		isClick = false;
		awardValue = $(this).find('.num').html();
		index = $(this).index();
		Func.findActivityByEncode(function(res) {
			if (res.code === 200 || res.code === 201) {
				Func.isSubscribe(function(res1) {
					if (res1.code === 200) {
						if (!res1.data.subscribe) { //res1.data.subscribe
							isClick = true;
							$('#loadingWrapper').hide();
							$('#attent-win').fadeIn();
						} else {
							Func.lottery(api.lottery, function(reg) {
								lotteryData = reg;
								$('#loadingWrapper').hide();
                                yes1.play();
								$('.award-item').addClass('active');
								if (lotteryData.code == 200) {
									prizeAmount = lotteryData.data.redPack.prizeAmount;
									if (lotteryData.data.lotteryId > 0) {
										lotteryId = lotteryData.data.lotteryId;
									}

									$('.award-item').each(function(i, item) {
										var value = $(item).find('.num').html();

										if (value == prizeAmount) {
											$(item).find('.num').html(awardValue);
										}
									})
								}
								setTimeout(function() {
									$('.award-item').addClass('lottActive');
								}, 500);
							})
						}
					} else {
						isClick = true;
						$('#loadingWrapper').hide();
						common.alert({
							content: res1.msg,
							mask: true
						});
					}
				});

			} else {
				isClick = true;
				$('#loadingWrapper').hide();
				$('#attent-wina').fadeIn();
			}
		});
	});

	// 监听动画结束
	$('#container').on('transitionend', '.back-item', function() {
		isClick = true;
		$(".baoza img:first-child").show();
			/*yes2.play();*/
			
		$(".baoza img:nth-child(2)").show();
		setTimeout(function() {
			yes3.play();
			$(".baoza").hide();		
			$(".baoza img").attr('src','https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_8.png')		
			$('.layer').show();	
			$('.award-item').find('.layer-item').show();
			$('.award-item').eq(index).find('.layer-item').hide();
			$('.award-item').eq(index).css('z-index','2');
			$('.award-item').find('.award-item-bga').show();
			$('.award-item').eq(index).find('.award-item-bg').fadeIn();
			$('.back-item').hide();
            $('.openPublic-btn').show();
			if (lotteryData.code == 200) {
				prizeAmount = lotteryData.data.redPack.prizeAmount;
				if (lotteryData.data.lotteryId > 0) {
					lotteryId = lotteryData.data.lotteryId;
					$('.award-item').eq(index).find('.num').html(prizeAmount);
					$('.award-item').eq(index).find('.award-title').html('恭喜您获得');
					$('.award-item').find('.award-dec1').show();
					// userCash(prizeAmount,lotteryId);
				}
			
			} else if (lotteryData.code == 201) {
				$('.award-item').eq(index).find('.award-title').html('很遗憾');
				$('.award-item').eq(index).find('.award-dec2').show();
				$('.award-item').eq(index).siblings().find('.award-dec1').show();
			} else {
				$('#loadingWrapper').hide();
				common.alert({
					mask: true,
					content: res.msg,
				})
			}
			
			$('.positive-item').fadeIn();	
		},1500);
	});

	// 开始活动
	Func.findActivityByEncode(function(res) {
		$('#loadingWrapper').hide();
		var prizes = res.data.prizes;
		var html = '';
		for (var i = 0, len = prizes.length; i < len; i++) {

			html += '<div class="award-item">';
			html += '<div class="positive-item">';
			html += '<div class="award-dec award-dec1">';
			html += '<div class="amount"><span class="num">' + prizes[i].amount + '</span>元</div>';
			html += '</div>';
			html += '<div class="award-dec award-dec2">';
			html += '<div class="amount">未中奖</div>';
			html += '</div>';
			html += '</div>';
			html += '<div class="back-item"></div>';
			html += '<img class="award-item-bg" src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_5.png"alt="">';
			html += '<div class="layer-item"><img src="https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_14.png"></div>';
			html += '</div>';
		}
		$('.award-list').html(html);
		if (res.code === 200 || res.code === 201 || res.code === 206) {
			
		} else {
			$('#attent-wina').fadeIn();
		}
	});

	// 关闭二维码弹窗
	$('#attent-btn').on('click', function() {
		$('#attent-win').fadeOut();
	});
	
	
	// 被扫二维码弹窗关闭
	$('#attent-btna').on('click',function () {
	    $('#attent-wina').fadeOut();
	});

    // 打开公众号
    $('.openPublic-btn').on('click',function () {
        $('#openPub-win').fadeIn();
    });

    // 关闭公众号
    $('#close-pub').on('click',function () {
        $('#openPub-win').fadeOut();
    });

});

// 自动提现
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
		success: function(res) {

		},
		error: function(res) {
			common.alert({
				mask: true,
				content: res.msg,
			})
		}
	});
}
