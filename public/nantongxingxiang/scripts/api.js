var dev = 'http://192.168.1.41:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = dev;

var api = {
	isSubscribe: ip + '/wechat/isSubscribe', 									// 查询是否关注公众号接口
	productVerificationFunc:ip + '/consumerActivity/nantxx/productVerificationFunc',				//验证
	getVerCode: ip + '/smscode/getVerCode', 									// 获取手机短信验证码
};