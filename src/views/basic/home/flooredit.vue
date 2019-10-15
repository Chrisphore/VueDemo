<template>
<div>
    <div class="topBtn">
        <btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
      </div>
  <div class="floorditcontent">
  

    <h3>已选择 楼层样式 {{floorid}} </h3>
    <img :src="imgurl" alt="">
    <div class="row">
      <label>楼层名称
        <i>*</i>
      </label>
            <el-col :span="7">
      <el-input v-model="formData.name" placeholder="请输入楼层名称"></el-input>
            </el-col>
    </div>
    <div class="row">
      <label>楼层标题
        <i>*</i>
      </label>
      <el-col :span="7">
         <el-input  v-model="formData.title" placeholder="请输入楼层标题"></el-input>
      </el-col>
    </div>
        <div class="row">
      <label>显示顺序
        <i>*</i>
      </label>
      <el-col :span="7">
         <el-input  v-model="formData.sort" placeholder="请输入显示顺序"></el-input>
      </el-col>
    </div>
      <div class="row">
      <label>显示状态
        <i>*</i>
      </label>
           <el-col :span="7">
          <el-switch v-model="formData.status"></el-switch>
            </el-col>
    </div>
    <div class="row" v-show="floorid != 2 && planflag == 'pc' ? true : false">
      <label>添加分类
        <i>*</i>
      </label>
      <div style="width:80%;">
        <list-member :columndata="columndatas" :bindata="listdata" :headHeight="myheigth.toString()+'px'" ref="childrenlist" @btnclick="btnclick">
        </list-member>
        <div class="addicon" @click="addcategory">
          <span>+</span>
          （最多添加4个）
        </div>
      </div>
    </div>
    <div class="row" v-show="floorid != 2 && planflag == 'pc'  ? true : false ">
      <label>默认分类
        <i>*</i>
      </label>
           <el-col :span="7">
      <el-input v-model="formData.defaulttitle" placeholder="请输入默认分类标题" aria-required="默认分类必须填写"></el-input>
            </el-col>
    </div>
    <div class="row">
      <label>区域装修
        <i>*</i>
      </label>
      <div style="width:80%;">
        <list-member :columndata="areacolumns" :bindata="arealist" ref="childrenlist" :headHeight="planflag== 'pc' ? '600px' : '400px'" @btnclick="btnclick">
        </list-member>
      </div>
    </div>

     <!-- <div class="row">
        <el-button type="success" style="margin-left:80px" @click="savefloor">保存楼层</el-button>
    </div> -->
      <serach-goods> </serach-goods>
      <floor-adversimg> </floor-adversimg>
      <floor-serachgoods></floor-serachgoods>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseApi from "@/api/base";
import list from "@/components/list";
import API from "@/api/decoration";
import serachgoods from "./serachgoods";
import flooradversimg from "./flooradversimg";
import floorserachgoods from "./floorserachgoods";
import toolsbtncustom from "@/components/toolsbtncustom";
export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-member": list,
    "serach-goods": serachgoods,
    "floor-adversimg": flooradversimg,
    "floor-serachgoods": floorserachgoods
  },
  data() {
    return {
      columndatas: [
        {
          label: "名称",
          prop: "typeName",
          type: "input"
        },
        {
          label: "已选商品",
          prop: "typeGoodsSize"
        },
        {
          label: "操作",
          type: "btns",
          btns: [
            {
              type: "success",
              text: "选择商品",
              handle: "edit"
            },
            {
              type: "danger",
              text: "删除",
              handle: "delete"
            }
          ]
        }
      ],
      areacolumns: [
        {
          label: "区域",
          prop: "name",
          width: "140px"
        },
        {
          label: "图片/商品",
          prop: "imgsrc",
          type: "btntype",
          width: "140px",
          uploadtype: "summary",
          imghandle: "choseimg",
          goodshandle: "chosegoods"
        },
        {
          label: "内容",
          type: "labeltype",
          labeltype: {
            type: "summary",
            prop: "imgurl",
            prop1: "goodsName"
          },
          imgheight: "60px"
        }
      ],
      //   listdata: [],
      areadata: [],
      imgurl: "#",
      myheigth: 80, //默认分类高度,
      formData: {
        title: "",
        name: "",
        defaulttitle: "",
        sort: 0,
        status: true
      },
      flag: "", //标识当前是新增楼层还是编辑楼层 add: 新增 edit 编辑
      id: 0, //用于计算新增分类默认id
      floorid: this.$route.query.floorid,
      planflag: this.$route.query.planflag,
      custombtn: [
        {
          name: "返回",
          icoName: " fa-back s-blue",
          fnHandler: "$parent.back_click()"
        },
        {
          name: "保存",
          icoName: "edit s-green",
          fnHandler: "$parent.savefloor()"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params,
      listdata: state =>
        state.toolslist.params.listdata == undefined
          ? []
          : state.toolslist.params.listdata,
      datamodel: state => state.toolslist.datamodel,
      arealist: state =>
        state.toolslist.datamodel.arealist == undefined
          ? []
          : state.toolslist.datamodel.arealist
    })
  },
  mounted() {
    if (this.$route.query.planid == 0) {
      this.flag = "add";
    } else {
      this.flag = "edit";
    }
    this.initdefaultshow();
    this.initImg();
    this.initCategory();
    this.initDeafulttitle();
    this.initArea();
  },
  methods: {
    ...mapActions({
      setparams: "setparams",
      setdatamodel: "setdatamodel"
    }),
    initdefaultshow() {
      var that = this;
      if (this.$route.query.planid != 0) {
        var p = { id: this.$route.query.planid };
        API.getplanmodelbyid(p).then(function(res) {
          if (res.data.obj != null) {
            if (res.data.obj.planType == "1") {
              that.planflag = "pc";
            } else {
              that.planflag = "wx";
            }
            that.floorid = res.data.obj.template;
          }
        });
      }
    },
    //初始化楼层样式图片
    initImg() {
      var that = this;
      if (that.$route.query.planid == 0) {
        var type = that.$route.query.planflag + "floorimg";
        var p = { pcode: type, code: that.$route.query.floorid };
        console.log(JSON.stringify(p));
        BaseApi.getdictbypcode(p).then(function(res) {
          console.log(res);
          if (res.data != null) {
            that.imgurl = res.data[0].summary;
          }
        });
      }
    },
    //获取分类列表
    initCategory() {
      this.setparams({ listdata: [] });
      if (this.$route.query.planid != 0) {
        var that = this;
        var p = { planDetailId: this.$route.query.planid, isDefault: 1 };
        API.getplandetailbyid(p).then(function(res) {
          //初始化数据
          that.imgurl = res.data.template;
          that.formData.title = res.data.alias;
          that.formData.name = res.data.name;
          if (res.data.status == 0) {
            that.formData.status = true;
          } else {
            that.formData.status = false;
          }
          that.formData.sort = res.data.sort;
          if (
            res.data.goodsTypeList != null &&
            res.data.goodsTypeList.length > 0
          ) {
            //设置分类标识 用于更改选择商品数据
            res.data.goodsTypeList.forEach(element => {
              element.goodslist = [];
              element.flag = false;
              element.viewflag = "edit";
            });
            var q = {
              listdata: res.data.goodsTypeList
            };
            that.setparams(q);
            that.initCategoryHeight();
          }
        });
      }
    },
    //初始化默认分类标题
    initDeafulttitle() {
      if (this.$route.query.planid != 0) {
        var that = this;
        var p = { planDetailId: this.$route.query.planid, isDefault: 0 };
        API.getplandetailbyid(p).then(function(res) {
          if (
            res.data.goodsTypeList != null &&
            res.data.goodsTypeList.length > 0
          ) {
            that.formData.defaulttitle = res.data.goodsTypeList[0].typeName;
          }
        });
      }
    },
    //初始化区域数据
    initArea() {
      var that = this;
      if (that.$route.query.planid == 0) {
        var type = that.$route.query.planflag + "floorarea";
        var p = { pcode: type, code: that.$route.query.floorid };
        BaseApi.getdictbypcode(p).then(function(res) {
          if (res.data.length > 0) {
            var a = [];
            //初始化区域数据
            res.data.forEach(item => {
              var q = {
                name: item.name,
                summary: item.summary,
                imgurl: "",
                goodsId: "",
                sort: item.sort,
                goodsName: "",
                dictId: item.id,
                keywords: "",
                redirturl: ""
              };
              a.push(q);
            });
          }
          var q = { arealist: a };
          that.setdatamodel(q);
        });
      } else {
        var p = { planDetailId: that.$route.query.planid };
        API.getplanareadetail(p).then(function(res) {
          var q = { arealist: res.data };
          that.setdatamodel(q);
        });
      }
    },
    //计算高度
    initCategoryHeight() {
      if (this.listdata != null && this.listdata != undefined) {
        if (this.listdata.length > 0) {
          this.myheigth = 35 * this.listdata.length + 35;
        } else {
          this.myheigth = 80;
        }
      }
    },
    //新增分类
    addcategory() {
      if (this.listdata.length < 4) {
        this.id = new Date().getTime();
        var p = {
          typeName: "",
          typeGoodsSize: 0,
          id: this.id,
          goodslist: [],
          viewflag: "add",
          flag: true
        };
        this.listdata.push(p);
        this.initCategoryHeight();
      } else {
        this.$message.error("当前最多添加四个分类");
      }
    },
    btnclick(id, handle) {
      eval("this." + handle + "(" + id + ")");
    },
    //编辑
    edit(id) {
      var q = this.listdata.filter(function(item) {
        if (item.id == id) {
          return item;
				
        }
      });
      if (q.length > 0) {
        var p = {
          goodsshow: true,
          listdata: this.listdata,
          viewflag: q[0].viewflag,
          id: id
        };
        this.setparams(p);
      }
    },
    //移除分类
    delete(id) {
      var that = this;
      for (let i = 0; i < this.listdata.length; i++) {
        if (this.listdata[i].id == id) {
          this.listdata.splice(i, 1);
        }
      }
      this.initCategoryHeight();
    },
    //选择楼层图片
    choseimg(id) {
      var p = {
        imgshow: true,
        arealist: this.arealist,
        id: id
      };
      this.setdatamodel(p);
    },
    //选择楼层商品
    chosegoods(id) {
      var p = {
        goodsshow: true,
        arealist: this.arealist,
        id: id
      };
      this.setdatamodel(p);
    },
    //保存楼层
    savefloor() {
      var that = this;
      if (that.formData.name.length <= 0) {
        that.$message.warning("请输入楼层名称");
        return;
      }
      if (that.formData.title.length <= 0) {
        that.$message.warning("请输入楼层标题");
        return;
      }
      if (that.floorid != 2 && that.planflag == "pc") {
        if (that.formData.defaulttitle == "") {
          that.$message.warning("默认分类必须要输入");
          return;
        }
      }
      if (that.planflag == "wx") {
        that.formData.defaulttitle = "wx";
      }
      let stu = 0;
      if (!that.formData.status) {
        stu = 1;
      }

      var p = {
        flag: this.flag,
        categorylist: this.listdata,
        name: this.formData.name,
        defaultcategory: this.formData.defaulttitle,
        title: this.formData.title,
        arealist: this.arealist,
        planDetailId: this.$route.query.planid,
        floorid: this.$route.query.floorid,
        plantype: this.$route.query.planflag,
        sort: this.formData.sort,
        status: stu
      };
      API.setfloorstyle(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("楼层样式保存成功");
          that.$router.go(-1);
        }
      });
    },
    back_click() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.floorditcontent {
  width: calc(100%-16px);
  height: auto;
  margin-top: 5px;
  padding: 20px 16px;
  background: #ffffff;
}
.floorditcontent > h3 {
  height: 12px;
  font-size: 14px;
  line-height: 1;
  text-align: left;
  color: #333333;
}
.floorditcontent > img {
  /* width: 40%; */
  display: block;
  margin: 10px 0px 20px 0px;
}
.row {
  width: 100%;
  display: flex;
  margin-bottom: 18px;
}
.row > label {
  height: 12px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #333333;
  display: inline-block;
  margin-right: 10px;
  vertical-align: text-bottom;
  height: 20px;
}
.row > label > i {
  color: #ff0000;
}
.row > input {
  width: 190px;
  height: 18px;
  border-radius: 3.8px;
  background-color: #ffffff;
  border-bottom: solid 1px #d9d9d9;
  border-left: none;
  border-top: none;
  border-right: none;
  line-height: 18px;
  vertical-align: text-bottom;
  box-sizing: border-box;
}
.addicon {
  width: 100%;
  color: #999999;
  margin-top: 10px;
}
.addicon > span {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #333333;
  text-align: center;
  line-height: 24px;
  color: #ffffff;
  display: inline-block;
  vertical-align: middle;
}
.table-content {
  display: flex;
  justify-content: space-between;
}
</style>

