<template>
	<el-container style="height: 100%;">
		<!--左侧导航-->
		<aside class="aside1">
      	<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>			
			<div class="menuclass">
			<!--导航菜单-->
			<el-menu router @select="handleSelect" defaultActiveIndex="22">
				<template>
					<el-menu-item index="/bascic/sell/sellhotgoods" :class="defaultActiveIndex">
						<i class="fa fa-all s-yellow"></i><span slot="title">全部畅销类型</span>
					</el-menu-item>
				</template>
				<el-tree ref="tree" node-key="typeId" :data="menudata" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
			</el-menu>
			</div>
		</aside>
		
		<!--右侧内容区-->
		<section class="content-container">
			<div class="grid-content bg-purple-light" style="height: 100%;">
				<el-col :span="24" class="content-wrapper"  style="height: 100%;">
					<transition name="fade" mode="out-in"  style="height: 100%;">
						<router-view  ref="goods"></router-view>
					</transition>
				</el-col>
			</div>
		</section>
  <category-edit> </category-edit>
	</el-container>	
</template>

<script>
import API from "@/api/decoration";
import { mapState, mapActions } from "vuex";
import toolsbtncustom from "@/components/toolsbtncustom";
// import sellhotgoods from "./sellhotgoods";

export default {
  props: ["menulist", "defaultrouter"],
  name: "basic",
  components: {
    "btn-custom": toolsbtncustom,
    "category-edit": resolve => {
      require(["./categoryedit.vue"], resolve);
    }
  },
  data() {
    return {
      menudata: [],
      defaultProps: {
        children: "children",
        label: "typeName"
      },
      menuIndex: "",
      custombtn: [
        {
          name: "新增",
          icoName: "add s-green",
          fnHandler: "$parent.$parent.addcategory()"
        },
        {
          name: "编辑",
          icoName: "edit s-green",
          fnHandler: "$parent.$parent.editcategory()"
        },
        {
          name: "删除",
          icoName: "delete s-green",
          fnHandler: "$parent.$parent.deletecategory()"
        }
      ],
      checkdata: null,
      defaultActiveIndex: "is-active"
    };
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params
    })
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions({
      setparams: "setparams"
    }),
    //初始化
    init() {
      var that = this;
      var p = {};
      API.getselltypelist(p).then(function(res) {
        if (res.meta.success) {
          that.menudata = [];
          res.data.forEach(element => {
            let model = {
              typeId: element.id,
              typeName: element.name,
              disabled: element.editstatus == "0" ? false : true
            };
            that.menudata.push(model);
          });
        }
      });
    },
    //全部
    handleSelect() {
      this.defaultActiveIndex = "is-active";
      this.$refs.tree.setCurrentKey(null);
      var p = { typeid: -1 };
      this.setparams(p);
      this.$refs.goods.init();
    },
    //获取畅销明细
    handleNodeClick(data) {
      this.defaultActiveIndex = "";
      this.checkdata = data;
      var p = { typeid: data.typeId };
      this.setparams(p);
      this.$refs.goods.init();
    },
    //新增畅销类型
    addcategory() {
      var p = { categoryid: 0, categorystu: true, title: "新增畅销类型" };
      this.setparams(p);
    },
    serach(id) {},
    //编辑畅销类型
    editcategory() {
      if (this.checkdata != null) {
        if (this.checkdata.disabled) {
          this.$message.warning("当前类型是系统默认,不可编辑");
          return;
        }
        var p = {
          categoryid: this.checkdata.typeId,
          categorystu: true,
          title: "编辑畅销类型"
        };
        this.setparams(p);
      } else {
        this.$message.error("请先选择畅销类型");
        return;
      }
    },
    //删除畅销类型
    deletecategory() {
      var that = this;
      if (this.checkdata != null) {
        if (this.checkdata.disabled) {
          this.$message.warning("当前类型是系统默认,不可编辑");
          return;
        }
        var p = { ids: this.checkdata.typeId };
        API.deleteselltypebyid(p).then(function(res) {
          if (res.meta.success) {
            that.$message.success("删除成功");
            that.init();
         that.handleSelect();
          }
        });
      } else {
        this.$message.error("请先选择畅销类型");
        return;
      }
    }
  }
};
</script>
