$(function () {
    if (window.innerHeight >= 1230) {
        $('.form-win').css({'padding-top': '210px'});
    }

    getWx();

    // 输入框失去焦点兼容苹果系统
    $('input,textarea,select').on('blur',function(){
        setTimeout(function () {
            var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
            if (!hasFocus) {
                window.scroll(0,0);
            }
        },100);
    });

    var index = 0;

	// 点击tab切换
	$('.nav-item').on('click',function () {
		$(this).addClass('active').siblings('.nav-item').removeClass('active');
		$('.form-input').val('');
		index = $(this).index();
		if (index == 0) {
			$('.form-input2').show();
		} else {
            $('.form-input2').hide();
		}
    });

    // 点击信息查询
    $('.open-poster').on('click',function () {
        var name = $('#name').val();
        var num = $('#num').val();
        var type = '外勤';
        if (index == 0) {
            type = '外勤';
        } else {
            type = '内勤';
            num = '';
        }

        if ($.trim(name) == '') {
            common.alert({
                mask: true,
                content: '姓名不能为空',
            });
            return false;
        }

        if (index == 0) {

            if ($.trim(num) == '') {
                common.alert({
                    mask: true,
                    content: '工号不能为空',
                });
                return false;
            }
        }

        $('#loadingWrapper').show();
        var data = {};
        if (index == 0) {
            data =  {
                type: type,
                name: name,
                num: num,
            };
        } else {
            data =  {
                type: type,
                name: name,
            };
        }

        $.ajax({
            type: "GET",
            url: api.getInfo,
            data: data,
            headers: {
                isv: false,
                cpi: cpi,
            },
            success: function(res) {
                $('#loadingWrapper').hide();
                if (res.code == 200) {
                    if (res.data.length > 0) {
                        $('#name2').html(res.data[0].name ? res.data[0].name : '────');
                        $('#seat').html(res.data[0].seat ? res.data[0].seat : '────');

                        $('#car_no').html(res.data[0].carNo ? res.data[0].carNo : '────');
                        $('#address').html(res.data[0].address ? res.data[0].address : '────');

                        var round = [];
                        if (res.data[0].round != '') {
                            round = res.data[0].round.split(',');
                            var html = '';
                            for (var i = 0; i < round.length; i++) {
                                html += '<div>' + round[i] + '</div>';
                            }
                            $('#round').html(html);
                        } else {
                            $('#round').html('────');
                        }
                        $('.info-win').show();
                    } else {
                        common.alert({
                            mask: true,
                            content: '该员工信息不存在',
                        })
                    }

                }

            }
        });
    });

    // 获取微信签名
    function getWx() {
        $.ajax({
            url: api.jssdk,
            type: 'GET',
            dataType: 'json',
            headers: {
                isv: false,
                cpi: cpi,
            },
            data: {
                thisurl: window.location.href.split('#')[0],
            },
            success: function(res) {
                if (res.code == '00') {
                    // 微信分享
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.autAppid, // 必填，公众号的唯一标识
                        timestamp: res.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.nonceStr, // 必填，生成签名的随机串
                        signature: res.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow'
                            /**'scanQRCode',
                             'chooseWXPay',
                             'openProductSpecificView'
                             'addCard',
                             'chooseCard',
                             'openCard'**/
                        ]
                    });

                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: '2020第二届人力高峰盛典', // 分享标题
                            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: location.protocol + "//" + location.hostname + '/pnManpowerH5/images/1_6.png', // 分享图标
                            success: function () {

                            }
                        });
                        // 分享给朋友
                        wx.onMenuShareAppMessage({
                            title: '2020第二届人力高峰盛典', // 分享标题
                            desc: '高峰盛典专属海报', // 分享描述
                            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: location.protocol + "//" + location.hostname + '/pnManpowerH5/images/1_6.png', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {

                            }
                        });
                    });
                }
                //callback(res);
            }
        });
    }
});