<template>
	<el-container style="height: 100%;">
	
		<!--左侧导航-->
		<aside class="aside1">

			<!--导航菜单-->
			<el-menu :default-active="defaultActiveIndex" router @select="handleSelect" >
				<template v-for="(item,index) in menudata">
					<el-menu-item :index="index.toString()" :route="item.path">
						<span slot="title">{{item.name}}</span>
					</el-menu-item>
				</template>
			</el-menu>

		</aside>

		<!--右侧内容区-->
		<section class="content-container">
			<div class="grid-content bg-purple-light" style="height: 100%;">
				<el-col :span="24" class="content-wrapper" style="height: 100%;">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</div>
		</section>

	</el-container>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	
export default {
  props: ["menulist"],
  name: "basic",
  data() {
    return {
      defaultActiveIndex: "",
      menudata: this.menulist,
      menutype: 0
    };
  },
  methods: {
		...mapActions({
			setdialogshow1: "setdialogshow1",
			setMenuId: "setMenuId"
		}),
    handleSelect(index,indexPath) {
			this.setMenuId(this.menulist[index].menuId);
      this.defaultActiveIndex = index;
    }
  },
  created() {
    if(this.menulist&&this.menulist.length>0) {
			this.setMenuId(this.menulist[0].menuId);
      this.defaultActiveIndex="0";
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-menu-item,
.el-submenu__title {
  color: #5a5e66;
}

.el-submenu .el-menu-item.is-active,
.el-menu-item.is-active,
.el-submenu .el-menu-item.is-active:hover,
.el-menu-item.is-active:hover {
  background-color: #ffb822;
}

.aside1 {
  margin: 5px;
  min-width: 50px;
  background: #fff;
  border: 1px solid #d4d8d9;
  margin-top: 46px;

  overflow-x: hidden;
  overflow-y: auto;

  height: -moz-calc(100% - 80px);

  .el-menu {
    height: 100%;
    /*写给不支持calc()的浏览器*/
    height: -moz-calc(100% - 80px);
    height: -webkit-calc(100% - 80px);
    height: calc(100% - 80px);
    border-radius: 0px;
    background-color: #fff;
    border-right: 0px;
  }

  .el-submenu .el-menu-item {
    min-width: 60px;
  }

  .el-menu {
    width: 180px;
  }

  .el-menu-item:hover,
  .el-submenu .el-menu-item:hover,
  .el-submenu__title:hover {
    background-color: #ffb822;
  }
}

.content-container {
  background: #f0f0f0;
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
  padding-bottom: 1px;
	height: 100%;
  .content-wrapper {
    background-color: #f0f0f0;
    box-sizing: border-box;
  }
}
</style>
