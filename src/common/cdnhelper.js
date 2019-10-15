import COS from "cos-js-sdk-v5"
import config from "../config"

//重构padstart兼容性
if (!String.prototype.padStart) {
    String.prototype.padStart = function(targetLength, padString) {
        // 截断数字或将非数字转换为0
        targetLength = targetLength >> 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength || padString === '') {
            return String(this);
        }
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            // 添加到初始值以确保长度足够
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
    };
}
// // 前端计算签名（适用于前端调试） 后面从后台获取签名
var getAuthorization = function(options, callback) {
    var authorization = COS.getAuthorization({
        SecretId: config.SecretId,
        SecretKey: config.SecretKey,
        Method: options.Method,
        Key: options.Key,
    });
    callback(authorization);
}
var cos = new COS({
    // 必选参数
    getAuthorization: getAuthorization,
    // 可选参数
    FileParallelLimit: 3, // 控制文件上传并发数
    ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
    ChunkSize: 1024 * 1024, // 控制分片大小，单位 B
    ProgressInterval: 1, // 控制 onProgress 回调的间隔
    ChunkRetryTimes: 3, // 控制文件切片后单片上传失败后重试次数
});
var cdn = {
    //获取存储桶文件
    getBucket: () => {
        return new Promise(function(resolve, reject) {
            cos.getBucket({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region /* 必须 */
                    // Prefix: 'a/',           /* 非必须 */
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //获取存储桶文件
    getBucketfile: (key) => {
        return new Promise(function(resolve, reject) {
            cos.getBucket({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region,
                /* 必须 */
                Prefix: key,
                /* 非必须 */
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //创建目录
    putObject: (key) => {
        return new Promise(function(resolve, reject) {
            cos.putObject({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region,
                /* 必须 */
                Key: key,
                /* 必须 */
                Body: '',
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //上传文件
    putFile: (key, file) => {
        return new Promise(function(resolve, reject) {
            cos.putObject({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region,
                /* 必须 */
                StorageClass: 'STANDARD',
                Key: key,
                /* 必须 */
                Body: file,
                onProgress: function(progressData) {
                    // console.log(JSON.stringify(progressData));
                }
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //删除文件
    deleteObject: (key) => {
        return new Promise(function(resolve, reject) {
            cos.deleteObject({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region,
                /* 必须 */
                Key: key /* 必须 */
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //删除文件
    deleteMultipleObject: (key) => {
        return new Promise(function(resolve, reject) {
            cos.deleteMultipleObject({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region,
                /* 必须 */
                Objects: key //[ {Key: '1.jpg'}, {Key: '2.zip'}]         
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //分块上传
    sliceUploadFile: (key, file) => {
        return new Promise(function(resolve, reject) {
            cos.sliceUploadFile({
                Bucket: config.Bucket,
                /* 必须 */
                Region: config.Region,
                /* 必须 */
                Key: key,
                /* 必须 */
                Body: file,
                /* 必须 */
                TaskReady: function(taskId) { /* 非必须 */ },
                onHashProgress: function(progressData) { /* 非必须 */ },
                onProgress: function(progressData) { /* 非必须 */ }
            }, function(err, data) {
                if (data) {
                    resolve(data)
                }
                if (err) {
                    reject(err)
                }
            });
        })
    },
    //取消分块上传任务
    cancelTask: (taskId) => {
        cos.cancelTask(taskId);
    },
    //暂停分块上传
    pauseTask: (taskId) => {
        cos.pauseTask(taskId);
    },
    //重新上传  
    restartTask: (taskId) => {
        cos.restartTask(taskId);
    },
    getCosFilePath: function(typerID, filestr) {
        if (!typerID) {
            console.error("生成文件唯一ID，需要传入类型typeId");
        }
        var timestrap = (new Date()).getTime();
        var ran4num = this.ranNumStr(4);
        var host = window.location.host;
        var tenantID = localStorage.getItem(host + "tenantCode");
        var userid = localStorage.getItem(host + "UserId");
        var filetype = this.getFileSuffix(filestr);
        var cospath = '/' + config.path + `/${tenantID}/${userid}/${typerID}/${timestrap}${ran4num}.${filetype}`;
        return cospath;
    },
    ranNumStr: function(digit) {
        if (!digit) {
            console.error("生成随机数，必须传入所需结果的位数");
            return;
        }
        let decnum = Math.pow(10, digit);
        var num = parseInt(Math.random(decnum) * decnum);
        var result = num.toString().padStart(digit, 0);
        return result;
    },
    getFileSuffix: function(fileStr) {
        if (!fileStr) {
            console.error("文件名称不能为空");
            return;
        }
        var filetype = fileStr.toString();
        return filetype.substring(filetype.lastIndexOf('.') + 1);
    },
    getkeybyfile: function(fileurl) {
        if (fileurl.indexOf(config.cdnurl) != -1) {
            return fileurl.substring(fileurl.lastIndexOf(config.cdnurl) + config.cdnurl.length);
        }
        if (fileurl.indexOf(config.url) != -1) {
            return fileurl.substring(fileurl.lastIndexOf(config.url) + config.url.length);
        }
        return "";
    }

}

export default cdn