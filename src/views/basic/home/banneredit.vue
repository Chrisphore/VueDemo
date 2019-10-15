<!-- Table -->
<template>
  <el-dialog :title="title" :visible="ishow" center width="30%" @open="openinit" @close="closedialog">
    <el-row>
      <el-form class="editForm" label-width="120px">
        <!-- <el-row>
          <el-form-item label="标题:">
            <el-col :span="20">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
        </el-row> -->
        <!-- <el-row>
          <el-form-item label="关键字:">
            <el-col :span="20">
              <el-input v-model="form.keywords"></el-input>
            </el-col>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item label="LOGO:">
            <tool-img ref="toolsimg" :typeid="5" :imgurl="form.imgUrl" :imgkey="imgkey" :uploadstu="true" :imgwidth="146" :imgheight="100" :islimit="false" :isdeleteimg="false" >
            </tool-img>
            <el-tag>图片大小：{{imgsize}}</el-tag>
            <el-tag>点击+进行上传</el-tag>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="跳转地址:">
            <el-col :span="20">
              <el-input v-model="form.redirtUrl"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

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
import basic from "@/api/basic";
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
        imgType: "",
        imgUrl: "",
        keywords: "",
        name: "",
        redirtUrl: ""
      },
      formLabelWidth: 100,
      title: ""
    };
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params,
      ishow: state => state.toolslist.params.bannerstatus,
      bannertype: state => state.toolslist.params.bannertype,
      flag: state => state.toolslist.params.flag,
      imgsize: state => state.toolslist.params.imgsize
    })
  },
  watch: {
    showstu: function(newVal) {
      this.ishow = newVal;
    }
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    //窗体初始化加载事件
    openinit: function() {
      if (this.$refs.toolsimg) {
        this.$refs.toolsimg.cdnurl = "";
      }
      var that = this;
      this.title = this.params.title;
      var p = { imgType: this.bannertype, keyword: this.flag };
      basic.advertising("LIST", p).then(res => {
        if (res.data.length > 0) {
          that.form.id = res.data[0].id;
          that.form.imgType = res.data[0].imgType;
          that.form.imgUrl = res.data[0].imgUrl;
          that.imgkey = that.getkeybyfile(res.data[0].imgUrl);
          that.form.name = res.data[0].name;
          that.form.redirtUrl = res.data[0].redirtUrl;
          that.form.keywords = res.data[0].keywords;
        }
      });
    },
    closedialog: function() {
      this.form.id = 0;
      this.form.imgType = "";
      var p = { status: false };
      this.setparms(p);
    },
    uploadimg: function() {
      let method = "POST";
      if (this.form.id > 0) {
        method = "PATCH";
      }
      this.form.imgType = this.bannertype;
      if (this.$refs.toolsimg.cdnurl) {
        this.form.imgUrl = this.$refs.toolsimg.cdnurl;
      }
      if(!this.form.imgUrl&&this.form.imgUrl.toString()=='') {
        this.$message.warning('图片必须上传');
        return;
      }
      basic.advertising(method, this.form).then(res => {
        if (res.meta.success) {
          this.$message.success("保存成功!");
          this.closedialog();
        } else {
          let mes = res.meta.message + "保存失败!";
          this.$message({
            type: "success",
            message: mes
          });
        }
      });
    }
  }
};
</script>