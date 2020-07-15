var dev = 'http://192.168.1.57:8085';
var test = 'https://test-api.lxcyhd.com';
var production = 'https://api.lxcyhd.com';

var ip = production;
// var cpi = 188;
var cpi = 355;

var api = {
    getInfo: ip + '/qdwz/wk/personnel/info/getInfo1',  // 获取员工信息
    jssdk: ip + '/qdwz/wechat/jssdk',    // 获取微信签名
};