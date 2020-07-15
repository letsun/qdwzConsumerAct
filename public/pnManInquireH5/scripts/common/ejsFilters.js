/**
 * ejs自定义过滤器
 * 描述：引入ejsFilters.js文件之前，必须先引入ejs.js文件
 * 用法：格式化日期：<%=: result[i].createDate | dateFormat:'yyyy-MM-dd' %>
 */

;
(function() {

	/**
	 * 日期过滤器
	 * @param  string date   格式化前日期
	 * @param  string format 日期格式
	 * @return string        格式化后的日期
	 */
	ejs.filters.dateFormat = function(date, format) {
		if (typeof format === 'undefined') {
			format = 'yyyy-MM-dd';
		}

		if (date) {
			var res = new Date(date)._Format(format);
			return res == 'Invalid date' ? '0000-00-00 00:00:00' : res;
		}
		return '';
	};
})();


/**
 * 扩展日期对象方法——日期格式化
 * @param  string fmt 	日期格式
 * @return string 		格式化后的日期
 */
Date.prototype._Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}