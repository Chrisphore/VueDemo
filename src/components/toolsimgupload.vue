<template>
<div>
    <el-upload
  :multiple="multiple_select"
  :limit="limit_num"
  action="/"
  list-type="picture-card"
  :file-list="files_list"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-exceed="handlexceed"
  :http-request="uploadimg" 
  :before-upload="beforeAvatarUpload"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
</template>

<script>
import cdn from "@/common/cdnhelper";
import config from "@/config";
import base from '@/api/base';

export default {
  props: {
    //上传限制
    limit: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    //是否可以多选
    multiple: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    //初始化图片列表
    fileslist: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //上传类型
    typeid: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      files_list: this.fileslist,
      type_id: this.typeid,
      multiple_select: this.multiple,
      limit_num: this.limit
    };
  },
  watch: {
    fileslist: function(newVal) {
      this.files_list = newVal;
    }
  },
  methods: {
    handleRemove(file, fileList) {
      var that = this;
      if (file.id != 0) {
				let listids = {'ids':file.id};
        base.delfile(listids).then(data => {
						
				});
      }
      cdn
        .deleteObject(file.key)
        .then(function(data) {
          if (data.statusCode == "200" || data.statusCode == "204") {
            that.$message.success("删除成功");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
			this.files_list =fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadimg(file) {
      var that = this;
      var cospath = cdn.getCosFilePath(this.type_id, file.file.name);
      cdn
        .sliceUploadFile(cospath, file.file)
        .then(function(data) {
          if (data.statusCode == "200") {
            var url =
              config.httphead +
              data.Location.toString().replace(config.cdnurl, config.url);
            //key 用于删除cdn文件 url 用于访问cdn id=0 标识 新增
            var p = { key: data.Key, url: url, id: 0 };
            that.files_list.push(p);
            that.$message.success("上传成功");
          }
        })
        .catch(function(err) {
          that.$message.warning("上传失败");
          console.error(err);
        });
    },
    handlexceed(files, fileList) {
      this.$message.error("上传文件超出了当前最大限制");
      console.log("上传文件超出个数了");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
      }
      return isJPG;
    }
  }
};
</script>
