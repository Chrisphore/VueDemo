<template>
  <el-dialog title="导航菜单编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
    <!-- <el-row>
			<div class="topBtn">
				<btn-tools :listPage="listPage" @submit="onSubmit"></btn-tools>
			</div>
		</el-row> -->
    <el-form ref="form" :model="form" label-width="120px" class="editForm">
      <br/>
      <el-row>
        <el-col :span="20">
          <el-form-item label="菜单名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <template v-show="this.params.status" > -->
      <!-- <template> -->
      <el-row v-show="this.params.status">
        <el-col :span="20">
          <el-form-item label="菜单类型:">
            <select-list ref="menutype" pcode="menutype" :code="form.menuType" type="1">
            </select-list>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- </template> -->
      <!-- <el-row>
        <el-col :span="20">
          <el-form-item label="菜单地址:">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
			<el-row>
				<el-col :span="20">
					<el-form-item label="搜索关键字:">
						<el-input v-model="form.keywords"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
      <el-row v-show="this.params.type=='2' ? true : false">
        <el-col :span="20">
          <el-form-item label="菜单图标:">
            <tool-img ref="toolsimg" :typeid="5" :imgurl="form.img" :imgkey="imgkey" :uploadstu="true" :imgwidth="40" :imgheight="40" :islimit="false" :isdeleteimg="false">
            </tool-img>
            <el-tag>图标大小：40*40</el-tag>
            <el-tag>点击+进行上传</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="菜单状态:">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value">
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
import selectlist from "@/components/toolselect";
import toolsimgsingle from "@/components/toolsimgsingle";
export default {
  components: {
    "btn-tools": editbtn,
    "select-list": selectlist,
    "tool-img": toolsimgsingle
  },
  data() {
    return {
      form: {
        id: 0,
        name: "",
        url: "/pages/newproduct",
        img: "",
        menuType: "1",
        status: 0,
				keywords:""
      },
      statusOption: [
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
      id: state => state.toolslist.id,
      params: state => state.toolslist.params
    })
  },
  mounted() {},
  methods: {
    ...mapActions({
      setdialoghidden: "setdialoghidden"
    }),
    closedialog() {
      this.setdialoghidden();
    },
    openinit() {
			if(this.$refs.toolsimg)
			{
				this.$refs.toolsimg.cdnurl = ""
				this.$refs.toolsimg.imgsrc = ""
			}
      this.form = {
        id: 0,
        name: "",
        url: "/pages/newproduct",
        img: "",
        menuType: "",
        status: 0
      };
      this.form.menuType = this.params.type;
      var that = this;
      if (this.id > 0) {
        basic.menu("GETID", this.id).then(res => {
          this.form = res.data.obj;
          this.imgkey = that.getkeybyfile(this.form.img);
          this.form.menuType = res.data.obj.menuType.toString();
        });
      }
    },
    onSubmit() {
			if(this.form.status < 0 || this.form.status == null ){
				this.$message.warning('请选择菜单状态!');
				return;
			}
			
      let method = "POST";
      if (this.form.id > 0) {
        method = "PATCH";
      }
      this.form.menuType = this.$refs.menutype.values;
      if (this.$refs.toolsimg.cdnurl) {
        this.form.img = this.$refs.toolsimg.cdnurl;
      }

      basic.menu(method, this.form).then(res => {
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
