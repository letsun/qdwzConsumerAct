var dev = 'http://192.168.1.20:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = test;

var api = {
	isSubscribe: ip + '/wechat/isSubscribe',
	lottery: ip + '/lotteryConsumer/lottery',
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode',
	userCash: ip + '/consumerUserCash/userCash',
	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction',
	personCenter: ip + '/activity/personCenter',
	userCashRecord: ip + '/consumerUserCash/userCashRecord',
	couponCodeDetail: ip + '/lotteryConsumer/couponCodeDetail',
	lotteryRecord: ip + '/lotteryConsumer/lotteryRecord',
	getAdvByAdvPositionName: ip + '/platAdv/getAdvByAdvPositionName',
	browseRecord: ip + '/platBrowseRecord/browseRecord',
	findShareParams: ip + '/actFissionShare/findShareParams',
	findRebate: ip + '/fissionAct/findRebate',
	findFissionActByEncode: ip + '/fissionAct/findFissionActByEncode',
	fissionActLottery: ip + '/fissionAct/lottery'
}