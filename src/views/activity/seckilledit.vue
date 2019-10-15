<template>
  <div>
    <div ref="head">
      <div class="topBtn">
        <btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
      </div>
    </div>
    <div class="seckill">
      <el-form :model="form" ref="form1" class="el-form-class" label-position="right">
        <el-form-item label="活动名称:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="关联商品:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input :readonly="true" @focus="chosegoods" v-model="form.goodsName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="关联单位:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-select v-model="form.goodUnit" placeholder="请选择">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="关键字:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input v-model="form.keywords"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="原价:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input v-model.number="form.oldprice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="秒杀价:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input v-model.number="form.seckillPrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动开始时间:" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.staraTimeLong" value-format="timestamp"></el-date-picker>
            <el-time-picker placeholder="选择时间" v-model="form.staraTimeLong" value-format="timestamp"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动结束时间:" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.endTimeLong" value-format="timestamp"></el-date-picker>
            <el-time-picker placeholder="选择时间" v-model="form.endTimeLong" value-format="timestamp"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="抢购数量:" :label-width="formLabelWidth">
          <el-col :span="12">
            <label>最小</label>
            <el-input-number  v-model="form.mincnt" :min="1" @change="cntchange"></el-input-number>
            <label style="margin-left:20px">最大</label>
            <el-input-number  v-model="form.maxcnt" :min="form.mincnt"></el-input-number>
            <template v-if="form.mincnt!=form.maxcnt">
              <el-tag style="margin-left:5px">随机抢购{{form.mincnt}}~{{form.maxcnt}} {{form.goodUnit}}</el-tag>
            </template>
            <template v-else>
              <el-tag style="margin-left:5px">可抢购{{form.mincnt}}{{form.goodUnit}}</el-tag>
            </template>
          </el-col>
          </el-col>

        </el-form-item>
        <el-form-item label="库存数:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input v-model.number="form.stockcnt"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="排序:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input v-model.number="form.sort"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="显示库存:" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-switch v-model="form.stockShow"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="活动图片:" :label-width="formLabelWidth">
          <el-col :span="7">
            <tool-img ref="toolsimg" :typeid="5" :imgurl="form.img" :imgkey="imgkey" :uploadstu="true" :imgwidth="189" :imgheight="213" :islimit="false" :isdeleteimg="false">
            </tool-img>
            <el-tag>图片大小：189*213</el-tag>
          </el-col>
        </el-form-item>
        <el-form-item label="详情:" :label-width="formLabelWidth">
          <el-col :span="13">
            <tinymce :height="500" v-model="form.seckillContent"></tinymce>
          </el-col>
        </el-form-item>
      </el-form>
      <serach-goods @checkgoods="checkgoods" :limit="1"></serach-goods>
    </div>

  </div>
</template>

<script>
import toolsbtncustom from "@/components/toolsbtncustom";
import toolsdatepicker from "@/components/toolsdatepicker";
import toolsimgsingle from "@/components/toolsimgsingle";
import tinymce from "@/components/toolstinymce";
import toolsearchgoods from "@/components/toolsearchgoods";
import { mapState, mapActions } from "vuex";
import API from "@/api/seckill";
export default {
  components: {
    tinymce,
    "btn-custom": toolsbtncustom,
    "tools-datepicker": toolsdatepicker,
    "tool-img": toolsimgsingle,
    "serach-goods": toolsearchgoods
  },
  data() {
    return {
      imgkey: "",
      form: {
        id: 0,
        title: "",
        oldprice: 0,
        seckillPrice: 0,
        mincnt: 1,
        maxcnt: 1,
        sort: 0,
        stockShow: false,
        img: "",
        seckillContent: "",
        stockcnt: 0,
        goodsName: "",
        status: 0,
        goodsId: 0,
        goodUnit: "",
        staraTimeLong: "",
        endTimeLong: ""
      },
      formLabelWidth: "120px",
      custombtn: [
        {
          name: "返回",
          icoName: " fa-back s-blue",
          fnHandler: "$parent.back_click()"
        },
        {
          name: "保存",
          icoName: "edit s-green",
          fnHandler: "$parent.savedata()"
        }
      ],
      tipflag: false,
      options2: []
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params
    })
  },
  methods: {
    ...mapActions({
      setparams: "setparams"
    }),
    checkgoods(ids) {
      this.options2 = [];
      this.form.goodsId = ids;
      this.initGoodsUnit(ids);
    },
    chosegoods() {
      this.$set(this.params, "goodsshow", true);
    },
    initData() {
      var that = this;
      if (this.$refs.toolsimg) {
        this.$refs.toolsimg.cdnurl = "";
      }
      if (this.$route.query.id != 0) {
        var p = { id: this.$route.query.id };
        API.getseckilldetailbyid(p).then(function(res) {
          that.form = res.data.obj;
          that.form.staraTimeLong = res.data.obj.staraTime;
          that.form.endTimeLong = res.data.obj.endTime;
          that.imgkey = that.getkeybyfile(res.data.obj.img);
          if (that.form.stockShow == 0) {
            that.form.stockShow = true;
          } else {
            that.form.stockShow = false;
          }
          that.initGoodsUnit(res.data.obj.goodsId);
        });
      }
    },
    initGoodsUnit(id) {
      var that = this;
      var p = { id: id };
      API.getgoodsunitbyid(p).then(function(res) {
        if (res.meta.success) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              let q = { value: res.data[i].unit, label: res.data[i].unit };
              that.options2.push(q);
            }
            that.form.goodsName = res.data[0].goodsName;
            that.form.title = res.data[0].goodsName;
          }
        }
      });
    },
    cntchange(val) {
      if (val > this.form.maxcnt) {
        this.form.maxcnt = val;
      }
    },
    savedata() {
      var that = this;
      if (this.$refs.toolsimg.cdnurl) {
        this.form.img = this.$refs.toolsimg.cdnurl;
      }
      if (!this.form.img && this.form.img.toString() == "") {
        this.$message.warning("活动图片必须上传");
        return;
      }
      if (that.form.stockShow) {
        that.form.stockShow = 0;
      } else {
        that.form.stockShow = 1;
      }
      if (this.$route.query.id == 0) {
        API.addseckill(this.form).then(function(res) {
          if (res.meta.success) {
            that.$message.success("保存成功");
            that.$router.push("/seckill");
          } else {
            that.$message.error("保存失败:" + res.meta.msg);
          }
        });
      } else {
        if (this.form.status != 0) {
          this.$message.error("已开始的活动不能再编辑");
          return;
        }
        if (this.form.endTimeLong < this.form.staraTimeLong) {
          this.$message.warning("活动结束时间不能小于开始时间");
          return;
        }

        API.updateseckill(this.form).then(function(res) {
          if (res.meta.success) {
            that.$message.success("保存成功");
            that.$router.push("/seckill");
          } else {
            that.$message.error("保存失败:" + res.meta.msg);
          }
        });
      }
    },
    back_click() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.seckill {
  background: #fff;
  height: 100%;
}
.seckill .el-form-item {
  margin-top: 20px;
}
</style>
