<template>
	<div>
		<div ref="head">
			<el-row>
				<div class="topBtn">
					<el-col class="el-col-sty m-view">
						<button class="m-btn-group" v-on:click="back_click()"  tooltip="">
							<i class="u-icon fa fa-back s-green"></i><span>返回B</span>
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
			
			<el-row>
				<div class="topsercah">
					<el-form :inline="true" class="el-form-class" :model="listQuery">
						<el-form-item label="商品名称">
							<el-input v-model="listQuery.goodsName" placeholder="商品名称"></el-input>
						</el-form-item>
						<el-form-item label="条码">
							<el-input v-model="listQuery.barCode" placeholder="商品条码"></el-input>
						</el-form-item>
						<el-form-item label="型号">
							<el-input v-model="listQuery.typeSpecification" placeholder="规格型号"></el-input>
						</el-form-item>
						<el-form-item label="商品状态">
							<el-select v-model="listQuery.status" placeholder="请选择">
								<el-option
									v-for="item in statusOption"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="品牌">
							<el-select v-model="listQuery.brandId" placeholder="请选择">
								<el-option
									v-for="item in brandOption"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-button type="info" v-on:click="init" plain class="queryBtn">查询</el-button>
					</el-form>
				</div>
			</el-row>
		</div>
		
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
	<goods-select></goods-select>
	</div>
</template>
<script>
	import API from "@/api/member";
	import goods from "@/api/goods";
	import basicAPI from '@/api/basic'
	import list from '@/components/list'
	import toolsbtn from '@/components/toolsbtn'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import goodsselect from './goodsselect';
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'tools-page':toolspage,
			'list-data': list,
			'goods-select': goodsselect
		},
		
		data() {
			return {
				columndatas: [{
						label: '主键',
						prop: 'id',
						type: 'selection',
						align: 'center'
					},
					{
						label: '商品分组',
						prop: 'groupName'
					},
					{
						label: '图片',
						prop: 'picture',
						type: "img",
						
					},
					{
						label: '商品编码',
						prop: 'code'
					},
					{
						label: '名称',
						prop: 'name'
					},
					{
						label: '条码',
						prop: 'barCode'
					},
					{
						label: '库存',
						prop: 'highestStock'
					}
					// ,
					// {
					// 	label: '访问量',
					// 	prop: 'factview',
					// },
					// {
					// 	label: '总销量',
					// 	prop: 'factSell',
					// }
					,
					{
						label: '发布时间',
						prop: 'publishTime',
						type: 'ymd'
					},
					{
						label: '状态',
						prop: 'statusName'
					}
					
				],
				listdata: null,
				total:0,
				listLoading: true,
				listQuery: {
					pageSize:20,
					pageNum:1,
					memberGroupId: 0,
					goodsName:null,
					barCode: null,
					model: null,
					status: '',
					brandId: 0
				},
				statusOption: [
					{
						value : null,
						label : "全部"
					},
					{
						value : 0,
						label : "上架"
					},
					{
						value : 1,
						label : "下架"
					}
				],
				headHeight: 0,
				brandOption:[{
						value : 0,
						label : "全部"
					},],
				goodslist:[]
				
			}
		},
		computed: {
			...mapState({
				multipleSelection : state => state.toolslist.multipleSelection,
				menuId: state => state.toolslist.menuId
			})
		},
		created() {
			this.init();
		},
		mounted(){
			this.headHeight = this.$refs.head.offsetHeight;
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid",
				setMultipleSelection: "setMultipleSelection"
			}),
			//初始化
			init() {
				this.setMultipleSelection("");
				this.listQuery.memberGroupId = this.menuId;
				let url = "/goods/remove";
				API.goodsremove("PAGE", url, this.listQuery).then(res => {
					if (res.meta.success) {
						this.listdata = res.data.list;
						this.total = res.data.total;
					}
				})
				
				let p={}
				basicAPI.brand("LIST", p).then(res => {
					if(res.meta.success)
					{
						this.brandOption = [{
						value : 0,
						label : "全部"
					},];
						res.data.forEach(element => {
							let model = {
								value: element.id,
								label: element.name
							};
							this.brandOption.push(model);
						});
					}
				});
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			
			rowdblclick(val){
				
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
				this.setdialogshow();
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
			
			//返回按钮事件
			back_click(){
				this.$parent.$parent.$parent.menuIndex='/member/groupmember';
				this.$router.push("/member/groupmember");
			}
			
			
		}
	}
</script>
<style scoped lang="scss">
</style>
