var dev = 'http://192.168.1.8:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = dev;

var api = {
	isSubscribe: ip + '/wechat/isSubscribe', 									// 查询是否关注公众号接口
	lottery: ip + '/lotteryConsumer/lottery', 									// 用户参与抽奖
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode', 		// 查询二维码参与活动状态
	findFissionActByEncode: ip + '/fissionAct/findFissionActByEncode', 			// 裂变活动查询二维码参与活动状态
	findFissionLottery: ip + '/fissionAct/lottery', 							// 裂变红包参与抽奖
	userCash: ip + '/consumerUserCash/userCash', 								// 用户提现接口
	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction', 		// 防伪溯源展示接口
	personCenter: ip + '/activity/personCenter', 								// 跳转个人中心
	userCashRecord: ip + '/consumerUserCash/userCashRecord', 					// 提现记录查询接口
	couponCodeDetail: ip + '/lotteryConsumer/couponCodeDetail', 				// 中奖纪录代金券明细
	lotteryRecord: ip + '/lotteryConsumer/lotteryRecord', 						// 中奖记录列表查询
	getAdvByAdvPositionName: ip + '/platAdv/getAdvByAdvPositionName', 			// 通过插槽名获取广告
	browseRecord: ip + '/platBrowseRecord/browseRecord',						// 广告浏览记录
	scoreLottery: ip + '/lotteryConsumer/scoreLottery', 						// 用户消耗积分参与抽奖
	findCoupon: ip + '/coupon/findCoupon', 										// 获取我的优惠券
	couponDetail: ip + '/coupon/couponCodeDetail', 								// 获取优惠券明细
	findScoreDetail: ip + '/scoreDetail/findScoreDetail', 						// 获取积分明细记录
	getConsume: ip + '/consume/getConsume', 									// 获取用户信息
	findCouponNum: ip + '/coupon/findCouponNum', 								// 获取优惠券数量
	lotteryRecordNum: ip + '/lotteryConsumer/lotteryRecordNum', 				// 中奖记录数量查询
	findShareParams: ip + '/actFissionShare/findShareParams',					// 裂变红包自定义分享接口
	findRebate: ip + '/fissionAct/findRebate',						// 裂变返利记录查询接口
	FissionlotteryRecord: ip + '/fissionAct/lotteryRecord',						// 裂变活动中奖记录列表查询
	FissionlotteryRecordNum: ip + '/fissionAct/lotteryRecordNum',				// 裂变中奖记录数量查询
	FissionrebateRecordNum: ip + '/fissionAct/rebateRecordNum',					// 裂变返利中奖记录数量查询
	companyLotteryRecord: ip + '/lotteryConsumer/companyLotteryRecord',			// 企业查询中奖记录列表
	fissionCompanyLotteryRecord: ip + '/fissionAct/companyLotteryRecord',		// 裂变活动企业查询中奖记录列表
	cancelCoupon: ip + '/lotteryConsumer/cancelCoupon',							// 消费者自主核销接口
};