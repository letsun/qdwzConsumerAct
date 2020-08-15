var dev = 'http://192.168.1.20:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = production;


var api = {
    validate: ip + '/consumerAntifake/validate', 									// 提交验证码
    findActivityPrize: ip + '/consumerAntifake/findActivityPrize', 									// 获取奖项
    createJoinActInfo: ip + '/consumerActivity/createJoinActInfo', 									// 创建参与记录
	lottery: ip + '/lotteryConsumer/lottery', 									// 用户参与抽奖
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode', 		// 查询二维码参与活动状态
	userCash: ip + '/consumerUserCash/userCash', 								// 用户提现接口
	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction', 			// 防伪溯源展示接口
};