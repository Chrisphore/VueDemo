<!-- Table -->
<template>
<el-dialog title="登录日志查询" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
<el-row>
          <el-form :inline="true" class="el-form-class" :model="formInline">
            <el-form-item label="日期">
             <tool-datepicker ref="picker"> </tool-datepicker>
            </el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form>
</el-row>
<el-row>
<tool-list    
   :columndata= "columndatas" 
   :bindata= "listdata" 
   ref="childrenlist" > 
</tool-list>
</el-row>
</el-row>
		<el-row>  
   <div class="block">
    <page-tools :total="total"  ref="pagetool" 
    @setPage="setPage"  > 
    </page-tools>
  </div>
		</el-row>
</el-dialog>
</template>
<script>
import toolsdatepicker from "@/components/toolsdatepicker";
import API from "@/api/member";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
export default {
  props: ["showstu", "memberid"],
  components: {
    "tool-list": list,
    "tool-datepicker": toolsdatepicker,
    "page-tools": toolspage
  },
  data() {
    return {
      id: this.memberid,
      ishow: this.showstu,
      formInline: {},
      columndatas: [
        {
          width: 160,
          label: "登录时间",
          prop: "visitorDate",
          type: "ymd"
        },
        {
          width: 120,
          label: "登录ip",
          prop: "ip"
        },
        {
          width: 120,
          label: "登录设备",
          prop: "device"
        },
        {
          label: "备注",
          prop: "summary"
        }
      ],
      listdata: null,
      total: 0
    };
  },
  watch: {
    memberid: function(newVal) {
      this.id = newVal;
    },
    showstu: function(newVal) {
      this.ishow = newVal;
    }
  },
  methods: {
    //窗体初始化加载事件
    openinit() {
      this.listdata=null;
    },
    closedialog() {
      this.$emit("closedialog");
    },
    search() {
      var that = this;
      var p = {
        pageNum: that.$refs.pagetool.page_currentpage,
        pageSize: that.$refs.pagetool.page_size,
        khid: that.id,
        dateStart: that.$refs.picker.starttime,
        dateEnd: that.$refs.picker.endtime
      };
      API.getmemberlogbyid(p).then(function(res) {
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data.list;
          that.total = res.data.total;
        }
      });
    },
    setPage() {
      this.search();
    }
  }
};
</script>