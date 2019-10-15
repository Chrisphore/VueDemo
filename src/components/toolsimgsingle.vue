<template>
<div>
    <el-upload
  :show-file-list="false"
  action="/"
  :http-request="uploadimg" 
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :auto-upload="upload_stu"
  ref="imgtools"
  >
   <img v-if="imgsrc" :src="imgsrc" style="width:100%" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div>
</template>

<script>
import cdn from "@/common/cdnhelper";
import config from "@/config";
import { Message } from "element-ui";
export default {
  props: {
    //图片存储类型
    typeid: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    //初始化图片地址
    imgurl: {
      type: String,
      default: ""
    },
    //图片key 用于cdn替换用
    imgkey: {
      type: String,
      default: ""
    },
    //是否立刻上传
    uploadstu: {
      type: Boolean,
      default: true
    },
    //限定宽度
    imgwidth: {
      type: Number,
      default: 0
    },
    //限定高度
    imgheight: {
      type: Number,
      default: 0
    },
    //是否限制宽高
    islimit: {
      type: Boolean,
      default: true
    },
    isreplaceurl: {
      type: Boolean,
      default: false
    },
    isdeleteimg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imgsrc: this.imgurl,
      img_key: this.imgkey,
      type_id: this.typeid,
      upload_stu: this.uploadstu,
      img_width: this.imgwidth,
      img_height: this.imgheight,
      is_limit: this.islimit,
      cdnurl: ""
    };
  },
  watch: {
    imgurl: function(newVal) {
      this.imgsrc = newVal;
    },
    imgkey: function(newVal) {
      this.img_key = newVal;
    }
  },
  methods: {
    uploadimg(file) {
      var that = this;
      var cospath = "";
      if (this.isdeleteimg) {
        if (this.img_key && this.img_key != "") {
          cdn
            .deleteObject(this.img_key)
            .then(function(data) {
              if (data.statusCode == "200" || data.statusCode == "204") {
                console.log("删除成功");
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      }
      cospath = cdn.getCosFilePath(this.type_id, file.file.name);
      cdn
        .sliceUploadFile(cospath, file.file)
        .then(function(data) {
          if (data.statusCode == "200") {
            var url = "";
            if (that.isreplaceurl) {
              url =
                config.httphead +
                data.Location.toString().replace(config.cdnurl, config.url);
            } else {
              url = config.httphead + data.Location;
            }
            //key 用于删除cdn文件 url 用于访问cdn id=0 标识 新增
            that.img_key = data.Key;
            that.cdnurl = url;
            that.imgsrc = url + "?v=" + new Date().getTime();
            that.$message.success("上传成功");
          }
        })
        .catch(function(err) {
          that.$message.warning("上传失败");
          console.error(err);
        });
    },
    beforeAvatarUpload(file) {
      var that = this;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
      }
      var isSize = false;
      if (that.is_limit) {
        isSize = new Promise(function(resolve, reject) {
          let width = that.img_width;
          let height = that.img_height;
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = function() {
            let valid = img.width >= width && img.height >= height;
            valid ? resolve() : reject();
          };
          img.src = _URL.createObjectURL(file);
        }).then(
          () => {
            return file;
          },
          () => {
            that.$message.error(
              "上传的必须必须是等于或大于" +
                that.img_width +
                "*" +
                that.img_height +
                "!"
            );
            return Promise.reject();
          }
        );
      } else {
        isSize = true;
      }
      return isJPG && isSize;
    },
    handleAvatarSuccess(res, file) {
      //    this.imgsrc = URL.createObjectURL(file.raw);
    },
    imguploadnow() {
      this.$refs.imgtools.submit();
    },
    initcdnurl() {
      this.cdnurl='';
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  display: block;
}
</style>