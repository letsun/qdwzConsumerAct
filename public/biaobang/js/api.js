var dev = 'http://192.168.1.41:8085/qdwz'; // 41-春玲姐，57-陈凯
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = production;

// var ip2 = "https://test-openwx.lxcyhd.com";
var ip2 = "https://wx.lxcyhd.com";


var api = {
	isSubscribe: ip + '/wechat/isSubscribe', 									// 查询是否关注公众号接口
	lottery: ip + '/lotteryConsumer/lottery', 									// 用户参与抽奖
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode', 		// 查询二维码参与活动状态
	userCash: ip + '/consumerUserCash/userCash', 								// 用户提现接口
	
	personCenter: ip + '/activity/personCenter', 								// 跳转个人中心
	userCashRecord: ip + '/consumerUserCash/userCashRecord', 					// 提现记录查询接口
	couponCodeDetail: ip + '/lotteryConsumer/couponCodeDetail', 				// 中奖纪录代金券明细
	lotteryRecord: ip + '/lotteryConsumer/lotteryRecord', 						// 中奖记录列表查询
	getAdvByAdvPositionName: ip + '/platAdv/getAdvByAdvPositionName', 			// 根据广告位获取	广告
	browseRecord: ip + '/platBrowseRecord/browseRecord',                        // 广告点击浏览记录
	scoreLottery: ip + '/lotteryConsumer/scoreLottery', 						// 用户消耗积分参与抽奖
	findCoupon: ip + '/coupon/findCoupon', 										// 获取我的优惠券
	couponDetail: ip + '/coupon/couponCodeDetail', 								// 获取优惠券明细
	findScoreDetail: ip + '/scoreDetail/findScoreDetail', 						// 获取积分明细记录
	getConsume: ip + '/consume/getConsume', 									// 获取用户信息
	findCouponNum: ip + '/coupon/findCouponNum', 								// 获取优惠券数量
	lotteryRecordNum: ip + '/lotteryConsumer/lotteryRecordNum', 				// 中奖记录数量查询
	companyLotteryRecord: ip + '/lotteryConsumer/companyLotteryRecord', 		// 企业查询中奖记录列表
	cancelCoupon: ip + '/lotteryConsumer/cancelCoupon',							// 消费者自主核销接口

	beijianpoint: ip + '/api/extend/aolunns/point',								// 提积分
	findScanNum: ip + '/consumerActivity/findScanNum',							// 扫码次数

	jssdk: ip2 + '/getUserApi/getJsApiSignature',											// 掉扫码接口
	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction', 			// 二维码防伪溯源展示接口
	checkUserMobile: ip + '/consumerUser/checkUserMobile',	// 是否绑定手机号
	saveUserInfo: ip + '/consumerUser/saveUserInfo',	// 绑定手机号
	getVerCode: ip + '/smscode/checkPhondeAndSendCode',	// 获取验证码
	createJoinActInfo: ip + '/consumerActivity/createJoinActInfo',	// 创建保存参与记录
};