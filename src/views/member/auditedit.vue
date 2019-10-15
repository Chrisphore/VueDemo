<!-- Table -->
<template>
<el-dialog title="审核会员" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
  <el-form :model="form" ref="form1" >
    <el-form-item label="选择客户" :label-width="formLabelWidth">
      <el-col :span="20">
        <tool-input 
        ref="childrenkhid"
        title="请输入客户名称" 
        :listdata="customerdata" 
        :enable="enable">
        </tool-input>
        <el-button  type="info" @click="setdisabled">选择客户</el-button>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码"  :label-width="formLabelWidth">
      <el-col :span="7">
      <el-input v-model="form.mobile"></el-input>
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
    <el-button  @click="closedialog">取消</el-button>
     <el-button type="primary" @click="auditmember">审核</el-button>
  </div>
</el-dialog>
  
</template>
<script>
import toolselect from "@/components/toolselectnew";
import API from "@/api/member";
import toolsinput from "@/components/toolsinput";
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";
import { ifError } from "assert";
export default {
  components: {
    "tool-select": toolselect,
    "tool-input": toolsinput
  },
  data() {
    return {
      form: {
        name: "",
        khid: 0,
        mobile: "",
        priceway: "",
        istrack: false,
        memberstore: ""
      },
      memberid: this.id,
      formLabelWidth: "100px",
      customerdata: [],
      listarray: [],
      enable: true
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
    auditmember() {},
    getmemberinfo() {},
    closedialog() {
      this.setdialoghidden();
    },
    //弹窗加载事件
    openinit() {
      var that = this;

      if (that.$refs.priceway) {
        that.$refs.priceway.values = "";
      }
      if (that.$refs.memberstore) {
        that.$refs.memberstore.values = "";
      }
       if (that.$refs.childrenkhid) {
        that.$refs.childrenkhid.selectid = "";
          that.$refs.childrenkhid.values="";
      }

      that.form.istrack=false;
      var p = { id: that.ids };
      //获取会员信息
      API.getmemberapplyinfo(p).then(function(res) {
        if (res.meta.success) {
          if (res.data.obj != null) {
            that.form.mobile = res.data.obj.phone;
          }
        }
      });
    },
    //获取客户档案信息
    getcustomerlist() {
      var that = this;
      var p = { state: 1 };
      API.getcustomerlist(p).then(function(res) {
        if (res.meta.success) {
          var newVal = res.data;
          if (newVal.length > 0) {
            newVal.forEach(element => {
              let model = {
                id: element.id,
                value: element.name + "|" + element.code
              };
              that.listarray.push(model);
            });
          }
          that.customerdata = that.listarray;
        }
      });
    },
    setdisabled() {
      this.enable = false;
      this.getcustomerlist();
    },
    auditmember() {
      var that = this;
      var p = {
        id: that.ids,
        khid: that.$refs.childrenkhid.selectid,
        status: 1,
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
      API.auditmember(p).then(function(res) {
        if (res.meta.success) {
          that.$message({
            message: "审核成功",
            type: "success"
          });

          that.setdialoghidden();
          that.$emit("updatestu");
        } else {
          that.$message.error("审核失败");
        }
      });
    }
  }
};
</script>