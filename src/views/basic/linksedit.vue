<template>
	<el-dialog title="友情链接编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
		<!-- <el-row>
			<div class="topBtn">
				<btn-tools :listPage="listPage" @submit="onSubmit"></btn-tools>
			</div>
		</el-row> -->
		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br/>
			<el-row>
				<el-col :span="20">
					<el-form-item label="链接名称:">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="链接地址:">
						<el-input v-model="form.redirturl"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="图片地址:">
						<tool-img ref="toolsimg" :typeid="5" :imgurl="form.imgurl" :imgkey="imgkey" :uploadstu="true" :imgwidth="100" :imgheight="30" :islimit="false" :isdeleteimg="false">
						</tool-img>
						<el-tag>图片大小：100*30</el-tag>
						<el-tag>点击+进行上传</el-tag>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="显示状态:">
						<el-select v-model="form.status" placeholder="请选择">
							<el-option
								v-for="item in statusOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
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
import toolsimgsingle from "@/components/toolsimgsingle";
export default {
  components: {
    "btn-tools": editbtn,
    "tool-img": toolsimgsingle
  },
  data() {
    return {
      form: {
        id: 0,
        name: "",
        redirturl: "",
        imgurl: "",
        status: 0
      },
      statusOptions: [
        {
          value: 0,
          label: "显示"
        },
        {
          value: 1,
          label: "不显示"
        }
      ],
      imgkey: ""
    };
  },
  computed: {
    ...mapState({
      ishow: state => state.toolslist.dialogshow,
      id: state => state.toolslist.id
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
        name: "",
        redirturl: "",
        imgurl: "",
        status: 0
      };
      if (this.id > 0) {
        basic.links("GETID", this.id).then(res => {
          this.form = res.data.obj;
          if (this.form.imgurl != null) {
            this.imgkey = this.getkeybyfile(this.form.imgurl);
          }
        });
      }
    },
    onSubmit() {
      let method = "POST";
      if (this.form.id > 0) {
        method = "PATCH";
      }
      if (this.$refs.toolsimg.cdnurl) {
        this.form.imgurl = this.$refs.toolsimg.cdnurl;
      }
      if (!this.form.imgurl && this.form.imgurl== '') {
        this.$message.warning("图片必须上传");
        return;
      }
      basic.links(method, this.form).then(res => {
        //console.log(JSON.stringify(res));
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
