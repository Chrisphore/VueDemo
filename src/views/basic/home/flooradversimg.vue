<!-- Table -->
<template>
  <el-dialog title="区域图片装修" :visible="ishow" center width="30%" @open="openinit" @close="closedialog">
    <el-row>
      <el-form class="editForm" label-width="120px">
        <el-row>
          <el-form-item :label="form.name+' :'">
            <tool-img ref="toolsimg" :typeid="5" :isreplaceurl="false" :imgurl="form.imgUrl" :imgkey="imgkey" 
            :isdeleteimg="false" :uploadstu="true" :imgwidth="146" :imgheight="100" :islimit="false">
            </tool-img>
            <el-tag>图片大小：{{form.imgsize}}</el-tag>
            <el-tag>点击+进行上传</el-tag>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="搜索关键字:">
            <el-col :span="20">
              <el-input v-model="form.keywords"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

      </el-form>

    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="closedialog">取消</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
      
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
        imgUrl: "",
        keywords: "",
        redirtUrl: "",
        imgsize: "",
        name: ""
      },
      formLabelWidth: 100
    };
  },
  computed: {
    ...mapState({
      datamodel: state => state.toolslist.datamodel,
      ishow: state => state.toolslist.datamodel.imgshow,
      arealist: state => state.toolslist.datamodel.arealist
    })
  },
  watch: {
    showstu: function(newVal) {
      this.ishow = newVal;
    }
  },
  methods: {
    ...mapActions({
      setdatamodel: "setdatamodel"
    }),
    //窗体初始化加载事件
    openinit: function() {
      var that = this;
      that.form.imgUrl = "";
      that.form.keywords = "";
      that.form.redirtUrl = "";
      that.form.imgsize = "";
      that.form.name = "";
      var p = that.arealist.filter(function(item) {
        if (item.dictId == that.datamodel.id) {
          return item;
        }
      });

      if (p.length > 0) {
        if (p[0].imgurl != null) {
          that.form.imgUrl = p[0].imgurl;
          //   that.imgkey = that.getkeybyfile(p[0].imgurl.toString());
        }
        if (p[0].keywords != null) {
          that.form.keywords = p[0].keywords;
        }

        if (p[0].summary.indexOf(",") != -1) {
          that.form.imgsize = p[0].summary.substring(
            p[0].summary.lastIndexOf(",") + 1
          );
        }
        if (p[0].name != null) {
          that.form.name = p[0].name;
        }
      }
    },
    closedialog: function() {
      this.datamodel.imgshow = false;
    },
    savedata: function() {
      var that = this;
      this.arealist.forEach(item => {
        if (item.dictId == that.datamodel.id) {
          item.keywords = that.form.keywords;
          if (that.$refs.toolsimg.cdnurl) {
            that.form.imgUrl = that.$refs.toolsimg.cdnurl;
            item.imgurl = that.form.imgUrl;
          }
        }
      });
      this.datamodel.imgshow = false;
    }
  }
};
</script>