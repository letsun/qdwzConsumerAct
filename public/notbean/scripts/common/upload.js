/**
 * @desc 按索引删除数组某个元素
 * @param index
 * @returns {boolean}
 */
Array.prototype.del = function(index) {
    if (isNaN(index) || index >= this.length) {
        return false;
    }

    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

/**
 * @desc 图片上传
 * @param cfg.btn {string} 文件上传按钮
 * @param cfg.url {string} 文件上传路径
 * @param cfg.fileType {Array} 过滤的文件类型
 * @param cfg.fileSize {number} 文件大小限制
 * @param cfg.num {number} 文件数量限制
 * @param cfg.fileAdded {function} 文件添加时的回调函数
 * @param cfg.overNum {function} 文件超过数量的回调函数
 * @param cfg.filter {function} 文件类型错误的回调函数
 * @param cfg.overSize {function} 文件超过大小的回调函数
 * @param cfg.progress {function} 文件上传中的回调函数
 * @param cfg.success {function} 有文件上传完成的回调函数
 * @param cfg.complete {function} 全部文件上传完成的回调函数
 * @param cfg.error {function} 文件上传发生错误的回调函数
 */
var upload = function(cfg) {
    var self = this;

    self.btn = cfg.btn;

    self.url = cfg.url;
    self.fileType = cfg.fileType;
    self.fileSize = cfg.fileSize;
    self.num = cfg.num;
    self.btnNum = cfg.btnNum || 'single';
    self.isZipSize = cfg.uploadQuality.isZipSize; // 是否使用图片尺寸压缩
    self.containerWidth = cfg.uploadQuality.containerWidth || 86; // 装图片的容器宽度
    self.containerHeight = cfg.uploadQuality.containerHeight || 86; // 装图片的容器高度
    self.removeUploadPicBtn = cfg.removeUploadPicBtn; // 删除图片的按钮
    self.fileAdded = cfg.fileAdded || function() {};
    self.overNum = cfg.overNum || function() {}; //超过数量
    self.filter = cfg.filter || function() {}; //文件类型错误
    self.overSize = cfg.overSize || function() {}; //超过大小
    self.initProgress = cfg.initProgress || function() {};
    self.progress = cfg.progress || function() {};
    self.success = cfg.success || function() {};
    self.complete = cfg.complete || function() {};
    self.error = cfg.error || function() {};
    self.deletePic = cfg.deletePic || function() {};
    self.files = [];
    self.picIndex = cfg.uploadQuality.picIndex;
    self.picIndex1 = 0;
    // self.numAdded = 1;

    self.init();
};

(function($) {
    /**
     * @desc 插件入口函数
     */
    upload.prototype.init = function() {
        var self = this;

        //获取一个随机ID
        var n = Math.floor(Math.random() * 10000);
        self.n = n;

        //添加文件选择框
        $("body").append('<input type="file" id="fileUpload' + n + '" style="display: none">');

        //绑定文件上传按钮
        $(document).on("click", self.btn, function() {

            if (self.overNumFlag) return;

            self.picIndex1 = $(this).attr('data-index');

            $("#fileUpload" + n).click();
        });

        // 删除图片的事件
        $(document).on('click', self.removeUploadPicBtn, function() {
            self.deleteOperation($(this), $(this).attr('data-src'));
        })

        //选择文件事件
        $("#fileUpload" + n).on("change", function(e) {
            var files = e.target.files;
            for (var i = 0; i < files.length; i++) {

                //判断文件类型是否符合
                if (self.fileType) {
                    var type = files[i].name.split(".").pop();
                    var isType = false;
                    for (var t = 0; t < self.fileType.length; t++) {
                        if (type == self.fileType[t]) {
                            isType = true;
                            break;
                        }
                    }
                    if (!isType) {
                        self.filter(files[i]);
                        break;
                    }
                }

                // 判断大小是否符合
                if (self.fileSize && files[i].size > self.fileSize * 1024) {
                    self.overSize(files[i]);
                    break;
                }

                // 每添加一次都执行回调函数
                self.fileAdded({
                    name: "file" + i,
                    file: files[i]
                });


                // 判断是否超过数量限制
                if (self.num && self.picIndex === self.num - 1) {
                    self.overNum();
                    return;
                }

            }
        });
    };

    /**
     * 图片上传到服务器函数
     * @param  object   fileObj  储存图片信息的对象，格式如：{file:file,dataURL:url,picIndex:index}
     * @param  object   obj    插件里的表单对象
     * @param  object  opts    提交表单数据到服务器的回调函数等信息，格式如：{callback:callback,url:url}
     * @param  function next    异步回调，作用是不断循环上传数组里的图片
     * @param  object   data    未知
     * @return null
     */
    upload.prototype.uploadFile = function(fileObj, obj, opts, next, data) {
        var self = this;
        var xhr = new XMLHttpRequest();
        var index = fileObj.picIndex;

        if (xhr.upload) {
            // 上传中
            xhr.upload.onprogress = function(e) {

                self.initProgress(index, self.picIndex1);

                if (e.loaded === 0 && e.total === 0) {
                    self.error('上传失败', fileObj.file, index);
                    return;
                }

                self.progress(fileObj.file.name, e.loaded, e.total, index);
            };

            // 文件上传成功或是失败
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        //文件上传成功
                        self.success(xhr.responseText, fileObj.file, index);

                        if (typeof obj !== 'undefined') {

                            obj.index++;

                            if (obj.index === self.files.length) {

                                opts.callback.call(obj, opts.url);

                                //全部完毕
                                self.complete();
                            } else {
                                next.call(obj);
                            }

                        } else {

                            if (self.files.length > 0) {
                                self.files = [];
                            }

                            //全部完毕
                            self.complete(index);

                        }

                    } else {
                        //上传发生错误
                        self.error(xhr.responseText, fileObj.file, index);
                    }
                }
            };

            xhr.open('POST', self.url, true);
            var fd = new FormData();

            fd.append("file", fileObj.file);
            for (var i in data) {
                fd.append(i, data[i]);
            }

            xhr.send(fd);
        }
    };

    /**
     * @func deleted()
     * @desc 从文件数组中删除某个文件
     * @param fileName
     */
    upload.prototype.deleted = function(fileName) {
        var self = this;

        for (var i = 0, len = self.files.length; i < len; i++) {
            if (self.files[i].file.name === fileName) {
                self.files.splice(i, 1);
                len--;
            }
        }

        // self.numAdded--; //已添加的文件数量
        self.picIndex--;

    };

    /**
     * @func preViewPic()
     * @desc 预览图片
     * @param file 图片文件对象
     * @param callback 图片预览成功后的回调
     */
    upload.prototype.preViewPic = function(file, callback) {
        var reader = new FileReader();
        var self = this;

        // 把图片文件对象解析成数据
        reader.readAsDataURL(file);

        // 加载成功后的回调
        reader.onload = function(e) {

            // e.target.result为base64字符串
            self.imgLoadToCanvas(file, e.target.result, callback);
        };
    };

    /**
     * @func preViewFile()
     * @desc 预览文件
     * @param file 文件对象
     * @param callback 预览成功后的回调
     */
    upload.prototype.preViewFile = function(file, callback) {
        var reader = new FileReader();
        var self = this;

        // 把图片文件对象解析成数据
        reader.readAsDataURL(file);

        // 加载成功后的回调
        reader.onload = function(e) {
            // 图片预览成功后的回调
            self.FileLoadToUrl(file, e.target.result, callback);
        };
    };

    upload.prototype.FileLoadToUrl = function(file, src, callback) {
        var self = this;

        // 文件预览成功后的回调
        self.preViewComplete(file);
        callback();
    }

    /**
     * 加载图片
     * @param  string src 图片base64字符url
     * @return null
     */
    upload.prototype.imgLoadToCanvas = function(file, src, callback) {
        var self = this,
            img = null,
            image = null,
            ctx = null,
            containerWidth = 0,
            containerHeight = 0,
            cWidth = 0,
            cHeight = 0;

        containerWidth = self.containerWidth;
        containerHeight = self.containerHeight;

        image = new Image();

        // 触发加载事件
        image.onload = function() {

            if (image.width > image.height) {

                cHeight = image.height * containerWidth / image.width;

                cWidth = containerWidth;

            } else if (image.width < image.height) {

                cWidth = image.width * containerHeight / image.height;

                cHeight = containerHeight;

            } else {
                cWidth = containerWidth;
                cHeight = containerHeight;
            }

            var imgLeft = 0;
            var imgTop = 0;
            var imgWidth = 0;
            var imgHeight = 0;

            if (self.isZipSize) {
                imgLeft = (containerWidth - cWidth) / 2 + 'px';
                imgTop = (containerHeight - cHeight) / 2 + 'px';
                imgWidth = cWidth + 'px';
                imgHeight = cHeight + 'px';
            } else {
                imgLeft = 0;
                imgTop = 0;
                imgWidth = '100%';
                imgHeight = '100%';
            }

            // 图片预览成功后的回调
            self.preViewComplete(file, src, imgLeft, imgTop, imgWidth, imgHeight, callback);

        }

        // 加载base64字符串src
        image.src = src;

    }

    /**
     * 预览结束后需要添加的数据
     * @param  object file file文件对象
     * @param  string src  图片路径字符串
     * @return null
     */
    upload.prototype.preViewComplete = function(file, src, imgLeft, imgTop, imgWidth, imgHeight, callback) {
        var self = this;

        //添加到文件列表
        self.files.push({
            file: file,
            dataURL: src,
            picIndex: self.picIndex
        });

        self.picIndex++;

        // self.numAdded++; //已添加的文件数量

        // 调用图片预览，显示图片
        callback(src, imgLeft, imgTop, imgWidth, imgHeight);

    }


    /**
     * 删除图片后操作
     * @param  string fileName 图片名称
     * @return null
     */
    upload.prototype.deleteOperation = function(obj, fileName) {
        var self = this;

        self.deleted(fileName);
        self.deletePic(obj, fileName);
    }

})(jQuery);