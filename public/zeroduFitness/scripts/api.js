var dev = 'http://192.168.1.20:8085/qdwz';
var test = '';
var production = '';

var ip = dev;

var api = {
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode',
	lottery: ip + '/lotteryConsumer/lottery',
	personCenter: ip + '/activity/personCenter',
	userCash: ip + '/consumerUserCash/userCash',
	userCashRecord: ip + '/consumerUserCash/userCashRecord',
	lotteryRecord: ip + '/lotteryConsumer/lotteryRecord'
}