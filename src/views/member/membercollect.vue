<!-- Table -->
<template>
<el-dialog title="商品收藏查询" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
<el-row>
<tool-list    
   :columndata= "columndatas" 
   :bindata= "listdata" 
   ref="childrenlist" > 
</tool-list>
</el-row>
</el-dialog>
  
</template>
<script>
import toolsdatepicker from "@/components/toolsdatepicker";
import API from "@/api/member";
import list from "@/components/list";
export default {
  props: ["showstu", "memberid"],
  components: {
    "tool-list": list,
    "tool-datepicker": toolsdatepicker
  },
  data() {
    return {
      id: this.memberid,
      ishow: this.showstu,
      formInline: {},
      columndatas: [
        {
          width: 120,
          label: "条码",
          prop: "barCode"
        },
        {
          width: 160,
          label: "名称",
          prop: "goodsName",
          type: "title"
        },
        {
          width: 120,
          label: "编号",
          prop: "goodsCode"
        },
        {
          width: 120,
          label: "规格",
          prop: "packingSpecification"
        },
        {
          label: "收藏时间",
          prop: "createTime",
          type: "ymd"
        }
      ],
      listdata: null
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
    openinit: function() {
      this.listdata=null;
      this.search();
    },
    closedialog: function() {
      this.$emit("closedialog");
    },
    search() {
      var that = this;
      var p = { memberId: that.id };
      API.getmembercollectbyid(p).then(function(res) {
        if (res.meta.success)  {
          that.listdata=res.data;
        }
      });
    }
  }
};
</script>