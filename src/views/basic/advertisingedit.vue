<template>
  <el-dialog title="广告编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
    <!-- <el-row>
			<div class="topBtn">
				<btn-tools :listPage="listPage" @submit="onSubmit"></btn-tools>
			</div>
		</el-row> -->
    <el-form ref="form" :model="form" label-width="120px" class="editForm">
      <br/>
      <el-row v-show="this.params.status">
        <el-col :span="20">
          <el-form-item label="广告类型">
            <select-list ref="advertisingtype" pcode="advertisingtype" :code="form.imgType" type="1">
            </select-list>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="标题:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="跳转关键字:">
            <el-input v-model="form.keywords"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="跳转连接:">
            <el-input v-model="form.redirtUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="图片地址:">
            <tool-img ref="toolsimg" :typeid="5" :imgurl="form.imgUrl" :imgkey="imgkey" :uploadstu="true" :imgwidth="imgwidth" :imgheight="imgheigth" :islimit="false">
            </tool-img>
            <el-tag>图片大小：{{imgwidth}}*{{imgheigth}}</el-tag>
            <el-tag>点击+进行上传</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="排序:">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="info" class="eidtButton" @click="closedialog" plain>取消</el-button>
      <el-button type="warning" class="eidtButton" @click="onSubmit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import basic from "@/api/basic";
import editbtn from "@/components/editbtn";
import { mapState, mapActions } from "vuex";
import selectlist from "@/components/toolselect";
import toolsimgsingle from "@/components/toolsimgsingle";
export default {
  components: {
    "select-list": selectlist,
    "btn-tools": editbtn,
    "tool-img": toolsimgsingle
  },
  data() {
    return {
      form: {
        id: 0,
        imgType: "",
        imgUrl: "",
        keywords: "",
        name: "",
        redirtUrl: "",
        sort: 0
      },
      imgkey: "",
      imgwidth: 740,
      imgheigth: 470
    };
  },
  computed: {
    ...mapState({
      ishow: state => state.toolslist.dialogshow,
      id: state => state.toolslist.id,
      params: state => state.toolslist.params
    })
  },
  methods: {
    ...mapActions({
      setdialoghidden: "setdialoghidden"
    }),
    closedialog() {
      this.setdialoghidden();
    },
    openinit() {
      if (this.$refs.toolsimg) {
        this.$refs.toolsimg.cdnurl = "";
      }
      this.form = {
        id: 0,
        imgType: "",
        imgUrl: "",
        keywords: "",
        name: "",
        redirtUrl: "",
        sort: 0
      };
      this.form.imgType = this.params.imgtype;
      if (this.params.imgtype == "seckillbanner") {
        this.imgwidth = 1190;
        this.imgheigth = 360;
      }
      if (this.id > 0) {
        basic.advertising("GETID", this.id).then(res => {
          this.form = res.data.obj;
          this.imgkey = this.getkeybyfile(this.form.imgUrl);
          this.form.imgType = res.data.obj.imgType.toString();
        });
      }
    },
    onSubmit() {
      let method = "POST";
      if (this.form.id > 0) {
        method = "PATCH";
      }
      this.form.imgType = this.$refs.advertisingtype.values;
      if (this.$refs.toolsimg.cdnurl) {
        this.form.imgUrl = this.$refs.toolsimg.cdnurl;
      }
      if (this.form.imgUrl.toString() == "") {
        this.$message.warning("图片必须上传");
        return;
      }
      basic.advertising(method, this.form).then(res => {
        if (res.meta.success) {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$parent.init();
          this.setdialoghidden();
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
