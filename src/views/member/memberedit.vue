<!-- Table -->
<template>
<el-dialog title="修改会员信息" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
  <el-form :model="form" ref="form1" >
    <el-form-item label="公司名称"  :label-width="formLabelWidth">
      <el-col :span="7">
      <el-input v-model="form.company"></el-input>
      </el-col>
    </el-form-item>
        <el-form-item label="职称"  :label-width="formLabelWidth">
      <el-col :span="7">
      <el-input v-model="form.job"></el-input>
      </el-col>
    </el-form-item>
       </el-form-item>
        <el-form-item label="备注"  :label-width="formLabelWidth">
      <el-col :span="7">
      <el-input v-model="form.summary"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="售价方式" :label-width="formLabelWidth">
      <el-col :span="7">
          <tool-select 
            ref="priceway"
            :default="form.priceway"
            type="18" >
        </tool-select>
      </el-col :span="7">
    </el-form-item>
    <el-form-item label="跟踪售价" :label-width="formLabelWidth">
      <el-switch v-model="form.istrack"></el-switch>
    </el-form-item>
      <el-form-item label="仓库" :label-width="formLabelWidth">
      <el-col :span="7">
        <tool-select 
            ref="memberstore"
            arg="1" 
            :default="form.memberstore"
            type="3" >
        </tool-select>
      </el-col :span="7">
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closedialog" >取消</el-button>
    <el-button type="primary" @click="updatemember" >确认</el-button>
  </div>
</el-dialog>
  
</template>
<script>
import toolselect from "@/components/toolselectnew";
import API from "@/api/member";
import toolsinput from "@/components/toolsinput";
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";
export default {
  components: {
    "tool-select": toolselect,
    "tool-input": toolsinput
  },
  data() {
    return {
      form: {
        company: "",
        khid: 0,
        job: "",
        summary: "",
        priceway: "",
        istrack: false,
        memberstore: ""
      },
      formLabelWidth: "100px"
    };
  },
  computed: {
    ...mapState({
      ishow: state => state.toolslist.dialogshow,
      ids: state => state.toolslist.id
    })
  },
  methods: {
    ...mapActions({
      setdialoghidden: "setdialoghidden"
    }),
    closedialog() {
      this.setdialoghidden();
    },
    //弹窗加载事件
    openinit() {
      var that = this;
      var p = { id: that.ids };
      //获取会员信息
      API.getmemberinfobyid(p).then(function(res) {
        console.log(res)
        if (res.meta.success) {
          if (res.data.obj != null) {
            that.form.company = res.data.obj.companyName;
            that.form.job = res.data.obj.job;
            that.form.summary = res.data.obj.summary;
            that.form.priceway = res.data.obj.priceMode;
            that.form.istrack = res.data.obj.trackPrice;
            that.form.memberstore = res.data.obj.storeId;
          }
        }
      });
    },
    updatemember() {
      var that = this;
      var p = {
        id: that.ids,
        companyName: that.form.company,
        job: that.form.job,
        summary: that.form.summary,
        companyName: that.form.company,
        priceMode: that.$refs.priceway.values,
        storeId: that.$refs.memberstore.values,
        trackPrice: that.form.istrack
      };
      if (p.priceMode.length <= 0) {
        that.$message({
          message: "请先选择售价方式",
          type: "warning"
        });
        return;
      }
      if (p.storeId.length <= 0) {
        that.$message({
          message: "请选择绑定仓库后操作",
          type: "warning"
        });
        return;
      }
      API.updatememberinfobyid(p).then(function(res) {
        console.log(res);
        if (res.meta.success) {
          that.$message.success("修改成功");
          that.setdialoghidden();
          that.$emit("updatestu");
        } else {
          that.$message.error("修改失败");
        }
      });
    }
  }
};
</script>