
var scoreDetailId; //签到明细id
var status; //领奖状态 

var lotteryRecordId; //扫码中奖id

var valiCount; //防伪次数

var advId;//广告id

$(function () {


    //判断是否公众号进入 0公众号 1扫码

    Func.entranceCheck(function (res) {
        if (res.code == 200) {
            var entranceType = res.data.entranceType

            if (entranceType == 0) {
                $('.header').hide()
                $('.banner').css('padding-top', '30px')
            } else {
                $('.headera').hide()

                // 添加参与记录
                Func.createJoinActInfo(function (res) {
                    if (res.code == 200) {
                        $('.banner').css('padding-top', '160px')
                        //扫码进入页面抽奖   
                        Func.lottery(function (res) {
                            var type = res.data.type //中奖类型
                            if (type == 0) {
                                var prizeAmount = res.data.redPack.prizeAmount //红包金额
                                var prizeName = res.data.redPack.prizeName  //红包
                                status = res.data.redPack

                                if (status == 0) {
                                    $('.wlq').show();
                                    $('.ylq').hide()
                                }

                                if (status == 1) {
                                    $('.ylq').show()

                                    $('.wlq').hide();
                                }

                                $('.jx1').html(prizeAmount + '元' + prizeName)
                            }
                            if (type == 1) {
                                var couponName = res.data.couponGrants[0].couponName //优惠券名称
                                var couponCode = res.data.couponGrants[0].couponCode //优惠券码
                                var beginTime = res.data.couponGrants[0].beginTime //有效时间

                                status = res.data.couponGrants[0].status

                                if (status == 0) {
                                    $('.wlq').show();
                                    $('.ylq').hide()
                                }

                                if (status == 1) {
                                    $('.ylq').show()

                                    $('.wlq').hide();
                                }

                                $('.jx1').html(couponName)
                                // $('.text2').html("兑换码"+couponCode)
                                // $('.text3').html("有效期至"+beginTime)
                            }

                            if (type == 2) {
                                var prizeName = res.data.materialObj.prizeName   //实物名称
                                status = res.data.materialObj.status

                                $('.jx1').html(prizeName)

                                if (status == 0) {
                                    $('.wlq').show();
                                    $('.ylq').hide()
                                }

                                if (status == 1) {
                                    $('.ylq').show()

                                    $('.wlq').hide();
                                }
                            }

                            if (type == 3) {
                                var point = res.data.point.point //积分数
                                var prizeName = res.data.point.prizeName  ///奖励名称  
                                status = res.data.point.status

                                $('.jx1').html(point + prizeName)


                                if (status == 0) {
                                    $('.wlq').show();
                                    $('.ylq').hide()
                                }

                                if (status == 1) {
                                    $('.ylq').show()

                                    $('.wlq').hide();
                                }
                            }


                            if (type == 4) {
                                var advOrigin = res.data.advOrigin.imgUrl; // 权益卷图片
    
    
                                var voucherLink = res.data.advOrigin.voucherLink //权益卷地址
    
                                $('.lj-bottom-left').remove()
    
                                $('.jiangxiang').html('<img src="' + advOrigin + '" alt="">')
    
                                $('.wlq').on('click', function () {
                                    window.location.href = voucherLink
                                })

                                if (status == 0) {
                                    $('.wlq').show();
                                    $('.ylq').hide()
                                }

                                if (status == 1) {
                                    $('.ylq').show()

                                    $('.wlq').hide();
                                }
                            }



                        })

                        $('#loadingWrapper').hide();
                    } else {
                        $('#loadingWrapper').hide();
                    }

                    if (res.code == 201) {
                        $('.lj-bottom').hide()

                        $('.lj-top').css('border', 'none')
                        $('.banner').css('padding-top', '50px')
                    }

                    if (res.code == 202) {
                        $('.banner').css('padding-top', '160px')
                        var prizeType = res.data.prizeType
                        lotteryRecordId = res.data.lotteryRecordId

                        if (prizeType == 0) {
                            var prizeAmount = res.data.prizeAmount//红包金额

                            var prizeName = res.data.prizeName  //红包

                            $('.jx1').html(prizeAmount + '元' + prizeName)
                        }

                        if (prizeType == 1) {
                            var prizeName = res.data.prizeName;
                            $('.jx1').html(prizeName)

                        }

                        if (prizeType == 2) {
                            var prizeName = res.data.prizeName;
                            $('.jx1').html(prizeName)
                        }

                        if (prizeType == 3) {
                            var prizeName = res.data.prizeName;
                            var prizeAmount = res.data.prizeAmount;
                            $('.jx1').html(prizeAmount + prizeName)
                        }

                        if (prizeType == 4) {
                            var advOrigin = res.data.advOrigin.imgUrl; // 权益卷图片


                            var voucherLink = res.data.advOrigin.voucherLink //权益卷地址

                            $('.lj-bottom-left').remove()

                            $('.jiangxiang').html('<img src="' + advOrigin + '" alt="">')

                            $('.wlq').on('click', function () {
                                window.location.href = voucherLink
                            })
                        }

                        if (status == 0) {
                            $('.wlq').show();
                            $('.ylq').hide()
                        }

                        if (status == 1) {
                            $('.ylq').show()

                            $('.wlq').hide();
                        }

                        $('#loadingWrapper').hide();
                    } else {
                        $('#loadingWrapper').hide();
                    }
                })
            }

            $('#loadingWrapper').hide();
        } else {
            $('#loadingWrapper').hide();
        }
    })





    //一键领取

    $('.wlq').on('click', function () {

        //是否关注公众号
        Func.isSubscribe(function (res) {
            if (res.code === 200) {
                if (res.data.subscribe) { //res1.data.subscribe 未关注
                    $('.gzhtc').show()

                } else {
                    //扫码领奖
                    Func.receiveLottery({
                        lotteryRecordId: lotteryRecordId
                    }, function (res) {
                        if (res.code == 200) {
                            var balanceScore = res.data.balanceScore; //剩余积分
                            var canJoinActNum = res.data.canJoinActNum //剩余次数

                            $('.balanceScore').text(balanceScore)
                            $('.canJoinActNum').text(canJoinActNum)

                            $(".wlq").hide()
                            $(".ylq").show()

                            $('#loadingWrapper').hide();
                        } else {
                            $('#loadingWrapper').hide();
                        }
                    })
                }
            } else {

                $('#loadingWrapper').hide();
                common.alert({
                    content: res1.msg,
                    mask: true
                });
            }
        })



    })






    //防伪查询
    Func.findEncodeFunction(function (res) {
        if (res.code === 200 || res.code === 201) {

            var message = res.data.securityCheckRecord.message; //

            valiCount = res.data.securityCheckRecord.valiCount;

            var productId = res.data.productId;   //商品id
            var productImagesUrl = res.data.productImagesUrl; //图片路径
            var productName = res.data.productName;  //商品名字

            if (productImagesUrl != '') {
                $('#productImagesUrl').attr('src', productImagesUrl)
            }
            $('.message').text(productName)
            $('.message').after(message)

            $('#loadingWrapper').hide();
        } else {

            $('#loadingWrapper').hide();

        }


        // 打开页面显示数据
        Func.queryUserInfo(function (res) {

            if (res.code == 200) {
                var continuitySignInNum = res.data.continuitySignInNum; //连续签到天数
                var todayIsSign = res.data.todayIsSign  //1已签到 0未签到
                var canJoinActNum = res.data.canJoinActNum //抽奖次数 0不可抽奖
                var signNum = res.data.signNum //总共签到人数

                var totalScoreNum = res.data.totalScoreNum //积分
                var balanceScore = res.data.balanceScore  //用户积分余额

                var nickname = res.data.nickname  //微信昵称
                var headimgurl = res.data.headimgurl  //微信头像


                var queryUserInfo;
                window.localStorage.setItem('queryUserInfo', JSON.stringify(res.data))


                var progress = Math.ceil(100 * balanceScore / totalScoreNum);

                if (progress > 100) {
                    var progressa = 100 + "%";
                } else {
                    var progressa = progress + '%';
                }

                $('.qd-img-imga').css('left', progressa)

                $('.canJoinActNum').text(canJoinActNum)
                $('.balanceScore').text(balanceScore)
                $('.totalScoreNum').text(totalScoreNum)

                $('.continuitySignInNum').text(continuitySignInNum)

                $('.signNum').text(signNum)

                $('.headimgurl').attr("src", headimgurl)
                $('.nickname').html(nickname)

                if (continuitySignInNum == 1) {
                    $('.qd-ts-y1').show()
                }
                if (continuitySignInNum == 2) {
                    $('.qd-ts-y1 ,.qd-ts-y2').show()
                }



                if (continuitySignInNum == 3) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3').show()
                }

                if (continuitySignInNum == 4) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3').show()
                }


                if (continuitySignInNum == 5) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3 ,.qd-ts-y4').show()
                }
                if (continuitySignInNum == 6) {

                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3 ,.qd-ts-y4,.qd-ts-y5').show()

                }

                if (continuitySignInNum == 7) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3 ,.qd-ts-y4,.qd-ts-y5').show()
                }

                if (todayIsSign == 1) {
                    $('.qiandaoy').show()
                } else {
                    $('.qiandaon').show()
                }


                //积分兑换参与活动次数
                if (balanceScore >= totalScoreNum && valiCount == 1) {


                    Func.scoreExchangeAct(function (res) {
                        if (res.code == 200) {
                            var canJoinActNum = res.data.canJoinActNum //剩余次数
                            var balanceScore = res.data.balanceScore  //用户积分余额
                            $('.canJoinActNum').text(canJoinActNum)
                            $('.balanceScore').text(balanceScore)
                            $('#loadingWrapper').hide();
                        } else {
                            $('#loadingWrapper').hide();
                        }

                    })
                }

                $('#loadingWrapper').hide();
            } else {

                $('#loadingWrapper').hide();

            }



        })

    });





    //点击连续签到天数
    $('.qiandaon').one('click', function () {
        Func.signIn(function (res) {
            if (res.code == 200) {
                $('.qiandaon').hide()
                $('.qiandaoy').show()
                var continuitySignInNum = res.data.continuitySignInNum; //连续签到天数
                var canJoinActNum = res.data.canJoinActNum //抽奖次数 0不可抽奖
                var scoreNum = res.data.scoreNum; //签到积分
                var signNum = res.data.signNum //总共签到人数
                scoreDetailId = res.data.scoreDetailId; //签到明细id

                $('.signNum').text(signNum)
                $('.continuitySignInNum').text(continuitySignInNum)
                $('.scoreNum').text(scoreNum)

                if (continuitySignInNum == 1) {
                    $('.qd-ts-y1').show()
                }
                if (continuitySignInNum == 2) {
                    $('.qd-ts-y1 ,.qd-ts-y2').show()
                }

                if (continuitySignInNum == 3) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3').show()
                }

                if (continuitySignInNum == 4) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3').show()
                }


                if (continuitySignInNum == 5) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3 ,.qd-ts-y4').show()
                }
                if (continuitySignInNum == 6) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3 ,.qd-ts-y4,.qd-ts-y5').show()
                }
                if (continuitySignInNum == 7) {
                    $('.qd-ts-y1 ,.qd-ts-y2 , .qd-ts-y3 ,.qd-ts-y4,.qd-ts-y5').show()
                }
                $('.qdtc').fadeIn()

                $('#loadingWrapper').hide();
            } else {
                $('#loadingWrapper').hide();
            }
        })

    })



    //点击领取积分
    $(".qdtc-con-btn").on('click', function () {
        Func.receiveScore({
            scoreDetailId: scoreDetailId
        }, function (res) {
            if (res.code == 200) {

                var balanceScore = res.data.balanceScore;
                var canJoinActNum = res.data.canJoinActNum //剩余次数

                $('.balanceScore').text(balanceScore)
                $('.canJoinActNum').text(canJoinActNum)

                $('.qdtc').fadeOut()

                $('#loadingWrapper').hide();



            } else {
                $('#loadingWrapper').hide();
            }

        })
    })



    //点击参与活动抽奖接口

    $('.joinAct').on('click', function () {


        Func.joinAct(function (res) {
            if (res.code == 200) {
                $('.lqlp').fadeIn()

                var type = res.data.type //中奖类型
                var balanceScore = res.data.balanceScore  //用户积分余额
                var canJoinActNum = res.data.canJoinActNum //剩余次数
                var prizeName = res.data.prizeName  ///奖励名称



                $('.canJoinActNum').text(canJoinActNum)
                $('.balanceScore').text(balanceScore)

                if (type == 0) {
                    var prizeAmount = res.data.redPack.prizeAmount //红包金额
                    var prizeName = res.data.redPack.prizeName  //红包

                    $('.text1').html(prizeAmount + '元' + prizeName)
                }
                if (type == 1) {
                    var couponName = res.data.couponGrants[0].couponName //优惠券名称
                    var couponCode = res.data.couponGrants[0].couponCode //优惠券码
                    var beginTime = res.data.couponGrants[0].beginTime //有效时间

                    $('.text1').html(couponName)
                    $('.text2').html("兑换码" + couponCode)
                    $('.text3').html("有效期至" + beginTime)
                }

                if (type == 2) {
                    var prizeName = res.data.materialObj.prizeName   //实物名称
                    $('.text1').html(prizeName)
                }

                if (type == 3) {
                    var point = res.data.point.point //积分数
                    var prizeName = res.data.point.prizeName  ///奖励名称                    
                    $('.text1').html(point + prizeName)

                }

                $('#loadingWrapper').hide();
            } else {
                $('#loadingWrapper').hide();
            }

        })
    })


	/**
	 * 本意首页广告列表查询
	 * 
	 */

    Func.getAdvByAdvPageName({
        pageName: "本意广告页"
    }, function (res) {
        if (res.code == 200) {
            var hdzq = res.data.hdzq;
            var mxdp = res.data.mxdp;


            var html = '';


            var html2 = '';
            var html3 = '';
            var html4 = '';
            for (var i in mxdp) {
                html += '<div class="swiper-slide itemclick">';
                html += '<img data-advId="' + mxdp[i].advId + '" data-href="' + mxdp[i].linkUrl + '" src="' + mxdp[i].picUrl + '" alt=""></<img>';
                html += '</div>';
            }
            $('#mxdp .swiper-wrapper').html(html)
            var swiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false,
                pagination: '.swiper-pagination',
            });






            for (var i in hdzq) {

                if (hdzq[i].orderby == 1) {
                    html2 += '<img data-advId="' + hdzq[i].advId + '"  data-href="' + hdzq[i].linkUrl + '" src="' + hdzq[i].picUrl + '" alt="">';

                } else if (hdzq[i].orderby == 2) {
                    html3 += '<img data-advId="' + hdzq[i].advId + '"  data-href="' + hdzq[i].linkUrl + '" src="' + hdzq[i].picUrl + '" alt="">';
                } else {
                    html4 += '<img data-advId="' + hdzq[i].advId + '" data-href="' + hdzq[i].linkUrl + '" src="' + hdzq[i].picUrl + '" alt="">';
                }
            }

            $('#hdzq1').html(html2)
            $('#hdzq2').html(html3)
            $('#hdzq3').html(html4)




            $('#loadingWrapper').hide();
            //浏览记录
            Func.browseRecord({
                pageName: "本意广告页"
            }, function () {
                if (res.code == 200) {
                    $('#loadingWrapper').hide();
                } else {
                    $('#loadingWrapper').hide();
                }
            })
        } else {
            $('#loadingWrapper').hide();
        }
    })


	/**
	 * 点击本意广告记录
	 * 
	 */


    var doc = $(document);
    doc.on('click', '.itemclick', function () {
        advId = $(this).find('img').attr('data-advId')
        var datahref = $(this).find('img').attr('data-href')
        console.log(advId, datahref)
        Func.clickRecord({
            advId: advId
        }, function (res) {
            if (res.code == 200) {
                window.location.href = datahref;
                $('#loadingWrapper').hide();
            } else {
                $('#loadingWrapper').hide();
            }
        })
    })






    //关闭抽奖弹窗
    $('.lqlp-gb').on('click', function () {
        $('.lqlp').fadeOut()

    })


    /* 活动说明弹窗 */
    // 打开活动说明
    $('#hdsm').on('click', function () {
        $('.hdsm').fadeIn()
    })
    //关闭活动说明
    $('.hdsm-qx').on('click', function () {
        $('.hdsm').fadeOut()
    })


    //关闭公众号
    $('.gzhtc-gb').on('click', function () {
        $('.gzhtc').fadeOut()
    })

})