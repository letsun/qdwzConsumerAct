var dev = 'http://192.168.1.7:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var dev1 = "http://192.168.1.7:8080";
var test1 = "https://test-wap.lxcyhd.com";
var production1 = "https://q.lxcyhd.com";
var ip = production;
var ip1 = production1;

var api = {
	route: ip1 + '/consumer/center/188',										//跳转到个人中心
	isSubscribe: ip + '/wechat/isSubscribe', 									// 查询是否关注公众号接口
	lottery: ip + '/lotteryConsumer/lottery', 									// 用户参与抽奖
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode', 		// 查询二维码参与活动状态
	userCash: ip + '/consumerUserCash/userCash', 								// 用户提现接口
	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction', 			// 防伪溯源展示接口
	personCenter: ip + '/activity/personCenter', 								// 跳转个人中心
	userCashRecord: ip + '/consumerUserCash/userCashRecord', 					// 提现记录查询接口
	couponCodeDetail: ip + '/lotteryConsumer/couponCodeDetail', 				// 中奖纪录代金券明细
	lotteryRecord: ip + '/lotteryConsumer/lotteryRecord', 						// 中奖记录列表查询
	companyLotteryRecord: ip + '/lotteryConsumer/companyLotteryRecord',			//企业中奖纪录
	getAdvByAdvPositionName: ip + '/platAdv/getAdvByAdvPositionName', 			// 
	browseRecord: ip + '/platBrowseRecord/browseRecord',
	scoreLottery: ip + '/lotteryConsumer/scoreLottery', 						// 用户消耗积分参与抽奖
	findCoupon: ip + '/coupon/findCoupon', 										// 获取我的优惠券
	couponDetail: ip + '/coupon/couponCodeDetail', 								// 获取优惠券明细
	findScoreDetail: ip + '/scoreDetail/findScoreDetail', 						// 获取积分明细记录
	getConsume: ip + '/consume/getConsume', 									// 获取用户信息
	findCouponNum: ip + '/coupon/findCouponNum', 								// 获取优惠券数量
	lotteryRecordNum: ip + '/lotteryConsumer/lotteryRecordNum', 				// 中奖记录数量查询
	getVerCode: ip + '/smscode/yifei/getVerCode', 									// 获取手机短信验证码
	btmGetVerCode: ip + '/smscode/btmGetVerCode', 								// 获取手机短信验证码
	checkPhonesUserStatus: ip + '/consumerActivity/checkPhonesUserStatus', 		// 获取手机短信验证码
	register: ip + '/consumerRegister/register',								// 用户注册
	guestApplyWithdraw: ip + '/consumerUserCash/guestApplyWithdraw',								// 客户发起提现申请
	checkPhoneIsEnabelJoinAct: ip + '/consumerActivity/checkPhoneIsEnabelJoinAct',								// 查询手机号是否可以参加活动
	guestApplyWithdrawRecord: ip + '/consumerUserCash/guestApplyWithdrawRecord',								// 客户提现申请列表查询接口（格瑞蓝达）
	getShopUrl: ip + '/shopUrl/getShopUrl',								// 获取商城url
	createJoinActInfo: ip + '/consumerActivity/createJoinActInfo',								// 添加参与记录
	findProduct: ip + '/product/findProduct',								// 根据二维码查询商品信息
	addUserInfo: ip + '/consumerUserInfo/addUserInfo',								// (罗伯克啤酒)提交用户信息
	checkUserInfo: ip + '/consumerUserInfo/checkUserInfo',								// (罗伯克啤酒)校验用户是否填写详细信息
	checkUser: ip + '/consumerUserInfo/checkUser',								// 实物中大奖校验用户是否填写信息

	checkUserMobile: ip + '/consumerUser/checkUserMobile',				//查询用户是否绑定手机号码;
	saveUserInfo: ip + '/consumerUser/saveUserInfo',                         //点击提交校验手机号码
	timeCountDown: ip + '/activity/timeCountDown',                        //活动倒计时
};