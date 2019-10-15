<template>
  <div>
    <div ref="head">
      <el-row>
        <div class="topBtn">
          <btn-tools @del_click="del_click"></btn-tools>
        </div>
      </el-row>

      <el-row>
        <div class="topsercah">
          <el-form :inline="true" class="el-form-class" :model="listQuery">
            <el-form-item label="广告名称">
              <el-input v-model="listQuery.keyword" placeholder="广告名称"></el-input>
            </el-form-item>
            <el-form-item label="广告类型" v-show="selectstu">
              <select-list ref="advertisingtype" pcode="advertisingtype" :code="listQuery.imgType" type="1">
              </select-list>
            </el-form-item>
            <el-button type="info" v-on:click="search" plain class="queryBtn">查询</el-button>
          </el-form>
        </div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="bootomclas">
          <list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick" :headHeight="headHeight"></list-data>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="block">
          <tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
        </div>
      </el-col>
    </el-row>
    <advertising-edit></advertising-edit>
  </div>
</template>
<script>
import basic from "@/api/basic";
import toolsbtn from "@/components/toolsbtn";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
import { mapState, mapActions } from "vuex";
import advertisingedit from "./advertisingedit";
import selectlist from "@/components/toolselect";

export default {
  components: {
    "btn-tools": toolsbtn,
    "list-data": list,
    "select-list": selectlist,
    "tools-page": toolspage,
    "advertising-edit": advertisingedit
  },
  data() {
    return {
      columndatas: [
        {
          label: "主键",
          prop: "id",
          type: "selection",
          align: "center"
        },

        {
          label: "广告类型",
          prop: "imgTypeName"
        },
        {
          label: "广告标题",
          prop: "name"
        },
        {
          label: "跳转关键字",
          prop: "keywords"
        },
        {
          label: "排序",
          prop: "sort"
        },
        {
          label: "图片地址",
          prop: "imgUrl",
          width: "400",
          type: "img"
        },
        {
          label: "创建时间",
          prop: "createTime",
          type: "ymd"
        }
      ],
      listdata: null,
      total: 1,
      listLoading: true,
      listQuery: {
        keyword: "",
        pageSize: 20,
        pageNum: 1,
        imgType: ""
      },
      headHeight: 0,
      params: {},
      selectstu: true
    };
  },
  mounted() {
    if (this.$route.query.imgtype) {
      this.selectstu = false;
      this.listQuery.imgType = this.$route.query.imgtype;
      this.params.imgtype = this.$route.query.imgtype;
      this.params.status = false;
    } else {
      this.params.status = true;
      this.selectstu = true;
    }
    this.setparms(this.params);
    this.init();
    this.headHeight = this.$refs.head.offsetHeight;
  },
  methods: {
    ...mapActions({
      setdialogshow: "setdialogshow",
      setid: "setid",
      setparms: "setparams"
    }),
    init() {
      if (this.$route.query.imgtype) {
        this.listQuery.imgType = this.$route.query.imgtype;
      } else {
        this.listQuery.imgType = this.$refs.advertisingtype.values;
      }
      basic.advertising("PAGE", this.listQuery).then(res => {
        this.total = res.data.total;
        this.listdata = res.data.list;
      });
    },
    search() {
      this.listQuery.pageNum = 1;
      this.init();
    },
    setPage(msg) {
      this.listQuery.pageSize = msg.pageSize;
      this.listQuery.pageNum = msg.pageNum;
      this.init();
    },
    rowdblclick(val) {
      this.setid(val.id);
      this.setdialogshow();
    },
    del_click(ids) {
      let listids = { ids: ids };
      basic.advertising("DELETE", listids).then(res => {
        console.log(JSON.stringify(res.data));
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.init();
      });
    }
  }
};
</script>
