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
						<el-form-item label="菜单名称">
							<el-input v-model="listQuery.keyword" placeholder="菜单名称"></el-input>
						</el-form-item>


							<el-form-item label="菜单类型:" v-show="selectstu">
								<select-list ref="menutype" pcode="menutype" :code="code" type="1">
								</select-list>
							</el-form-item>
						<el-button type="info" v-on:click="init" plain class="queryBtn">查询</el-button>
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
		<menu-edit></menu-edit>
	</div>
</template>
<script>
import basic from "@/api/basic";
import toolsbtn from "@/components/toolsbtn";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
import { mapState, mapActions } from "vuex";
import menuedit from "./menuedit";
import selectlist from "@/components/toolselect";

export default {
  components: {
    "btn-tools": toolsbtn,
    "list-data": list,
    "tools-page": toolspage,
    "menu-edit": menuedit,
    "select-list": selectlist
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
          label: "菜单名称",
          prop: "name",
          sortable: true
        },
        {
          label: "菜单类型",
          prop: "menuTypeShow"
        },
        {
          label: "菜单地址",
          prop: "url"
        },
        {
          label: "关键字",
          prop: "keywords"
        },
        {
          label: "菜单状态",
          prop: "statusShow"
        }
      ],
      listdata: null,
      total: 1,
      listLoading: true,
      listQuery: {
        keyword: null,
        menuType: null,
        pageSize: 20,
        pageNum: 1
      },
      headHeight: 0,
      code: null,
      selectstu: true,
      params: {}
    };
  },
  mounted() {
    if (this.$route.query.type) {
      this.selectstu = false;
      this.code = this.$route.query.type;

      this.params.type = this.$route.query.type;
      this.params.status = false;
    } else {
      this.params.type = "2";
      this.params.status = true;
      this.selectstu = true;
    }
    if (this.$route.query.type == "2") {
      var p = {
        label: "菜单图标",
        prop: "img",
        width: "400",
        type: "img",
        imgheight: "40px"
      };
      this.columndatas.push(p);
    }
    this.setparms(this.params);
    this.headHeight = this.$refs.head.offsetHeight;
    this.init();
  },
  methods: {
    ...mapActions({
      setdialogshow: "setdialogshow",
      setid: "setid",
      setparms: "setparams",
			setMultipleSelection: "setMultipleSelection"
    }),
    init() {
			this.setMultipleSelection("");
      if (this.$route.query.type) {
        this.listQuery.menuType = this.$route.query.type;
      } else {
        this.listQuery.menuType = this.$refs.menutype.values;
      }
      basic.menu("PAGE", this.listQuery).then(res => {
        this.total = res.data.total;
        this.listdata = res.data.list;
      });
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
      basic.menu("DELETE", listids).then(res => {
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
