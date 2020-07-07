
/**
 * @desc 按索引删除数组某个元素
 * @param index
 * @returns {boolean}
 */
Array.prototype.del = function (index) {
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
var upload = function (cfg) {
    var self = this;
    self.btn = cfg.btn;
    self.url = cfg.url;
    self.fileType = cfg.fileType;
    self.fileSize = cfg.fileSize;
    self.num = cfg.num;
    self.fileAdded = cfg.fileAdded || function () {
        };
    self.overNum = cfg.overNum || function () {
        };//超过数量
    self.filter = cfg.filter || function () {
        };//文件类型错误
    self.overSize = cfg.overSize || function () {
        };//超过大小
    self.progress = cfg.progress || function () {
        };
    self.success = cfg.success || function () {
        };
    self.complete = cfg.complete || function () {
        };
    self.error = cfg.error || function () {
        };
    self.files = [];
    self.index = 1;
    self.numAdded = 0;

    self.init();
};

(function ($) {
    /**
     * @desc 插件入口函数
     */
    upload.prototype.init = function () {
        var self = this;
        //获取一个随机ID
        var n = Math.floor(Math.random() * 10000);
        //添加文件选择框
        $("body").append('<input class="file" type="file" id="fileUpload' + n + '" style="display: none">');

        //绑定文件上传按钮
        $(self.btn).on("click", function () {
            $("#fileUpload" + n).click();
        });

        //选择文件事件
        $("#fileUpload" + n).on("change", function (e) {
            var files = e.target.files;
            for (var i = 0; i < files.length; i++) {
                //判断是否超过数量限制
                if (self.num && self.numAdded >= self.num) {
                    self.overNum();
                    return;
                }

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

                //判断大小是否符合
                if (self.fileSize && files[i].size > self.fileSize * 1024) {
                    self.overSize(files[i]);
                    break;
                }

                //添加到文件列表
                self.files.push({name: "file" + i, file: files[i]});
                self.index++;//文件序号
                self.numAdded++;//已添加的文件数量

                //每添加一次都执行回调函数
                self.fileAdded({name: "file" + i, file: files[i]});

                if (self.numAdded == self.num) {
                    self.overNum();
                }
            }
        });
    };

    /**
     * @func uploadFile()
     * @desc 文件上传函数
     * @param file {Array} 文件数组
     * @param data
     */
    upload.prototype.uploadFile = function (file, data) {
        var self = this;

        var xhr = new XMLHttpRequest();

        if (xhr.upload) {
            // 上传中
            xhr.upload.onprogress = function (e) {
                self.progress(file.name, e.loaded, e.total);
            };

            // 文件上传成功或是失败
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        //文件上传成功
                        self.success(file, xhr.responseText);

                        //从文件数组中删除已上传的文件
                        self.delete(file.name);

                        if (self.files.length == 0) {
                            //全部完毕
                            self.complete();
                        }
                    } else {
                        //上传发生错误
                        self.error(file, xhr.responseText);
                    }
                }
            };

            xhr.open('POST', self.url, true);
            xhr.setRequestHeader('isv','false');
            xhr.setRequestHeader('cpi',cpi);
            var fd = new FormData();

            fd.append("file", file);
            for (var i in data) {
                fd.append(i, data[i]);
            }

            xhr.send(fd);
        }
    };

    /**
     * @func delete()
     * @desc 从文件数组中删除某个文件
     * @param fileName
     */
    upload.prototype.delete = function (fileName) {
        var self = this;
        for (var i = 0; i < self.files.length; i++) {
            if (fileName == self.files[i].name) {
                self.files.del(i);
            }
        }
    };

    /**
     * @func preView()
     * @desc 预览图片
     * @param file
     * @param callback
     */
    upload.prototype.preView = function (file, callback) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            callback(e.target.result);
        };
    };
})(jQuery);
