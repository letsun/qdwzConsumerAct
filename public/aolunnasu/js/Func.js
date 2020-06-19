var Func = {};


$(function() {
    	/**
	 * 创建参与活动记录
	 * @param  function callback 查找后的回调
	 * @return null
	 */
	Func.createJoinActInfo = function (callback) {
		$('#loadingWrapper').show();

		$.ajax({
			url: api.createJoinActInfo,
			type: 'GET',
			headers: getHeader(),
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		});
	};
	
});