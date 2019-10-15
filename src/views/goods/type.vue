<template>
	<el-container style="height: 100%;">
	
		<!--左侧导航-->
		<aside class="aside1">
			<el-row class="btn">
				<el-col class="el-col-sty m-view">
					<el-tooltip class="item" effect="dark" content="新增商品类型" placement="bottom">
					<button class="m-btn-group" v-on:click="add_click()" tooltip="">
						<i class="u-icon fa fa-add s-green"></i>
					</button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="删除商品类型" placement="bottom">
					<button class="m-btn-group" v-on:click="del_click()" round>
						<i class="u-icon fa fa-delete s-green"></i>
					</button>
					</el-tooltip>
				</el-col>
			</el-row>
			
			<div class="menuclass">
			<!--导航菜单-->
			<el-menu  router @select="handleSelect">
				<template>
					<el-menu-item index='/goods/goodslist' :class="defaultActiveIndex">
						<i class="fa fa-all s-yellow"></i><span slot="title">全部商品类型</span>
					</el-menu-item>
				</template>
				<el-tree ref="tree" :data="data" node-key="typeId" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
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
		<div><type-edit></type-edit></div>
	</el-container>
		
</template>

<script>
	import goods from '@/api/goods';
	import typeedit from './typeedit';
	import { mapState, mapActions } from "vuex";
	
	export default {
		components: {
			"type-edit": typeedit
		},
		name: 'basic',
		data() {
			return {
				isRouterAlive:true,
				menutype: 0,
				data: [],
				defaultProps: {
				  children: 'children',
				  label: 'typeName'
				},
				defaultActiveIndex: "is-active"
			}
		},
		created() {
			this.init();
		},
		methods: {
			...mapActions({
				setdialogshow1: "setdialogshow1",
				setMenuId: "setMenuId"
			}),
			init() {
				goods.typeRelease("LIST", "","").then(res => {
					this.data = this.dataToTree(res.data,"typeId");
					this.handleSelect();
				});
			},
			add_click(){
				this.setdialogshow1();
			},
			del_click(){
				let listids = {'ids':this.$refs.tree.getCurrentNode().id}
				goods.typeRelease("DELETE",listids,"").then(res => {
					this.$message.success('删除成功');
					this.init();
					this.handleSelect();
				});
			},
			handleNodeClick(data){
				this.defaultActiveIndex = "";
				this.setMenuId(data.typeId);
				this.isRouterAlive = false;
				this.$nextTick(function(){
					this.isRouterAlive = true;
				})
			},
			handleSelect() {
				this.defaultActiveIndex = "is-active";
				this.$refs.tree.setCurrentKey(null);
				this.setMenuId(-1);
				this.isRouterAlive = false;
				this.$nextTick(function(){
					this.isRouterAlive = true;
				})
			},
		}
	}
</script>
