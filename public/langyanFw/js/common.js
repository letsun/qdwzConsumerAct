var common = {};

var timer = [];

(function($) {
    var baseUrl = "http://order.letsun.com.cn/";
    common.cfg = {
        companyId: "205", //企业id

        shareStat: baseUrl + "w/wxutil/addShareSumUrl/", //统计分享量
        totalStat: baseUrl + "w/wxutil/writePvuv/", //统计访问量
        getOpenId: baseUrl + "w/crossDomain/", //获取open id
        apply: baseUrl + "w/crossDomain/submitData/", //报名
        checkSubmit: baseUrl + "w/crossDomain/queryResume/", //查询是否提交过资料
        getScore: baseUrl + "w/crossDomain/queryFans/", //查询游戏分数和粉丝助力列表
        getRank: baseUrl + "w/crossDomain/queryRankinglist/", //获取排行榜
        submitScore: baseUrl + "w/crossDomain/submitGamescore/", //提交分数
        submitHelp: baseUrl + "w/crossDomain/submitHelp/", //提交好友助力

        checkLottery: baseUrl + "w/crossDomain/querylottly/", //查询是否中奖
        lottery: baseUrl + "w/crossDomain/lottly/", //抽奖
        winnerMes: baseUrl + "w/crossDomain/submitBuyer/" //中奖人数据提交
    };

    /**
     * @func common.alert()
     * @desc 弹框组件
     * @param cfg
     * @param cfg.title {string} 弹框标题，默认为没有标题
     * @param cfg.content {string} 弹框内容
     * @param cfg.width {string} 弹框宽度
     * @param cfg.dialog {boolean} 是否是对话框，默认为否
     * @param cfg.ok {function} 点击确定的回调函数
     * @param cfg.okValue {string} 确定按钮的文字，默认为确定
     * @param cfg.cancel {function} 点击取消的回调函数
     * @param cfg.cancelValue {string} 取消按钮的文字，默认为取消
     * @param cfg.textAlign {string} 文字方向，默认为居中
     * @param cfg.mask {boolean} 是否有遮罩层，默认为没有
     */
    common.alert = function(cfg) {
        //设置默认值
        var ok = cfg.ok || function() {};
        var okValue = cfg.okValue || "确定";
        var cancel = cfg.cancel || function() {};
        var cancelValue = cfg.cancelValue || "取消";
        var dialog = cfg.dialog || false;
        var textAlign = cfg.textAlign || "center";
        var width = cfg.width || "60%";

        //生成随机ID
        var id = Math.ceil(Math.random() * 1000000);

        var con = '<div class="alert" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;';

        //判断是否添加遮罩层
        if (cfg.mask) {
            con += 'background-color: rgba(0, 0, 0, 0.5);';
        }

        con += '-webkit-transition: ease-out 0.3s; -moz-transition: ease-out 0.3s;-ms-transition: ease-out 0.3s; -o-transition: ease-out 0.3s;' +
            'transition: ease-out 0.3s;z-index:9999;opacity:0"><div style="position: absolute;top: 40%;left:50%;width: ' + width +
            ';background-color: #fff;border-radius: 10px;overflow: hidden;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);' +
            '-ms-transform: translate(-50%,-50%); -o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);box-shadow: 3px 3px 10px #666">';

        //判断是否有标题
        if (cfg.title) {
            con += '<div style="font-size: 24px;line-height: 60px;text-align: center;color: #60a0ff;">' + cfg.title + '</div>' +
                '<div style="font-size: 24px;color: #555;padding: 20px;line-height:30px;text-align:' + textAlign + ';border-bottom: 1px solid #ccc;' +
                'word-break:break-all;word-wrap:break-word;position:relative">' + cfg.content + '</div>';
        } else {
            con += '<div style="font-size: 24px;color: #555;padding: 40px 20px;line-height:30px;text-align:' + textAlign + ';border-bottom: 1px solid #ccc;' +
                'word-break:break-all;word-wrap:break-word;position:relative">' + cfg.content + '</div>';
        }

        //判断弹框类型，如果为对话框则显示确定和取消按钮
        if (dialog) {
            con += '<div><button style="width: 48%;height: 70px;border: none;background: none;font-size: 24px;padding: 0;outline: none" ' +
                'id="dCancel' + id + '">' + cancelValue + '</button><button style="width: 48%;height: 70px;border: none;background: none;' +
                'font-size: 24px;padding: 0;color: #60a0ff;outline: none;" id="dConfirm' + id + '">' + okValue + '</button></div></div>';
        } else {
            con += '<div><button style="width: 100%;height: 70px;border: none;background: none;font-size: 24px;' +
                'padding: 0;color: #60a0ff;outline: none;" id="dConfirm' + id + '">' + okValue + '</button></div></div></div>';
        }

        //向页面添加弹框
        $("body").append(con);

        //延时添加过渡效果
        setTimeout(function() {
            $(".alert").css("opacity", 1);
        }, 30);

        //取消按钮事件
        $("#dCancel" + id).on("click", function() {
            $(this).parents(".alert").remove();
            cancel();
        });

        //确定按钮事件
        $("#dConfirm" + id).on("click", function() {
            $(this).parents(".alert").remove();
            ok();
        });
    };

    /**
     * @desc 隐藏动画元素
     * @func common.hideEle()
     */
    common.hideEle = function() {
        $(".ani").hide();
    };

    /**
     * @desc 添加动画
     * @func common.animate()
     * @param ele {object} 需要添加动画的元素
     */
    common.animate = function(ele) {
        var num = 0;
        ele.each(function() {
            var self = $(this);
            timer[num] = setTimeout(function() {
                self.show();
                self.css({
                    "-webkit-animation": self.data("animate")
                });
            }, self.data('delay'));
            num++;
        });
    };

    /**
     * @desc 移除动画
     * @func common.removeAni()
     * @param ele {object} 需要移除动画的元素
     */
    common.removeAni = function(ele) {
        for (var i = 0; i < timer.length; i++) {
            clearTimeout(timer[i]);
        }
        ele.hide();
        ele.each(function() {
            var self = $(this);

            self.css({
                "-webkit-animation": "none"
            });
        });
    };

    /**
     * @desc 页面切换动画
     * @param p1 {object} 当前页
     * @param p2 {object} 下一页
     */
    common.turnPage = function(p1, p2) {
        p1.css("-webkit-animation", "fadeOut 1s");

        setTimeout(function() {
            p2.show();
            common.removeAni(p1.find(".ani"));
            p1.css("-webkit-animation", "none").hide();

            common.animate(p2.find(".ani"));
        }, 700);
    };

    /**
     * @desc 显示页面加载百分比
     * @param ele {Object} 显示百分比的元素
     */
    common.loading = function(ele, callback) {
        var loadpicarray;
        var picloaded = 0;

        loadpicarray = document.getElementsByTagName("img");
        picloaded = 0;
        for (var i = 0; i < loadpicarray.length; i++) {
            var img = new Image();
            img.onload = function() {
                picloaded++;
                var lstr = Math.ceil(100 * picloaded / loadpicarray.length) + "%";
                $(ele).html(lstr);
                if (picloaded === loadpicarray.length-1) {
                    callback();
                }
            };
            img.src = loadpicarray[i].src;
        }
    };
})(jQuery);