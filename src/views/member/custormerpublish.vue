<template>
<div>
	<div ref="head">
			<div class="topBtn">
				<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
			</div>

  <el-row class="topsercah">
    <el-form :inline="true" class="el-form-class" :model="formInline">
     <el-form-item label="客户编号">
     <el-input v-model="formInline.code" placeholder="客户编号"></el-input>
     </el-form-item>
    <el-form-item label="客户名称">
     <el-input v-model="formInline.name" placeholder="客户名称"></el-input>
    </el-form-item>
     <el-form-item label="手机号码">
     <el-input v-model="formInline.mobile" placeholder="手机号码"></el-input>
    </el-form-item>
        <el-form-item label="发布状态">
       <select-list ref="releasestu"
       pcode="coustormreleasestatus" 
       :code="formInline.releasestate"
       type="1"
        >
    </select-list>
    </el-form-item>
     <el-button type="primary" size="small" @click="init">查询</el-button>
    </el-form>
 			</el-row>
  </div>
<el-row>
 <div class="bootomclas">
   <list-member 
   :columndata= "columndatas" 
   :bindata= "listdata" 
   ref="childrenlist" 
   :headHeight="headHeight"
   @rowdblclick="rowdblclick"
   >
   </list-member>
 </div>
</el-row>
<el-row>
<div class="block">
<page-tools :total="total"  ref="pagetool" @setPage="setPage"  > </page-tools>
  </div>
</el-row>
<custormer-edit @updatestu="updatestu"></custormer-edit>
</div>
</template>
<script>
import toolsbtncustom from '@/components/toolsbtncustom'
import list from "@/components/list";
import selectlist from "@/components/toolselect";
import toolspage from "@/components/toolspage";
import { mapGetters, mapActions } from "vuex";
import toolsdatepicker from "@/components/toolsdatepicker";
import API from "@/api/member";
import custormeredit from "./custormeredit";
export default {
  components: {
    'btn-custom': toolsbtncustom,
    "list-member": list,
    "page-tools": toolspage,
    "select-list": selectlist,
    "tool-datepicker": toolsdatepicker,
    "custormer-edit": custormeredit
  },
  data() {
    return {
      formInline: {
        code: "",
        name: "",
        mobile: "",
        releasestate: "-1"
      },
      columndatas: [
        {
          prop: "id",
          type: "selection"
        },
        {
          width: 120,
          label: "编号",
          prop: "code"
        },
        {
          label: "客户名称",
          prop: "name"
        },
        {
          label: "手机",
          prop: "mobilePhone"
        },
        {
          label: "电话",
          prop: "telephone"
        },
        // {
        //   label: "备注",
        //   prop: "remark"
        // },
        {
          width: 120,
          label: "售价方式",
          prop: "priceModeName"
        },
        {
          label: "跟踪售价",
          width: 120,
          prop: "trackPrice",
          type: "switch"
        },
        {
          label: "发布状态",
          prop: "publishStatus"
        }
      ],
			custombtn:[
				{ name: '用户发布',"icoName":"done s-green",fnHandler: '$parent.release()'}
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
        code: that.formInline.code,
        name: that.formInline.name,
        mobilePhone: that.formInline.mobile,
        publishStatus: that.$refs.releasestu.values
      };
      API.getcoustormlist(p).then(function(res) {
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
    setPage(val) {
      this.pageNum=val.pageNum;
      this.search();
    },
    release() {
      var that = this;
      var ids = that.$refs.childrenlist.multipleSelection;
      if (ids.length == 0) {
        that.$message.warning("请一个客户进行发布");
        return;
      }
      if (ids.length > 1) {
        that.$message.warning("当前一次只能发布一个客户");
        return;
      }
      that.setid(ids[0].id);
      that.setdialogshow();
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
    updatestu() {
      this.search();
    }
  },
  mounted() {
		this.headHeight = this.$refs.head.offsetHeight;
    this.init();
  }
};
</script>
