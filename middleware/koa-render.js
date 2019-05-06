const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

/**
 * ejs渲染模板中间件
 * @param  string dir  模板目录
 * @param  object opts 渲染参数
 * @return null
 */
const render = (dir, {
	root = path.resolve(__dirname, '..'),
	extension = '.html',
	cache = false,
	debug = false
} = {
	root: path.resolve(__dirname, '..'),
	extension: '.html',
	cache: false,
	debug: false
}) => {
	return async (ctx, next) => {
		ctx.render = async (filePath, data) => {

			let fPath = path.join(root, dir, filePath);
			let fullPath = fPath + extension;

			if (fs.existsSync(fullPath)) {

				let body = await ejs.renderFile(fullPath, data, {
					cache: cache,
					debug: debug
				});

				ctx.response.status = 200;
				ctx.response.type = 'text/html';
				ctx.response.body = body;

			} else {

				ctx.response.status = 404;

				let errorPath = path.join(root, 'views', 'common', 'error.html');

				if (fs.existsSync(errorPath)) {

					let errorBody = await ejs.renderFile(errorPath, {
						status: 404
					}, {
						cache: cache,
						debug: debug
					});

					ctx.response.type = 'text/html';
					ctx.response.body = errorBody;
				}
			}
		}

		await next();
	}
}

module.exports = render;