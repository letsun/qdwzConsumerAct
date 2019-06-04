// var ip2 = 'http://192.168.1.20:8095/adv';
var ip2 = 'https://advp-api.lxcyhd.com/adv';
var adVApi = {
    advertisement: ip2 + '/platAdv/getAdvByAdvPositionName1', 					// 获取广告图
    pageRecord: ip2 + '/platAdv/addPageRecord', 									// 广告页面浏览统计
    browseRecord: ip2 + '/platBrowseRecord/browseRecord' 						// 广告点击浏览统计
};
$(function () {
    // 开始活动
    Func.findActivityByEncode(function(res) {
        if (res.code === 200 || res.code === 201 || res.code === 206) {
            Func.lottery(api.lottery,function (reg) {
                if (reg.code != 500) {
                    // 活动页面广告
                    getAdvByAdvPositionName('直接跳转到广告页面',function (red) {
                        var href = red.data[0].linkUrl;
                        browseRecord(function () {
                            window.location.href = href;
                        });
                    });
                }
            });
        } else {
            common.alert({
                mask: true,
                content: res.msg,
            })
        }
    });
});


function browseRecord(callback) {
    $.ajax({
        url: adVApi.pageRecord,
        type: 'GET',
        data: {
            city: '',
            district: '',
            province: ''
        },
        headers: getHeader(),
        dataType: 'json',
        success: function(res) {
            callback();
        }
    });
}

function getAdvByAdvPositionName(positionName, callback) {
    $.ajax({
        url: adVApi.advertisement,
        type: 'GET',
        data: {
            positionName: positionName
        },
        headers: getHeader(),
        dataType: 'json',
        success: function(res) {
            if (res.code === 200) {
                if(res.data != "") {
                    callback(res);
                }
            }
        }
    });
}