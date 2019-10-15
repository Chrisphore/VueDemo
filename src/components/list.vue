<template>
    <div>
        <el-table
					  :data="rows"
            border
            highlight-current-row
            tooltip-effect="dark"
            @selection-change="handleSelectionChange" 
	        	@row-dblclick="rowdblclick"
		        @row-click="rowclick"
						@select="selectclick"
						@select-all="selectAllClick"
						:height="myHeight"
            @row-contextmenu="rowcontextmenu"
            class="el-table-class"
						:row-class-name="tableRowClassName"
             :show-summary="issum"
             :summary-method="getSummaries"
						ref="listTalbe">
            <template v-for="(column,key,index) in columndata">
                <GridColumn :column="column" :key="key" :pk="index" ></GridColumn>
            </template>
        </el-table>
        <el-dialog  title="图片预览" :visible="imgshow" center  @close="closedialog" width="30%">
					<img :src="imgurl" style="width:300px" alt="">
        </el-dialog>
        <tool-contentmenu :contextMenuData="contextMenuData" @menuclick="menuclick"></tool-contentmenu>
    </div>
</template>

<script>
import GridColumn from "@/common/Grid.column.js";
import toolscontentmenu from "@/components/toolscontentmenu";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    bindata: null,
    columndata: Array,
    headHeight: null,
    menudata: Array,
    isMultipleSelection: {
      type: Boolean,
      default: true
    },
    issum: {
      type: Boolean,
      default: false
    }
  },
  components: {
    GridColumn,
    "tool-contentmenu": toolscontentmenu
  },
  created() {
    const that = this;
    var host = window.location.host;
    that.menutype = localStorage.getItem(host + "X-router");
    if (that.menutype == 0) {
      that.topHeight = 50;
    }
    if (that.bindata) {
      that.rows = that.bindata;
    }
  },
  data() {
    return {
      rows: [],
      multipleSelection: [],
      checkObj: null,
      dialogVisible: false,
      dialogImageUrl: "",
      topHeight: 1,
      myHeight: this.headHeight == null ? "400px" : this.headHeight,
      transferIndex: null, // Show the menu that was clicked
      contextMenuData: {
        menuName: "demo",
        axios: {
          x: null,
          y: null
        },
        menulists: this.menudata
      },
      rowdata: null
    };
  },
  mounted() {
    const that = this;
    window.onresize = function temp() {
      that.myHeight =
        window.innerHeight - 45 - that.headHeight - that.topHeight + "px";
    };
  },
  updated() {
    const that = this;
    // console.log( window.innerHeight -45- that.headHeight-that.topHeight);
    that.myHeight =
      window.innerHeight - 45 - that.headHeight - that.topHeight + "px";
  },
  computed: {
    ...mapState({
      imgshow: state => state.toolslist.showstate,
      imgurl: state => state.toolslist.imgurl
    })
  },
  watch: {
    //watch props 变化
    bindata: function(value) {
      this.rows = value;
    },
    headHeight: function(value) {
      this.myHeight = value;
    }
  },
  methods: {
    ...mapActions({
      setMultipleSelection: "setMultipleSelection"
    }),
    tableRowClassName({ row, rowIndex }) {
      let styleName = "";
      if (row.delflag == 0) {
        styleName = "delflag-row";
      }
      if (row.isWarning != null && row.isWarning == 1) {
        styleName = styleName + " warning-row";
        return styleName;
      }
      if (rowIndex % 2 != 0) {
        styleName = styleName + " striped-row";
      }
      return styleName;
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      if (this.isMultipleSelection) {
        this.setMultipleSelection(val);
      }
    },
    rowdblclick: function(val) {
      this.checkObj = val;
      this.$emit("rowdblclick", val);
    },
    rowclick: function(val) {
      this.checkObj = val;
      this.$emit("rowclick", val);
    },
    selectclick: function(val,val2) {
      this.$emit("selectclick", val,val2);
    },
    selectAllClick: function(val) {
      this.$emit("selectAllClick", val);
    },
		clearSeleClick: function() {
			this.$refs.listTalbe.clearSelection();
		},
		toggleRowSeleClick: function(row, selected) {
			this.$refs.listTalbe.toggleRowSelection(row, selected);
		},
    showMenu(event) {
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      // Get the current location
      this.contextMenuData.axios = {
        x,
        y
      };
    },
    rowcontextmenu(row, event) {
      this.rowdata = row;
      this.showMenu(event);
    },
    menuclick(handlename) {
      this.$emit("menuclick", handlename, this.rowdata);
    },
    closedialog() {
      this.$store.dispatch("setimgstate", false);
    },
    cellclick(id, handle) {
      this.$emit("btnclick", id, handle);
    },
    toggleSelection(rows) {
      this.$refs.listTalbe.clearSelection();
      rows.forEach(row => {
        this.$refs.listTalbe.toggleRowSelection(row);
      });
    },
    getSummaries(param) {
         const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return Number(Number(prev + curr).toFixed(2));
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
  }
};
</script>

<style>
.el-table .warning-row {
  background: #ffe4e1;
}

.el-table .delflag-row {
  text-decoration: line-through;
}

.el-table .striped-row {
  background: #fafafa;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>