const path = require('path');
const mime = require('../util/mime');
const fs = require('fs');

/**
 * 加载Vue项目静态资源
 * @param  string dir  静态资源目录
 * @param  object opts 参数
 * @return null
 */
const loadingVueStatic = (dir, opts) => {
	return async (ctx, next) => {
		let fpath = ctx.request.path;
		let type = ctx.cookies.get('type');
		let companyTemp = ctx.cookies.get('companyTemp');
		let isPreview = ctx.cookies.get('isPreview');

		let fullPath = '';

		if (fpath.includes(type) && fpath.includes(companyTemp) && fpath.includes(isPreview)) {
			fullPath = path.resolve(opts.root, './views', `./${fpath}`);
		} else {
			fullPath = path.resolve(opts.root, './views', `./${type}`, `./${companyTemp}`, `./${isPreview}`, `./${fpath}`);
		}

		if (fullPath.includes(dir)) {

			if (fs.existsSync(fullPath)) {

				let body = fs.readFileSync(fullPath).toString();

				ctx.response.type = mime(fullPath);
				ctx.response.status = 200;
				ctx.response.body = body;
			} else {
				ctx.response.status = 404;
				ctx.response.body = '资源未找到';
			}

		} else {
			await next();
		}
	}
}

module.exports = loadingVueStatic;