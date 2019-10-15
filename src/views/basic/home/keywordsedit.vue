<!-- Table -->
<template>
  <el-dialog title="热门关键字设置" :visible="ishow" center width="25%" @open="openinit" @close="closedialog">
    <el-row>

      <el-form  class="el-form-class" label-width="100px">

        <el-form-item label="热门关键字：">
          <el-col :span="24">
            <el-input type="textarea" autosize v-model="keywords"></el-input>
          </el-col>
        </el-form-item>

      </el-form>

    </el-row>
    <el-row>
      <el-col :span="10" :offset="6">  <el-tag>多个热门关键字用逗号隔开</el-tag>
      </el-col>
    </el-row>
  
    <div slot="footer" class="dialog-footer">
   
      <el-button  @click="closedialog">取消</el-button>
         <el-button type="primary" @click="savedata">保存</el-button>
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
      keywords: ""
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
      var p = { keyword: "searchkey" };
      API.getdictlist(p).then(function(res) {
        if (res.meta.success) {
          if (res.data.length > 0) {
            that.keywords = res.data[0].summary;
          }
        } else {
          that.$message.warning("加载数据失败");
        }
      });
    },
    closedialog: function() {
      this.$emit("closedialog");
    },
    savedata: function() {
      var that = this;
      var list = [];
      var p = {
        pcode: "webconfig",
        code: "searchkey",
        summary: this.keywords
      };
      list.push(p);
      API.updatedict(list).then(res => {
        console.log(res)
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