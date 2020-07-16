var dev = 'http://192.168.1.57:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var dev1 = 'http://192.168.1.57:8085';
var test1 = 'https://test-api.lxcyhd.com';
var production1 = 'https://api.lxcyhd.com';


var ip = test;
var ip1 = test1;

var api = {
	ip: ip1,
	lottery: ip + '/lotteryConsumer/lottery', 									// 用户参与抽奖
	createJoinActInfo: ip + '/consumerActivity/createJoinActInfo', 				// 查询二维码参与活动状态
	findRealEncodeFunction: ip + '/consumerActivity/findRealEncodeFunction', 	// 防伪溯源展示接口
	checkUserMobile: ip + '/consumerUser/checkUserMobile',						//是否绑定手机号
	findByAntifakeCodeFunction: ip + '/consumerActivity/findByAntifakeCodeFunction',							//通过防伪码获取相关联的二维码信息
	isSubscribe: ip + '/wechat/isSubscribe', 									// 查询是否关注公众号接口

	jssdk: ip + '/wechat/jssdk',												//验证签名
	shopUrlindex: ip + '/shopUrl/index',										//商城入口

};