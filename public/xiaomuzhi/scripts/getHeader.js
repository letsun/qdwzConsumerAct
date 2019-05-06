function setSessionHeader(isClearSession) {

	var sign = 'apiGugwe#kin23568'; // 约定密钥
	
	var companyId = Global.getUrlParam('companyId'); // 企业ID
	var consumerId = Global.getUrlParam('consumerId'); // 消费者ID
	var openid = Global.getUrlParam('openid'); // 微信openid
	var mallType = Global.getUrlParam('mallType'); // 商品类型

	var session = window.sessionStorage;
	var headerInfor = {};
	var isClearSession = true;

	var session = window.sessionStorage;
	var headerInfor = {};
	var timestamp = '';

	

	// 重置headerInfor
	if (isClearSession) {
		session.removeItem('headerInfor');
	}

	timestamp = +(new Date());

	headerInfor.mallType = mallType;
	headerInfor.companyId = companyId;
	headerInfor.consumerId = consumerId;
	headerInfor.openid = openid;

	headerInfor.sign = sign;
	headerInfor.timestamp = timestamp;
	headerInfor.keys = $.md5(headerInfor.openid + headerInfor.companyId + headerInfor.consumerId + headerInfor.sign + timestamp).toUpperCase();

	session.setItem('headerInfor', JSON.stringify(headerInfor));

	return headerInfor;

}

function getHeader() {
	var session = window.sessionStorage;
	var isClearSession = false;


	if (session.getItem('headerInfor')) {
		headerInfor = JSON.parse(session.getItem('headerInfor'));
	} else {

		headerInfor = setSessionHeader(isClearSession);
	}

	var header = {
		mt: headerInfor.mallType,
		oi: headerInfor.openid,
		cpi: headerInfor.companyId,
		csi: headerInfor.consumerId,
		times: headerInfor.timestamp,
		s: headerInfor.keys
	};

	return header;

}