<template>
	<div>
		<div ref="head">
			<el-row class="btn mt10" v-if="activeName === 'first'">
				<el-col class="el-col-sty m-view">
					<button class="m-btn-group" v-on:click="back_click()" round>
						<i class="u-icon fa fa-back s-blue"></i><span>返回</span>
					</button>
					<button class="m-btn-group" v-on:click="add_member()" tooltip="">
						<i class="u-icon fa fa-add s-green"></i><span>添加会员</span>
					</button>
					<button class="m-btn-group" v-on:click="del_click()" round>
						<i class="u-icon fa fa-delete s-green"></i><span>移除会员</span>
					</button>
					<!-- <div class="right-button">
						<el-button router type="warning" size="mini" v-on:click="remove_goods()">禁售商品</el-button>
					</div> -->
				</el-col>
			</el-row>
			<el-row v-if="activeName === 'second'">
				<div class="topBtn">
					<el-col class="el-col-sty m-view">
						<button class="m-btn-group" v-on:click="back_click()" round>
							<i class="u-icon fa fa-back s-blue"></i><span>返回</span>
						</button>
						<button class="m-btn-group" v-on:click="add_goods()" tooltip="">
							<i class="u-icon fa fa-add s-green"></i><span>添加商品</span>
						</button>
						<button class="m-btn-group" v-on:click="remove_goods()" round>
							<i class="u-icon fa fa-delete s-green"></i><span>移除商品</span>
						</button>
					</el-col>
				</div>
			</el-row>
		</div>
		
		<div class="div_tabs">
			<el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
				<el-tab-pane label="会员分组" name="first" style="height: 100%">
					<el-row>
						<el-col :span="24">
							<div class="bootomclas" style="margin-top:5px">
								<list-data :columndata="columndatas" :bindata="listdata" :headHeight="headHeight"></list-data>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="block">
								<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
							</div>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="禁售商品" name="second">
					<js-goods ref="removeGoods"></js-goods>
				</el-tab-pane>
			</el-tabs>
		</div>
	<addmember-list></addmember-list>
	<goods-select></goods-select>
	</div>
</template>
<script>
	import API from "@/api/member";
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import addmember from "./addmemberlist.vue"
	import jsgoods from '@/components/jsgoods.vue'
	import goodsselect from './goodsselect';
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'list-data': list,
			'tools-page':toolspage,
			'addmember-list': addmember,
			'js-goods':jsgoods,
			'goods-select': goodsselect
		},
		computed: {
			...mapState({
				multipleSelection : state => state.toolslist.multipleSelection,
				menuId: state => state.toolslist.menuId
			})
		},
		data() {
			return {
				activeName:'first',
				columndatas: [{
						label: '主键',
						prop: 'id',
						type: 'selection',
						align: 'center'
					},
					{
						label: '分组名称',
						prop: 'groupName'
					},
					{
						label: '会员账号',
						prop: 'phone'
					},
					{
						label: '公司名称',
						prop: 'company',
					},
					{
						label: '客户名称',
						prop: 'name'
					},
					{
						label: '联系人',
						prop: 'contact',
					},
					{
						label: '客户编号',
						prop: 'code'
					},
					{
						label: '售价方式',
						prop: 'priceMode'
					},
					{
						label: '职位',
						prop: 'job'
					},
					{
						label: '状态',
						prop: 'manyStatus'
					}
					
				],
				listdata: null,
				total:0,
				listLoading: true,
				listQuery: {
					pageSize:20,
					pageNum:1,
					memberGropId:null
				},
				headHeight: 0,
				removeGoodsVue:null
			}
		},
		created() {
			this.init();
		},
		mounted(){
			this.headHeight = this.$refs.head.offsetHeight;
			this.removeGoodsVue = this.$refs.removeGoods;
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid",
				setMultipleSelection: "setMultipleSelection",
				setdialogshow1: "setdialogshow1"
			}),
			//初始化
			init() {	
				this.setMultipleSelection("");
				var that = this;
				that.listQuery.memberGropId = that.menuId;
				API.getgroupdetail(that.listQuery).then(function(res) {
					if (res.meta.success) {
						that.listdata = res.data.list;
						that.total = res.data.total;
					}
				});
				if(this.removeGoodsVue != null)
				{
					this.removeGoodsVue.init();
				}
				
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			
			rowdblclick(val){
				
			},
			//新增会员
			add_member(){
				if(this.menuId == 0)
				{
					this.$message({
						message: '请选择会员分组!',
						type: 'warning'
					});
					return;
				}
				
				this.setid(this.menuId);
				this.setdialogshow();
			},
			//移除会员
			del_click() {
				var that = this;
				var list = that.multipleSelection;
				console.log(list)
				if(list == null || list.length == 0)
				{
					this.$message({
					message: '请选择要移除的会员!',
					type: 'warning'
					});
				}else
				{
					this.$confirm('确定要移除选中会员吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let ids = "";
						for (let i = 0; i < list.length; i++) {
							ids = ids + "," + list[i].id;
						}
						if (ids.length > 0) {
							ids = ids.substring(1);
						}
						
						let listids = {'ids':ids}
						API.groupdetail("DELETE",listids).then(res => {
							console.log(JSON.stringify(res.data));
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.init();
						});
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			//禁售商品
			remove_goods(){
				this.$parent.$parent.$parent.menuIndex = '/member/jsgoodslist';
				this.$router.push("/member/jsgoodslist");
			},
			//返回按钮
			back_click(){
				this.$router.push("/member");
			},
			//切换tab事件
			handleClick(tab, event) {
			   this.activeName = tab.name;
			   this.setMultipleSelection("");
			   
			},
			//添加商品
			add_goods(){
				if(this.menuId == 0)
				{
					this.$message({
						message: '请选择会员分组!',
						type: 'warning'
					});
					return;
				}
				
				this.setid(this.menuId);
				this.setdialogshow1();
			},
			//移除商品
			remove_goods(){
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length < 1)
				{
					this.$message({
						message: '请选择需要移除的商品!',
						type: 'warning'
					});
					return;
				}else{
					this.$confirm('确定要移除选中商品吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let ids = "";
						for (let i = 0; i < list.length; i++) {
							ids = ids + "," + list[i].id;
						}
						if (ids.length > 0) {
							ids = ids.substring(1);
						}
						
						let listids = {'ids':ids};
						let url = "/goods/remove";
						API.goodsremove("DELETE", url, listids).then(res => {
							console.log(JSON.stringify(res.data));
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.init();
						});
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				
			},
			
		}
	}
</script>
<style scoped lang="scss">
	.btn.mt10.el-row{
		margin-top:5px;
	}
	.right-button{
		float: right;
	}
	.el-button--warning {
		color: #000;
		background-color: #ffb822;
		border-color: #ffb822;
    }
	.el-button--warning:hover{
		background: #ebb563;
		border-color: #ebb563;
	}
</style>
