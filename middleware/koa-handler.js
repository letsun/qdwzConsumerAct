const path = require('path');

/**
 * 处理错误中间件
 * @param  object opts 处理错误参数
 * @return null
 */
const handler = () => {
	return async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			let status = err.statucCode || err.status || 500;
			let staticReg = /^.+\..+$/i;
			let fpath = cts.request.path;

			ctx.response.status = status;

			if (!staticReg.test(fpath)) {
				ctx.render(path.join('common', 'error'), {
					status: status
				});
			}
		}
	}
}

module.exports = handler;