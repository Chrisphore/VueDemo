<template>
	<el-container style="height: 100%;">
		<!--左侧导航-->
		<aside class="aside1">
			<el-row class="btn">
				<el-col class="el-col-sty m-view">
					<el-tooltip class="item" effect="dark" content="新增会员分组" placement="bottom">
					<button class="m-btn-group" v-on:click="redirtUrl()" tooltip="">
						<i class="u-icon fa fa-add s-green"></i>
					</button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="编辑会员分组" placement="bottom">
					<button class="m-btn-group" v-on:click="modify_click()" tooltip="">
						<i class="u-icon fa fa-edit s-green"></i>
					</button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="删除会员分组" placement="bottom">
					<button class="m-btn-group" v-on:click="del_click()" round>
						<i class="u-icon fa fa-delete s-green"></i>
					</button>
					</el-tooltip>
				</el-col>
			</el-row>
			
			<div class="menuclass">
			<!--导航菜单-->
			<el-menu router @select="handleSelect">
				<template>
					<el-menu-item :index="menuIndex" :class="defaultActiveIndex">
						<i class="fa fa-all s-yellow"></i><span slot="title">全部分组</span>
					</el-menu-item>
				</template>
				<el-tree ref="tree" :data="menudata" node-key="typeId" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
			</el-menu>
			</div>
		</aside>
		
		<!--右侧内容区-->
		<section class="content-container">
			<div class="grid-content bg-purple-light" style="height: 100%;">
				<el-col :span="24" class="content-wrapper"  style="height: 100%;">
					<transition name="fade" mode="out-in"  style="height: 100%;">
						<router-view v-if="isRouterAlive"></router-view>
					</transition>
				</el-col>
			</div>
		</section>
		
		<group-edit></group-edit>
	</el-container>
		
</template>

<script>
import API from "@/api/member";
import tree from "@/common/dataToTree";
import { mapState, mapActions } from "vuex";
import groupedit from "./groupedit";

export default {
  props: ["menulist", "defaultrouter"],
  name: "basic",
  components: {
    "group-edit": groupedit
  },
  data() {
    return {
      collapsed: false,
      menutype: 0,
      menudata: [],
      isRouterAlive: true,
      defaultProps: {
        children: "children",
        label: "typeName"
      },
      menuIndex: "",
			defaultActiveIndex: "is-active"
    };
  },
  computed: {
    ...mapState({
      id: state => state.toolslist.id
    })
  },
  created() {
    this.init();
    var host = window.location.host;
    this.menutype = localStorage.getItem(host + "X-router");
    if (!this.menutype) {
      this.menutype = 0;
    }
  },
  methods: {
    ...mapActions({
      setdialogshow: "setdialogshow",
      setid: "setid",
      setdialogshow1: "setdialogshow1",
      setMenuId: "setMenuId",
			setdialogshow2: "setdialogshow2"
    }),
    //初始化
    init() {
      this.menuIndex = "/member/groupmember";
      var that = this;
      var p = {};
      API.getmembergroup(p).then(function(res) {
        if (res.meta.success) {
          that.menudata = [];
          res.data.forEach(element => {
            let model = {
              typeId: element.id,
              typeName: element.name
            };
            that.menudata.push(model);
          });
        }
      });
    },
    //点击全部分组事件
    handleSelect() {
			this.defaultActiveIndex = "is-active";
			this.$refs.tree.setCurrentKey(null);
      this.setMenuId(null);
      this.setid(0);
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //点击分组节点事件
    handleNodeClick(data) {
			this.defaultActiveIndex = "";
      this.setMenuId(data.typeId);
      this.setid(0);
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //新增会员分组
    redirtUrl() {
      this.setid(0);
      this.setdialogshow2();
    },

    //编辑会员分组
    modify_click() {
      var currentNode = this.$refs.tree.getCurrentNode();
      if (currentNode == null || this.id == -1) {
        this.$message({
          type: "warning",
          message: "请选择需要编辑的分组!"
        });
      } else {
        this.setid(currentNode.typeId);
        this.setdialogshow2();
      }
    },
    //删除会员分组
    del_click() {
      var currentNode = this.$refs.tree.getCurrentNode();
      if (currentNode == null) {
        this.$message({
          type: "warning",
          message: "请选择需要删除的分组!"
        });
      } else {
        this.$confirm("确定要删除选中记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let ids = currentNode.typeId + "";
            let listids = { ids: ids };
            //删除分组
            API.group("DELETE", listids).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.setid(-1);
              this.init();
              this.setMenuId(0);
							this.handleSelect();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>

