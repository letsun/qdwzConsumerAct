function InitialUpload(uploadBtn, btnNum, uploadQuality, callback) {
	var This = this;
	This.cache = [];
	This.data = {};
	This.data['content'] = [];
	This.data['file'] = [];

	This.imgUpload = new upload({
		btn: uploadBtn,
		removeUploadPicBtn: uploadQuality.removeUploadPicBtn, // 删除图片的按钮
		url: "http://192.168.1.39:4000/upload",
		// url: "/upload/ignUpload",
		fileType: uploadQuality.fileExtension,
		fileSize: 5000,
		num: uploadQuality.pictureNum,

		// 按钮个数类型
		btnNum: btnNum,

		// 是否上传图片的尺寸大小
		uploadQuality: uploadQuality,
		callback: callback,

		filter: function(file) {
			common.alert({
				content: file.name + "文件类型错误"
			});
		},
		overSize: function(file) {
			common.alert({
				content: file.name + "文件超过大小"
			});
		},
		overNum: function() {
			var self = this;
			callback.overNum(self);
		},
		fileAdded: function(f) {
			var self = this;

			if (uploadQuality.fileType === 'image') {
				//预览图片
				self.preViewPic(f.file, function(base64src, left, top, width, height) {

					var imgHtml = '';
					imgHtml = '<div class="upload-container js-upload-container">';
					imgHtml += '<div class="upload-pic"><img style="position:absolute;width:' + width + ';height:' + height + ';left:' + left + ';top:' + top + '" src="' + base64src + '"></div>';
					imgHtml += '<a class="close-btn js-close-btn" data-src="' + f.file.name + '" href="javascript:void(0);">x</a>';
					imgHtml += '<div class="progress">0%</div>';
					imgHtml += '</div>';

					callback.preViewSuccess(self, imgHtml, self.btnIndex);
				});

			} else if (uploadQuality.fileType === 'file') {
				//预览文件
				self.preViewFile(f.file, function() {
					var imgHtml = '<div class="upload-container"><div class="progress">0%</div></div>';
					callback.preViewSuccess(self, imgHtml, self.btnIndex, f.file);
				});

			}
		},

		/**
		 * 删除图片后的操作
		 * @param  $ 		obj 			删除按钮对象
		 * @param  string 	fileName 		图片名称
		 * @return null
		 */
		deletePic: function(obj, fileName) {
			var self = this;

			callback.deleted(self, This, obj, fileName);
		},

		/**
		 * 图片开始上传时的状态
		 * @param  int 		index 		需要上传图片的索引
		 * @return null
		 */
		initProgress: function(index,picIndex1) {
			var self = this;
			callback.initProgress(self, index, picIndex1);
		},

		/**
		 * 图片上传进度的回调函数
		 * @param string 	fileName 	图片名称
		 * @param  float 	loaded   	图片已经上传了数据
		 * @param  float 	total    	图片总共的数据
		 * @param  int 		index    	图片的索引
		 * @return null
		 */
		progress: function(fileName, loaded, total, index) {
			var self = this,
				percent = parseInt((loaded / total) * 100);


			//$(document).off('click', self.btn);
			// $(document).off('click', self.removeUploadPicBtn);
			callback.progress(self, fileName, index, percent);

		},

		/**
		 * 图片上传成功后的回调函数
		 * @param  object 	res  	图片上传成功后的返回值 
		 * @param  object 	file  	文件对象
		 * @param  int 		index 	图片上传的索引
		 * @return null
		 */
		success: function(res, file, index) {
			var self = this;

			var res = JSON.parse(res);

			// 图片上传成功后，储存图片资源
			// 
			if (res.status == 200) {
				This.data['content'].push({
					src: res.src,
					fileSrc: file.name
				});
				//This.data['file'].push(file);
				callback.success(self, res, file, index);
			}

		},

		/**
		 * 图片上传失败后的回调函数
		 * @param  object 	res  	图片上传成功后的返回值 
		 * @param  object 	file  	文件对象
		 * @param  int 		index 	图片上传的索引
		 * @return null
		 */
		error: function(res, file, index) {
			var self = this;

			callback.error(self, res, file, index);

		},

		/**
		 * 全部上传完成后的回调函数
		 * @return null
		 */
		complete: function() {
			var self = this;

			// 全部上传完成后，禁止再添加图片和删除图片
			// $(document).off('click', self.btn);
			// $(document).off('click', self.removeUploadPicBtn);

			callback.complete(self);
		}
	});
}