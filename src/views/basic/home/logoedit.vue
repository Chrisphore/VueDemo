<!-- Table -->
<template>
  <el-dialog title="LOGO设置" :visible="ishow" center width="25%" @open="openinit" @close="closedialog">
    <el-row>
      <el-form :inline="true" class="el-form-class" label-width="120">
        <el-form-item label="LOGO:">
          <tool-img ref="toolsimg" :typeid="5" :imgurl="imgurl" :imgkey="imgkey" :uploadstu="true" :imgwidth="146" :imgheight="104" :islimit="false">
          </tool-img>
          <el-tag>图片大小：146*104</el-tag>
          <el-tag>点击LOGO进行上传</el-tag>
        </el-form-item>
      </el-form>

    </el-row>
    <div slot="footer" class="dialog-footer">
     
      <el-button  @click="closedialog">取消</el-button>
       <el-button type="primary" @click="uploadimg">保存</el-button>
    </div>

  </el-dialog>

</template>
<script>
import toolsimgsingle from "@/components/toolsimgsingle";
import API from "@/api/base";
export default {
  props: ["showstu"],
  components: {
    "tool-img": toolsimgsingle
  },
  data() {
    return {
      ishow: this.showstu,
      imgurl: "",
      id: 0,
      imgkey: ""
    };
  },
  watch: {
    showstu: function(newVal) {
      this.ishow = newVal;
    }
  },
  methods: {
    //窗体初始化加载事件
    openinit: function() {
      var that = this;
      var p = { keyword: "logo" };
      API.getdictlist(p).then(function(res) {
        if (res.meta.success) {
          if (res.data.length > 0) {
            that.id = res.data[0].id;
            var key = that.getkeybyfile(res.data[0].summary);
            that.imgkey = key;
            that.imgurl = res.data[0].summary;
          }
        } else {
          that.$message.warning("加载数据失败");
        }
      });
    },
    closedialog: function() {
      this.$emit("closedialog");
    },
    uploadimg: function() {
      var that = this;
      var list = [];
      var summary = "";
      if (this.$refs.toolsimg.cdnurl) {
        summary = this.$refs.toolsimg.cdnurl;
      }
      var p = {
        pcode: "webconfig",
        code: "logo",
        summary: summary
      };
      list.push(p);
      API.updatedict(list).then(res => {
        if (res.meta.success) {
          that.$message.success("保存成功");
          that.closedialog();
        } else {
          that.$message.error("保存失败");
        }
      });
    }
  }
};
</script>