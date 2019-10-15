<template>
  <div>
    <div ref="head">
      <div class="topBtn">
        <btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
      </div>
      <el-row class="topsercah">
        <el-form :inline="true" class="el-form-class" :model="formInline">
          <el-form-item label="日期">
            <tool-datepicker ref="picker"> </tool-datepicker>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="formInline.name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formInline.mobile" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="审核状态">
            <select-list ref="auditstu" :pcode="formInline.selectdata.pcode" :code="formInline.selectdata.code" :type="formInline.selectdata.type">
            </select-list>
          </el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-form>

        <member-edit @updatestu="updatestu">

        </member-edit>
      </el-row>
    </div>
    <el-row>
      <div class="bootomclas">
        <list-member :columndata="columndatas" :bindata="listdata" ref="childrenlist" @rowdblclick="rowdblclick" :headHeight="headHeight">
        </list-member>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <page-tools :total="total" ref="pagetool" @setPage="setPage">
        </page-tools>
      </div>
    </el-row>

  </div>
</template>
<script>
import toolsbtncustom from "@/components/toolsbtncustom";
import list from "@/components/list";
import selectlist from "@/components/toolselect";
import toolspage from "@/components/toolspage";
import auditedit from "./auditedit";
import toolsdatepicker from "@/components/toolsdatepicker";
import API from "@/api/member";
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";
export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-member": list,
    "select-list": selectlist,
    "page-tools": toolspage,
    "member-edit": auditedit,
    "tool-datepicker": toolsdatepicker
  },
  data() {
    return {
      formInline: {
        name: "",
        mobile: "",
        coustromtag: "",
        selectdata: {
          pcode: "applystatus",
          code: "-1",
          type: "1"
        }
      },
      columndatas: [
        {
          width: 55,
          type: "selection",
          prop: "id"
        },
        {
          width: 120,
          label: "注册类型",
          prop: "regType"
        },
        {
          label: "注册日期",
          prop: "createTime",
          type: "ymd"
        },
        {
          label: "公司名称",
          prop: "company"
        },
        {
          label: "联系人",
          prop: "contact"
        },
        {
          label: "手机号码",
          prop: "phone"
        },
        {
          label: "审核状态",
          prop: "statusName"
        }
      ],
      custombtn: [
        {
          name: "审核",
          icoName: "done s-green",
          fnHandler: "$parent.memberaudit()"
        },
        {
          name: "拒绝申请",
          icoName: "cancel s-green",
          fnHandler: "$parent.refuseapply()"
        }
      ],
      listdata: null,
      total: 0,
      headHeight: 0,
      pageNum: 1
    };
  },
  methods: {
    ...mapActions({
      setdialogshow: "setdialogshow",
      setid: "setid"
    }),
    search() {
      var that = this;
      var p = {
        pageNum: that.pageNum,
        pageSize: that.$refs.pagetool.page_size,
        keyword: that.formInline.name,
        phone: that.formInline.mobile,
        status: that.$refs.auditstu.values,
        dateStart: that.$refs.picker.starttime,
        dateEnd: that.$refs.picker.endtime
      };
      API.getmemberapply(p).then(function(res) {
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data.list;
          that.total = res.data.total;
        }
      });
    },
    init() {
      this.pageNum=1;
      this.search();
    },
    rowdblclick(val) {
      var that = this;
      if (val.status == "1") {
        that.$message.warning("当前用户已经审核完成");
        return;
      }
      that.setid(val.id);
      that.setdialogshow();
    },
    //审核登陆
    memberaudit() {
      var that = this;
      var ids = that.$refs.childrenlist.multipleSelection;
      if (ids.length == 0) {
        that.$message.warning("请一条申请记录进行审核");
        return;
      }
      if (ids.length > 1) {
        that.$message.warning("当前一次只能审核一条会员申请");
        return;
      }
      if (ids[0].status == "1") {
        that.$message.warning("当前用户已经审核完成");
        return;
      }
      that.setid(ids[0].id);
      that.setdialogshow();
    },
    //拒绝用户登录
    refuseapply() {
      var that = this;
      var list = that.$refs.childrenlist.multipleSelection;
      if (list.length <= 0) {
        that.$message.warning("请至少选择一条编辑记录");
        return;
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].status != "0") {
          that.$message.error("拒绝失败，有会员已审核或已拒绝，如需修改，请在会员管理操作");
          return;
        }
      }
      var ids = "";
      for (let i = 0; i < list.length; i++) {
        ids = ids + list[i].id + ",";
      }
      ids = ids.substring(0, ids.lastIndexOf(","));
      var p = { ids: ids };
      API.refusememberapply(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("拒绝成功");
          that.search();
        } else {
          that.$message.error("拒绝会员申请失败");
        }
      });
    },
    setPage(val) {
      this.pageNum=val.pageNum;
      this.search();
    },
    updatestu() {
      this.search();
    }
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight;
    this.search();
  }
};
</script>

