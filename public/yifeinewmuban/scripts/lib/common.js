var common = {};

var timer = [];

(function ($) {
    var baseUrl = "https://order.letsun.com.cn/";
    common.cfg = {
        companyId: "259",//企业id
        placeId: "212",//区域id

        shareStat: baseUrl + "w/wxutil/addShareSumUrl/",                      //统计分享量
        totalStat: baseUrl + "w/wxutil/writePvuv2/",                           //统计访问量
        getOpenId: baseUrl + "w/crossDomain/",                                //获取open id
        apply: baseUrl + "w/crossDomain/submitData/",                         //报名
        checkSubmit: baseUrl + "w/crossDomain/queryResume/",                  //查询是否提交过资料
        getScore: baseUrl + "w/crossDomain/queryFans/",                       //查询游戏分数和粉丝助力列表
        getRank: baseUrl + "w/crossDomain/queryRankinglist/",                 //获取排行榜
        submitScore: baseUrl + "w/crossDomain/submitGamescore/",              //提交分数
        submitHelp: baseUrl + "w/crossDomain/submitHelp/",                    //提交好友助力
        checkLottery: baseUrl + "w/crossDomain/querylottly/",                 //查询是否中奖
        lottery: baseUrl + "w/crossDomain/lottly/",                           //抽奖
        winnerMes: baseUrl + "w/crossDomain/submitBuyer/"                     //中奖人数据提交
    };



    /**
 * @desc 微信分享
 * @func common.wxShare()
 * @param cfg.title {String} 分享的标题
 * @param cfg.desc {String} 分享的描述
 * @param cfg.link {String} 分享的链接
 * @param cfg.imgUrl {String} 分享的图片链接
 * @param cfg.isStat {Boolean} 是否统计分享量
 */
    common.wxShare = function (cfg) {
        var reurl = window.location.href.split('#')[0];

        /**微信分享内容*/
        var shareData = {
            title: cfg.title,
            desc: cfg.desc,
            link: cfg.link,
            imgUrl: cfg.imgUrl,
            trigger: function (res) {
                //common.alert('用户点击发送给朋友');
            },
            success: function (res) {
                //分享成功
                if (cfg.isStat) {
                    addShareSumUrl(reurl);
                }
            },
            cancel: function (res) {
                //取消分享
            },
            fail: function (res) {
                //分享失败
            }
        };

        var isWxBrowser = wxJs.isWeixin();

        //微信浏览器登陆 先获取wxno  设置客户
        if (isWxBrowser) {
            //微信分享
            wx_Share(reurl, shareData);
        }
    };



    /**
 * @desc 分享量统计
 * @param url
 */
    function addShareSumUrl(url) {
        var shareUrl = common.cfg.shareStat + common.cfg.companyId;

        $.ajax({
            type: 'GET',
            url: shareUrl,
            dataType: 'jsonp',
            data: {
                url: url.split('?')[0],
                ts: (new Date()).getTime()
            },
            jsonp: 'addShareSumUrl',
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                //alert("请求出错!");
            },
            success: function (msg) {
                if (msg.status == "true") {
                    //alert("请求提交成功!");
                } else {
                    //alert("处理出错!");
                }
            }
        });
    }

})(jQuery);