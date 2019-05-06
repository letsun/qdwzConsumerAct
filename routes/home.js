const path = require('path');
const router = require('koa-router')();

// 模板路由
router.get('/:type/:companyTemp/:fileName', (ctx, next) => {

	// 模板类型
	var type = ctx.params.type;

	// 企业模板
	var companyTemp = ctx.params.companyTemp;

	// 文件名
	var fileName = ctx.params.fileName;

	// 需要解析的文件路径
	var filePath = `${type}/${companyTemp}`;

	// 设置cookie
	ctx.cookies.set('type', type, {
		maxAge: Date.now() + 90000000000,
		path: '/',
		httpOnly: true
	});

	ctx.cookies.set('companyTemp', companyTemp, {
		maxAge: Date.now() + 9000000000,
		path: '/',
		httpOnly: true
	});

	// 渲染模板
	ctx.render(`${filePath}/${fileName}`, {
		title: 'Express'
	});
	
});

// 消费者活动首页路由
router.get('/:type/:companyTemp/:isPreview/:fileName', (ctx, next) => {

	// 模板类型
	var type = ctx.params.type;

	// 企业模板
	var companyTemp = ctx.params.companyTemp;

	var isPreview = ctx.params.isPreview;

	// 文件名
	var fileName = ctx.params.fileName;

	// 需要解析的文件路径
	var filePath = `${type}/${companyTemp}/${isPreview}`;

	// 设置cookie
	ctx.cookies.set('type', type, {
		maxAge: Date.now() + 90000000000,
		path: '/',
		httpOnly: true
	});

	ctx.cookies.set('isPreview', isPreview, {
		maxAge: Date.now() + 9000000000,
		path: '/',
		httpOnly: true
	});

	ctx.cookies.set('companyTemp', companyTemp, {
		maxAge: Date.now() + 9000000000,
		path: '/',
		httpOnly: true
	});

	// 渲染模板
	ctx.render(`${filePath}/${fileName}`, {
		title: 'Express'
	});
});

// 消费者活动其它页面
router.get('*', (ctx, next) => {
	var type = ctx.cookies.get('type');
	var companyTemp = ctx.cookies.get('companyTemp');
	var isPreview = ctx.cookies.get('isPreview');
	var fileName = ctx.request.path;

	if (!type) {
		type = ctx.params.type;
	}

	if (!companyTemp) {
		companyTemp = ctx.params.companyTemp;
	}

	if (!isPreview) {
		isPreview = ctx.params.isPreview;
	}

	// 渲染模板
	ctx.render(`${type}/${companyTemp}/${isPreview}/${fileName}`, {
		title: 'Express'
	});
});

module.exports = router;