<template>
  <div>
    <div ref="head">
      <div class="topBtn">
        <btn-custom :btnType="2" :custombtn="custombtn" :customrightbtn="custombtnright"></btn-custom>
      </div>
      <el-row>
        <div class="topsercah" style="margin: 5px;width: 99%;">
          <el-form :inline="true" class="el-form-class" :model="formData">
            <el-form-item label="活动名称">
              <el-input v-model="formData.keywords" placeholder="活动名称"></el-input>
            </el-form-item>
            <el-button type="info" plain class="queryBtn" @click="init">查询</el-button>
          </el-form>
        </div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="bootomclas" style="margin:5px;width: 99%;">
          <list-data ref="childrenlist" :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick" :headHeight="headHeight" @menuclick="recetiveclick" :menudata="menulists"></list-data>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="block">
          <tools-page :total="total" ref="pagetool" @setPage="setPage"></tools-page>
        </div>
      </el-col>
    </el-row>
    <seckill-qrcode></seckill-qrcode>
  </div>
</template>

<script>
import toolsbtncustom from "@/components/toolsbtncustom";
import toolspage from "@/components/toolspage";
import list from "@/components/list";
import API from "@/api/seckill";
import seckillqrcode from "./seckillqrcode";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-data": list,
    "tools-page": toolspage,
    "seckill-qrcode": seckillqrcode
  },
  data() {
    return {
      columndatas: [
        {
          prop: "id",
          type: "selection"
        },
        {
          width: 120,
          label: "图片",
          prop: "img",
          align: "center",
          imgheight: "60px",
          type: "img"
        },
        {
          width: 260,
          label: "活动名称",
          prop: "title",
          align: "center"
        },
        {
          width: 260,
          label: "秒杀商品",
          prop: "goodsName",
          align: "center"
        },
        {
          width: 100,
          label: "秒杀价",
          prop: "seckillPrice",
          align: "center"
        },
        {
          width: 220,
          label: "开始时间",
          prop: "staraTime",
          align: "center",
          type: "ymd"
        },
        {
          width: 220,
          label: "结束时间",
          prop: "endTime",
          align: "center",
          type: "ymd"
        },
        {
          width: 160,
          label: "状态",
          prop: "statusName",
          align: "center"
        },
        {
          label: "创建时间",
          prop: "createTime",
          align: "center",
          type: "ymd"
        }
      ],
      listdata: null,
      total: 0,
      pageNum: 1,
      headHeight: 0,
      custombtn: [
        {
          name: "新增",
          icoName: "add s-green",
          fnHandler: "$parent.addseckill()"
        },
        {
          name: "编辑",
          icoName: "edit s-green",
          fnHandler: "$parent.editseckill()"
        },
        {
          name: "删除",
          icoName: "delete s-green",
          fnHandler: "$parent.clickdeleteseckill()"
        }
      ],
      custombtnright: [
        {
          name: "二维码",
          fnHandler: "$parent.clickgetseckillimg()"
        },

        {
          name: "查看详情",
          fnHandler: "$parent.clickseckilldetail()"
        },
        {
          name: "结束",
          fnHandler: "$parent.clickupdateseckill(2)"
        },
        {
          name: "开始",
          fnHandler: "$parent.clickupdateseckill(1)"
        }
      ],
      formData: {
        keywords: ""
      },
      menulists: [
        {
          fnHandler: "rightseckilldetail",
          icoName: "el-icon-circle-check",
          btnName: "查看详情"
        },
        {
          fnHandler: "rightstartseckill",
          icoName: "el-icon-circle-check",
          btnName: "开始活动"
        },
        {
          fnHandler: "rightendseckill",
          icoName: "el-icon-circle-check",
          btnName: "结束活动"
        },
        {
          fnHandler: "rightgetseckillimg",
          icoName: "el-icon-circle-check",
          btnName: "获取二维码"
        },
        {
          fnHandler: "rightdeleteseckill",
          icoName: "el-icon-circle-check",
          btnName: "删除活动"
        }
      ]
    };
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight + 10;
    this.serarch();
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    setPage(val) {
      this.pageNum=val.pageNum;
      this.serarch();
    },
    serarch() {
      var that = this;
      var p = {
        pageNum: that.pageNum,
        pageSize: that.$refs.pagetool.page_size,
        keyword: that.formData.keywords
      };
      API.getseckilllist(p).then(function(res) {
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data.list;
          that.total = res.data.total;
        }
      });
    },
    init() {
      this.pageNum=1;
      this.serarch();
    },
    addseckill() {
      this.$router.push({
        path: "/seckill/edit",
        query: { id: 0 }
      });
    },
    editseckill() {
      var that = this;
      var ids = that.$refs.childrenlist.multipleSelection;
      if (ids.length == 0) {
        that.$message.warning("请选择一条记录进行编辑");
        return;
      }
      if (ids.length > 1) {
        that.$message.warning("当前一次只能编辑一条记录");
        return;
      }
      that.$router.push({
        path: "/seckill/edit",
        query: { id: ids[0].id }
      });
    },
    rowdblclick(val) {
      this.$router.push({
        path: "/seckill/edit",
        query: { id: val.id }
      });
    },
    seckilldetail(id) {
      this.$router.push({
        path: "/seckill/seckilldetail",
        query: { id: id }
      });
    },
    rightseckilldetail(id) {
      this.seckilldetail(id);
    },
    clickseckilldetail() {
      var ids = this.getcheckids(false);

      if (ids != undefined) {
        this.seckilldetail(ids);
      }
    },
    //删除秒杀活动
    deleteseckill(ids) {
      var that = this;
      var p = { ids: ids };
      API.deleteseckill(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("删除成功");
          that.serarch();
        } else {
          that.$message.error("删除失败,未开始的活动才允许删除");
        }
      });
    },
    //右键删除
    rightdeleteseckill(id) {
      this.deleteseckill(id);
    },
    //选择删除秒杀活动
    clickdeleteseckill() {
      var ids = this.getcheckids(true);
      if (ids != undefined) {
        console.log(ids);
        this.deleteseckill(ids);
      }
    },
    showseckill(id, stu) {
      var that = this;
      var p = { ids: id, status: stu };
      API.updateseckillstatus(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("更改成功");
          that.serarch();
        } else {
          that.$message.error("更改失败");
        }
      });
    },
    //右键 开始秒杀
    rightstartseckill(id) {
      this.showseckill(id, 1);
    },
    //右键 结束秒杀
    rightendseckill(id) {
      this.showseckill(id, 2);
    },
    //选择更改秒杀活动状态
    clickupdateseckill(stu) {
      var ids = this.getcheckids(true);
      if (ids != undefined) {
        this.showseckill(ids, stu);
      }
    },
    //获取秒杀二维码
    getseckillimg(id) {
      var that = this;
      var q = { id: id };
      API.getseckillimg(q).then(function(res) {
        if (res.meta.success) {
          that.setparms({ qrcodestu: true, qrcodeimgurl: res.data });
        }
      });
    },
    //右键获取秒杀二维码
    rightgetseckillimg(id) {
      this.getseckillimg(id, true);
    },
    //选择获取秒杀二维码
    clickgetseckillimg() {
      var ids = this.getcheckids(false);
      if (ids != undefined) {
        this.getseckillimg(ids);
      }
    },
    //获取选择id
    getcheckids(ismultiple) {
      var ids = "";
      var that = this;
      var list = that.$refs.childrenlist.multipleSelection;
      if (ismultiple) {
        if (list.length == 0) {
          that.$message.warning("请至少选择一条记录进行操作");
          return;
        }
        for (let i = 0; i < list.length; i++) {
          ids = ids + list[i].id + ",";
        }
        ids = ids.substring(0, ids.lastIndexOf(","));
      } else {
        if (list.length == 0) {
          that.$message.warning("请选择一条记录进行查看");
          return;
        }
        if (list.length > 1) {
          that.$message.warning("当前一次只能操作一条记录");
          return;
        }
        ids = list[0].id;
      }
      return ids;
    },
    //右键按钮回调事件
    recetiveclick(btname, row) {
      eval("this." + btname + "(" + row.id + ")");
    }
  }
};
</script>

<style>
</style>
