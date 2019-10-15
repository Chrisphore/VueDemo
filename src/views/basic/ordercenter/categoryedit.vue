<template>
  <el-dialog :title="this.params.title" :visible="ishow" center width="30%" @open="openinit" @close="closedialog">
    <el-row>
      <el-form class="editForm" label-width="120px">
        <el-row>
          <el-form-item label="畅销名称:">
            <el-col :span="20">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>

    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="closedialog">取消</el-button>
      <el-button type="primary" @click="saveData">保存</el-button>
      
    </div>

  </el-dialog>

</template>
<script>
import toolsimgsingle from "@/components/toolsimgsingle";
import API from "@/api/decoration";
import { mapState, mapActions } from "vuex";
export default {
  props: ["showstu"],
  components: {
    "tool-img": toolsimgsingle
  },
  data() {
    return {
      imgkey: "",
      form: {
        id: 0,
        name: ""
      },
      formLabelWidth: 100
    };
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params,
      ishow: state => state.toolslist.params.categorystu
    })
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    //窗体初始化加载事件
    openinit: function() {
      this.initData();
    },
    initData() {
      if (this.params.categoryid != 0) {
        var that = this;
        var p = { id: this.params.categoryid };
        API.getselltypedetailbyid(p).then(function(res) {
          console.log(res);
          if (res.meta.success) {
            if (res.data.obj != null) {
              that.form.name = res.data.obj.name;
            }
          }
        });
      }
    },
    closedialog: function() {
      this.form.name = "";
      this.params.categorystu = false;
    },
    saveData: function() {
      var that = this;
      var p = { id: that.params.categoryid, name: that.form.name };
      API.updateselltypebyid(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("保存成功");
          that.form.name = "";
          that.params.categorystu = false;
          that.$parent.$parent.init();
        }
        else
        {
          that.$message.error(res.meta.message);
        }
      });
    }
  }
};
</script>