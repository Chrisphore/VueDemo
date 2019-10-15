<template>
    <el-table
    ref="multipleTable"
    :data="listdata"
    tooltip-effect="dark"
    border
    stripe
		highlight-current-row
    @selection-change="handleSelectionChange" 
		@row-dblclick="rowdblclick"
		@row-click="rowclick"
		class="el-table-class">
    <template 
    v-for="item in columndatas" 
    v-if="item.formatter=='dateFormat'">
    <el-table-column 
		header-align=center
    :key="item.prop"
		:align="item.align"
    :type="item.type"
    :width="item.width" 
    :label="item.label"
    :prop="item.prop"
    :formatter="dateFormat"
     sortable >
    </el-table-column>
    </template>
    <template v-else>
    <el-table-column 
		header-align=center
    :key="item.prop"
		:align="item.align"
    :type="item.type"
    :width="item.width" 
    :label="item.label"
    :prop="item.prop"
     sortable >
    </el-table-column>
    </template>

  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["columndata", "bindata"],
  data() {
    return {
      listdata: this.bindata,
      columndatas: this.columndata,
      multipleSelection: [],
      checkObj: null
    };
  },
  watch: {
    bindata: function(newVal) {
      this.listdata = newVal; //newVal即是chartData
    }
  },
  methods: {
    ...mapActions({
      setMultipleSelection: "setMultipleSelection"
    }),
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      this.setMultipleSelection(val);
    },
    rowdblclick: function(val) {
      this.checkObj = val;
      this.$emit("rowdblclick", val);
    },
    rowclick: function(val) {
      this.checkObj = val;
      this.$emit("rowclick", val);
    },
    dateFormat: function(row, column) {
      var date = new Date(row[column.property]);
      return this.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>



