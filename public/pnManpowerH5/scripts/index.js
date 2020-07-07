$(function () {
    if (window.innerHeight >= 1230) {
        $('.form-win').css({'padding-top': '210px'});
    }

    getWx();

    var index = 0;

    // 输入框失去焦点兼容苹果系统
    $('input,textarea,select').on('blur',function(){
        setTimeout(function () {
            var hasFocus = $('input').is(':focus') || $('textarea').is(':focus') || $('select').is(':focus');
            if (!hasFocus) {
                window.scroll(0,0);
            }
        },100);
    });

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

	// 打开海报页
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

        $.ajax({
            type: "GET",
            url: api.getInfo,
            data: {
                type: type,
                name: name,
                num: num,
            },
            headers: {
                isv: false,
                cpi: cpi,
            },
            success: function(res) {
                $('#loadingWrapper').hide();
                if (res.code == 200) {
                    if (res.data.length > 0) {
                        $('.name').html(res.data[0].name);
                        $('.area').html(res.data[0].area);
                        $('.state').find('span').html(res.data[0].attendingType);
                        var prize = [];
                        for (var i = 0; i < res.data.length; i++) {
                            prize.push(res.data[i].awardName);
                        }
                        prize = [...new Set(prize)];
                        console.log(prize);

                        var html = '';
                        for (var i = 0; i < prize.length; i++) {
                            if (i <= 7) {
                                html += '<div class="prize-item">' + prize[i] + '</div>';
                            }
                        }

                        $('.prize-list').html(html);
                        var length = $('.prize-item').length;
                        if (length > 4) {
                            $('.prize-list').addClass('active');
                        };
                        $('#poster').show();
                        $('.generate-btn').show();
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

    uploadImg(api.upload,'#uploadBtn');

    function uploadImg(url,btn) {
        var imgUpload = new upload({
            btn: btn,
            url: url,
            num: 50,
            fileType: ["jpg", "png", "gif", "JPG", "JPEG", "PNG",'jpeg'],
            fileSize: 8000,
            filter: function (file) {
                common.alert({
                    content: file.name + "文件类型错误"
                });
            },
            overSize: function (file) {
                common.alert({
                    content: file.name + "文件超过大小"
                });
            },
            overNum: function () {
                common.alert({
                    content: "超过数量"
                });
            },
            fileAdded: function (f) {
                var self = this;
                self.uploadFile(f.file,'');
            },
            progress: function (fileName, loaded, total) {
                var percent = parseInt((loaded / total) * 100);
            },
            success: function (res, file) {
                $('.upload-text').hide();
                $('.file').val('');
                var src = JSON.parse(file).src;
                getBase64(src.replace('http','https'),function (res) {
                    $('.upload-img').find('img').attr('src',res);
                });
            },
            error: function (res, file) {
                common.alert({
                    content: "上传失败"
                });
            },
            complete: function () {

            }
        })
    }


    // // 点击上传图片
    // $('#uploadBtn').on('click',function () {
    //     wx.chooseImage({
    //         count: 1,
    //         success: function (res) {
    //             var localIds = res.localIds[0];
    //
    //             $('#loadingWrapper').show();
    //
    //             wx.uploadImage({
    //                 localId: localIds,
    //                 isShowProgressTips: 0,
    //                 success: function (res) {
    //                     var serverId = res.serverId;
    //                     // $.ajax({
    //                     //     type: "POST",
    //                     //     url: api.upload,
    //                     //     data: {
    //                     //         mediaId: serverId,
    //                     //     },
    //                     //     headers: {
    //                     //         isv: false,
    //                     //         cpi: cpi,
    //                     //     },
    //                     //     success: function(res) {
    //                     //         var localSrc = res.data.src;
    //                     //         $('.upload-text').hide();
    //                     //         getBase64(localSrc,function (res) {
    //                     //             $('.upload-img').find('img').attr('src',res);
    //                     //             // canvas();
    //                     //         });
    //                     //     }
    //                     // })
    //                 }
    //             });
    //         }
    //     });
    // });

    // 生成海报
    $('.generate-btn').on('click',function () {
        var length = $('.upload-img').find('img').attr('src');
        if (length && length != '' && length.length > 0) {
            $('#loadingWrapper').show();
            canvas();
        } else {
            common.alert({
                mask: true,
                content: "请上传图片后再生成海报"
            });
        }

    });

    function canvas() {
        var shareContent = document.getElementById("poster"); //需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 1; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true, // 【重要】开启跨域配置
            allowTaint: true,//允许跨域图片
            taintTest: false,//是否在渲染前测试图片
        };

        html2canvas(shareContent, opts).then(function(canvas) {
            var context = canvas.getContext("2d");
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            // 【重要】默认转化的格式为png,也可设置为其他格式
            var img = document.createElement("img");
            img.src = canvas.toDataURL();
            img.className = "canvas abs";
            $("#poster").html(img);
            $(".canvas").css({
                display: "block",
                margin: '0 auto',
                '-webkit-touch-callout': 'none'
            });
            $('.tip').show();
            $('#loadingWrapper').hide();
            $('.generate-btn').hide();
        });
    };

    function getBase64(img,callback){
        var image = new Image();
        image.crossOrigin = '';
        image.src = img;
        var deferred=$.Deferred();
        if(img){
            image.onload =function (){
                return getBase64Image(image,function (res) {
                    // 这里接收返回的base64图片
                    callback(res);
                });
            };
        }
    }

    function getBase64Image(img,callback,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        callback(dataURL);
    }

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