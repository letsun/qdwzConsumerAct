var dev = 'http://192.168.1.20:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = production;


var dev1 = 'http://192.168.1.20:8095';   //广告测试
var production1 ='https://advp-api.lxcyhd.com'   //广告生产
var ip1 = production1;

var api = {
	isSubscribe: ip + '/wechat/isSubscribe', 									// 查询是否关注公众号接口
	lottery: ip + '/lotteryConsumer/lottery', 									// 用户参与抽奖
	findActivityByEncode: ip + '/consumerActivity/findActivityByEncode', 		// 查询二维码参与活动状态
	userCash: ip + '/consumerUserCash/userCash', 								// 用户提现接口
	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction', 			// 防伪溯源展示接口
	personCenter: ip + '/activity/personCenter', 								// 跳转个人中心
	userCashRecord: ip + '/consumerUserCash/userCashRecord', 					// 提现记录查询接口
	couponCodeDetail: ip + '/lotteryConsumer/couponCodeDetail', 				// 中奖纪录代金券明细
	lotteryRecord: ip + '/lotteryConsumer/lotteryRecord', 						// 中奖记录列表查询
	getAdvByAdvPositionName: ip + '/platAdv/getAdvByAdvPositionName', 			// 
	browseRecord: ip + '/platBrowseRecord/browseRecord',
	scoreLottery: ip + '/lotteryConsumer/scoreLottery', 						// 用户消耗积分参与抽奖
	findCoupon: ip + '/coupon/findCoupon', 										// 获取我的优惠券
	couponDetail: ip + '/coupon/couponCodeDetail', 								// 获取优惠券明细
	findScoreDetail: ip + '/scoreDetail/findScoreDetail', 						// 获取积分明细记录
	getConsume: ip + '/consume/getConsume', 									// 获取用户信息
	findCouponNum: ip + '/coupon/findCouponNum', 								// 获取优惠券数量
	lotteryRecordNum: ip + '/lotteryConsumer/lotteryRecordNum', 				// 中奖记录数量查询
	getVerCode: ip + '/smscode/getVerCode', 									// 获取手机短信验证码
	btmGetVerCode: ip + '/smscode/btmGetVerCode', 								// 获取手机短信验证码
	checkPhonesUserStatus: ip + '/consumerActivity/checkPhonesUserStatus', 		// 获取手机短信验证码
	register: ip + '/consumerRegister/register',								// 用户注册
    guestApplyWithdraw: ip + '/consumerUserCash/guestApplyWithdraw',								// 客户发起提现申请
    checkPhoneIsEnabelJoinAct: ip + '/consumerActivity/checkPhoneIsEnabelJoinAct',								// 查询手机号是否可以参加活动
    guestApplyWithdrawRecord: ip + '/consumerUserCash/guestApplyWithdrawRecord',								// 客户提现申请列表查询接口（格瑞蓝达）
    getShopUrl: ip + '/shopUrl/getShopUrl',								// 获取商城url
    createJoinActInfo: ip + '/consumerActivity/createJoinActInfo',								// 添加参与记录
	findProduct: ip + '/product/findProduct',								// 根据二维码查询商品信息
	queryUserInfo:ip +'/benyi/signIn/queryUserInfo',                     //打开页面显示数据
	signIn: ip + '/benyi/signIn/index' ,									//本意签到
	receiveScore:ip+'/benyi/signIn/receiveScore' ,                           //点击领取积分
	scoreExchangeAct:ip+'/benyi/signIn/scoreExchangeAct' ,                      //积分兑换参与活动次数接口

	joinAct:ip+'/benyi/consumer/joinAct',    								// 参与活动抽奖接口
	receiveLottery:ip+'/benyi/signIn/receiveLottery',                        //二维码奖励领取接口
	bindingUserInfoMobile:ip+'/consumerUserInfo/bindingUserInfoMobile',                        //绑定手机号
	getAdvByAdvPageName:ip1+ '/adv/platAdv/benyi/getAdvByAdvPageName',   					//本意首页广告列表查询
	browseRecord:ip1+ '/adv/platRecord/benyi/browseRecord',									//本意广告浏览记录
	clickRecord:ip1+ '/adv/platRecord/benyi/clickRecord',									//本意广告点击

	entranceCheck:ip+ '/benyi/entranceCheck',									//判断页面入口
	

};