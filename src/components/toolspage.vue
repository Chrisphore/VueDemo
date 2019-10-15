<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page_currentpage"
      :page-sizes="page_sizes"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_total">
    </el-pagination>
</template>

<script>
export default {
  props: {
    pagesizes: {
      type: Array,
      default: function() {
        return [20, 50, 100, 200];
      }
    },
    pagesize: {
      type: Number,
      default: function() {
        return 20;
      }
    },
    total: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    currentpage: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {
      page_sizes: this.pagesizes,
      page_size: this.pagesize,
      page_total: this.total,
      page_currentpage: this.currentpage
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page_size = val;
      this.$emit("setPage", {
        pageSize: this.page_size,
        pageNum: 1
      });
    },
    handleCurrentChange(val) {
      this.page_currentpage = val;
      this.$emit("setPage", {
        pageSize: this.page_size,
        pageNum: this.page_currentpage
      });
    }
  },
  watch: {
    total: function(newVal) {
      this.page_total = newVal; //newVal即是chartData
			
    },
		currentpage: function(newVal) {
      this.page_currentpage = newVal; //newVal即是chartData
    },
  },
  created() {
      if(this.page_sizes.length>0) {
         this.page_size=this.page_sizes[0]
      }
  }
};
</script>

