var yes1 = new Audio();
/*var yes2 = new Audio();*/
var yes3 = new Audio();

yes1.src = "/yifei/audio/xuanzhuan.mp3";
/*yes2.src = "/yifei/audio/baozha.mp3";*/
yes3.src = "/yifei/audio/chenggong.mp3";
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
/*	yes2.play();
	yes2.pause();*/
    yes3.play();
	yes3.pause();
});
$(function () {
    var index = 0;

    $(document).on('click','img',function () {
        return false;
    })

    // 关闭公众号弹窗
    $('#attent-btn').on('click',function () {
        $('#attent-win').fadeOut();
    });

    $('#container').one('click','.award-item',function () {
		yes1.play();
        index = $(this).index();
        $('.award-item').addClass('active');
		$('.award-item').find('.positive-item').hide();
    });

    // 监听动画结束

	$('.back-item').on('transitionend', function() {		
		$(".baoza img:first-child").show();
		$(".baoza img:nth-child(2)").show();
		setTimeout(function() {
			yes3.play();
			$(".baoza").hide();		
			$(".baoza img").attr('src','https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/yifeiNew/1_8.png');
			$('.layer').show();	
			$('.award-item').find('.layer-item').show();
			$('.award-item').eq(index).find('.layer-item').hide();
			$('.award-item').eq(index).css('z-index','2');
			$('.award-item').find('.award-item-bga').show();
			$('.award-item').eq(index).find('.award-item-bg').fadeIn();
			$('.back-item').hide();
			$('.award-item').find('.award-dec1').show();
			$('.positive-item').fadeIn();
			$('.openPub-btn').show();
		},1500);

	});


	// 打开公众号
	$('.openPublic-btn').on('click',function () {
		$('#openPub-win').fadeIn();
    });

    // 关闭公众号
    $('#close-pub').on('click',function () {
        $('#openPub-win').fadeOut();
    });
	
		//被扫二维码弹窗关闭
	$('#attent-btna').on('click',function () {
	    $('#attent-wina').fadeOut();
	});
});

// var yes1 = new Audio();
// var yes2 = new Audio();

