<template>
	<div>
		<div ref="head">
			<div class="topBtn">
				<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
			</div>
			<el-row class="topsercah">
				<el-form :inline="true" class="el-form-class" :model="formInline">
					<el-col>
						<el-form-item label="日期">
							<tool-datepicker ref="picker"> </tool-datepicker>
						</el-form-item>
						<el-form-item label="分组">
							<select-list ref="groupid" :pcode="formInline.selectdata.pcode" :code="formInline.selectdata.code" :type="formInline.selectdata.type">
							</select-list>
						</el-form-item>
						<el-form-item label="客户名称">
							<el-input v-model="formInline.name" placeholder="客户名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="手机号码">
							<el-input v-model="formInline.mobile" placeholder="手机号码"></el-input>
						</el-form-item>
						<el-form-item label="登录状态">
							<select-list ref="loginstu" pcode="loginstatus" code="-1" type="1">
							</select-list>
						</el-form-item>
						<!-- <el-form-item label="标签">
     <el-input v-model="formInline.coustromtag" placeholder="标签"></el-input>
    </el-form-item> -->
						<el-button type="primary" size="small" @click="init">查询</el-button>
					</el-col>
				</el-form>
			</el-row>
		</div>
		<el-row>
			<div class="bootomclas">
				<list-member :columndata="columndatas"
				 :bindata="listdata"
				 ref="childrenlist" 
				 @rowdblclick="rowdblclick" 
				 :headHeight="headHeight"
			 	 @menuclick="recetiveclick"
				  :menudata="menulists" 
				 >
				</list-member>
			</div>
		</el-row>
		<el-row>
			<div class="block">
				<page-tools :total="total" ref="pagetool" @setPage="setPage"> </page-tools>
			</div>
		</el-row>
		<member-edit @updatestu="updatestu"></member-edit>
		<member-log :showstu="showstu" :memberid="memberid" @closedialog="closedialog"> </member-log>
		<member-collect :showstu="collectstu" :memberid="memberid" @closedialog="closecollect"> </member-collect>
	</div>
</template>
<script>
import list from "@/components/list";
import selectlist from "@/components/toolselect";
import toolspage from "@/components/toolspage";
import { mapGetters, mapActions } from "vuex";
import toolsdatepicker from "@/components/toolsdatepicker";
import API from "@/api/member";
import memberedit from "./memberedit";
import memberlog from "./memberlog";
import membercollect from "./membercollect";
import toolsbtncustom from "@/components/toolsbtncustom";

export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-member": list,
    "page-tools": toolspage,
    "select-list": selectlist,
    "tool-datepicker": toolsdatepicker,
    "member-edit": memberedit,
    "member-log": memberlog,
    "member-collect": membercollect
  },
  data() {
    return {
      formInline: {
        name: "",
        mobile: "",
        coustromtag: "",
        selectdata: {
          pcode: "",
          code: "",
          type: "2"
        }
      },
      columndatas: [
        {
          prop: "id",
          type: "selection"
        },
        {
          width: 80,
          label: "头像",
          prop: "headImgUrl",
          type: "img",
          imgheight: "40px"
        },
        {
          width: 130,
          label: "账号",
          prop: "phone"
        },
        {
          width: 230,
          label: "公司名称",
          prop: "company"
        },
        {
          width: 200,
          label: "客户名称",
          prop: "name"
        },
        {
          label: "联系人",
          prop: "contact"
        },
        {
          label: "职称",
          prop: "job"
        },
        {
          width: 130,
          label: "售价方式",
          prop: "priceModeName"
        },
        {
          width: 130,
          label: "所属分组",
          prop: "groupName"
        },
        {
          width: 130,
          label: "跟踪售价",
          prop: "manyTrackPrice"
        },
        {
          width: 130,
          label: "最近登录时间",
          prop: "lastLoginTime",
          type: "ymd"
        },
        {
          width: 130,
          label: "备注",
          prop: "summary"
        },
        {
          label: "状态",
          prop: "manyStatus"
        },
        {
          label: "审核日期",
          width: 200,
          prop: "createTime",
          type: "ymd"
        },
        {
          label: "修改时间",
          width: 200,
          prop: "modifyTime",
          type: "ymd"
        }
      ],
      listdata: null,
      total: 0,
      showstu: false,
      memberid: 0,
      headHeight: 0,
      collectstu: false,
      menulists: [
        {
          fnHandler: "rigthmemberaudit",
          icoName: "el-icon-circle-check",
          btnName: "允许登录"
        },
        {
          fnHandler: "rightrefuseapply",
          icoName: "el-icon-circle-check",
          btnName: "拒绝登录"
        },
        {
          fnHandler: "rightgetloginlog",
          icoName: "el-icon-circle-check",
          btnName: "查看登录日志"
        },
        {
          fnHandler: "reightgetcollect",
          icoName: "el-icon-circle-check",
          btnName: "查看收藏商品"
        }
      ],
      custombtn: [
        {
          name: "允许登录",
          icoName: "done s-green",
          fnHandler: "$parent.memberaudit()"
        },
        {
          name: "拒绝登录",
          icoName: "cancel s-green",
          fnHandler: "$parent.refuseapply()"
        },
        {
          name: "修改信息",
          icoName: "edit s-green",
          fnHandler: "$parent.updateinfo()"
        },
        {
          name: "登录日志",
          icoName: "shuJuCaiJi s-green",
          fnHandler: "$parent.getloginlog()"
        },
        {
          name: "商品收藏",
          icoName: "qiChuLuRu s-green",
          fnHandler: "$parent.getcollect()"
        },
        {
          name: "会员分组",
          icoName: "jiecun s-green",
          fnHandler: "$parent.membergroup()"
        }
      ],
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
        khName: that.formInline.name,
        phone: that.formInline.mobile,
        status: that.$refs.loginstu.values,
        dateStart: that.$refs.picker.starttime,
        dateEnd: that.$refs.picker.endtime,
        memberGroupId: that.$refs.groupid.values
      };
      API.getmemberinfolist(p).then(function(res) {
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data.list;
          that.total = res.data.total;
        }
      });
    },
    init() {
      this.pageNum = 1;
      this.search();
    },
    //右键按钮回调事件
    recetiveclick(btname, row) {
      eval("this." + btname + "(" + row.id + ")");
    },
    //选择框批量允许登录
    getselectlist() {
      var that = this;
      var list = that.$refs.childrenlist.multipleSelection;
      if (list.length <= 0) {
        that.$message.warning("请至少选择一条记录");
        return;
      }
      var ids = "";
      for (let i = 0; i < list.length; i++) {
        ids = ids + list[i].id + ",";
      }
      ids = ids.substring(0, ids.lastIndexOf(","));
      return ids;
    },
    memberaudit() {
      var ids = this.getselectlist();
      this.allowlogin(ids);
    },
    //右键执行函数
    rigthmemberaudit(id) {
      this.allowlogin(id);
    },
    //允许登录封装函数
    allowlogin(id) {
      var that = this;
      var p = {
        ids: id,
        status: 0
      };
      API.setmemberinfostu(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("允许登录设置成功");
          that.search();
        } else {
          that.$message.error("允许登录设置失败,请重试");
        }
      });
    },
    refuseapply() {
      var ids = this.getselectlist();
      this.refuselogin(ids);
    },
    rightrefuseapply(id) {
      this.refuselogin(id);
    },
    //拒绝用户登录
    refuselogin(id) {
      var that = this;
      var p = {
        ids: id,
        status: 1
      };
      API.setmemberinfostu(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("拒绝登录设置成功");
          that.search();
        } else {
          that.$message.error("拒绝登录设置失败,请重试");
        }
      });
    },
    //更新用户信息
    updateinfo() {
      var that = this;
      var ids = that.$refs.childrenlist.multipleSelection;
      if (ids.length == 0) {
        that.$message.warning("请一条会员记录进行修改");
        return;
      }
      if (ids.length > 1) {
        that.$message.warning("当前一次只能修改一条会员信息");
        return;
      }
      that.setid(ids[0].id);
      that.setdialogshow();
    },
    //分页事件
    setPage(val) {
      this.pageNum = val.pageNum;
      this.search();
    },
    //记录双击事件
    rowdblclick(val) {
      var that = this;
      if (!val) {
        that.$message.warning("请选择记录后再操作");
        return;
      }
      that.setid(val.id);
      that.setdialogshow();
    },
    //修改回调事件
    updatestu() {
      this.search();
    },
    //获取登录日志
    getloginlog() {
      var that = this;
      var ids = that.$refs.childrenlist.multipleSelection;
      if (ids.length == 0) {
        that.$message.warning("请一条会员记录进行查看");
        return;
      }
      if (ids.length > 1) {
        that.$message.warning("当前一次只能查看一条会员信息");
        return;
      }
      this.getloginlogbyid(ids[0].id);
    },
    rightgetloginlog(id) {
      this.getloginlogbyid(id);
    },
    getloginlogbyid(id) {
      this.memberid = id;
      this.showstu = true;
    },
    //获取收藏商品
    getcollect() {
      var that = this;
      var ids = that.$refs.childrenlist.multipleSelection;
      if (ids.length == 0) {
        that.$message.warning("请一条会员记录进行查看");
        return;
      }
      if (ids.length > 1) {
        that.$message.warning("当前一次只能查看一条会员信息");
        return;
      }
      this.reightgetcollect(ids[0].id);
    },
    reightgetcollect(id) {
      this.memberid = id;
      this.collectstu = true;
    },
    //登录日志关闭事件
    closedialog() {
      this.showstu = false;
    },
    //收藏商品关闭事件
    closecollect() {
      this.collectstu = false;
    },
    membergroup() {
      this.$router.push("/member/groupmember");
    }
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight;
    this.init();
  }
};
</script>
