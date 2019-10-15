<template>
	<div>
		<div ref="head">
		<div class="topBtn">
			<btn-custom :btnType="0" :editurl="editurl" :apiurl="apiurl" :custombtn="custombtn"></btn-custom>
		</div>

		<el-row class="topsercah">
			<el-form :inline="true" class="el-form-class" :model="listQuery">
				<el-col>
				<el-form-item label="商品名称">
					<el-input v-model="listQuery.keyword" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item label="条形码">
					<el-input v-model="listQuery.barCode" placeholder="条形码"></el-input>
				</el-form-item>
				<el-form-item label="型号">
					<el-input v-model="listQuery.typeSpecification" placeholder="型号"></el-input>
				</el-form-item>
				</el-col>
				<el-col> 
					<el-form-item label="商品状态">
						<select-list ref="status" pcode="goodsReleaseStatus" code="-1" type="1">
						</select-list>
					</el-form-item>
					<el-form-item label="品牌">
						<select-list ref="brand" pcode="" code="" type="4">
						</select-list>
					</el-form-item>
					<el-button type="info" v-on:click="query" plain class="queryBtn">查询</el-button>
				</el-col>
			</el-form>
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
					<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize" :currentpage="listQuery.pageNum"></tools-page>
				</div>
			</el-col>
		</el-row>
		<goods-add></goods-add>
	</div>
</template>
<script>
	import goods from '@/api/goods';
	import toolsbtncustom from '@/components/toolsbtncustom'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import goodsadd from './goodsadd';
	import selectlist from "@/components/toolselect";
	
	export default {
		components: {
			'btn-custom': toolsbtncustom,
			'list-data': list,
			'tools-page':toolspage,
			'goods-add':goodsadd,
			"select-list": selectlist
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
						label: '图片',
						prop: 'picture',
						type:'img'
					},
					{
						label: '商品编号',
						prop: 'goodsCode',
					},
					{
						label: '名称',
						prop: 'goodsName',
						type:'title'
					},
					{
						label: '条形码',
						prop: 'barCode',
					},
					{
						label: '型号',
						prop: 'typeSpecification',
					},
					{
						label: '实际销量',
						prop: 'factSell'
					},
					{
						label: '状态',
						prop: 'statusName'
					}
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					pageSize:20,
					pageNum:1,
					typeId:-1,
					brandId:-1,
					status:-1,
					barCode:'',
					typeSpecification:''
				},
				headHeight:0,
				editurl:"/goods/goodsedit",
				apiurl:"/goods/release",
				custombtn:[
					{ name: '上架',icoName:"up s-green",fnHandler: '$parent.status_click(0)'},
					{ name: '下架',icoName:"down s-green",fnHandler: '$parent.status_click(1)'}
				]
			}
		},
		computed: {
			...mapState({
				menuId: state => state.toolslist.menuId,
				multipleSelection : state => state.toolslist.multipleSelection,
				params: state => state.toolslist.params
			})
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight;
			this.init();
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid",
				setMultipleSelection: "setMultipleSelection"
			}),
			
			init() {
				if(this.params.goodsQuery != undefined)
				{
					this.listQuery = this.params.goodsQuery;
				}else{
					
					this.listQuery.brandId =  this.$refs.brand.values;
					this.listQuery.status =  this.$refs.status.values;
					this.$set(this.params,"goodsQuery",this.listQuery);
				}
				this.listQuery.typeId = this.menuId;
				goods.release("PAGE", this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			rowdblclick(val){
				this.$router.push({path: this.editurl,query:{id:val.id}});
			},
			query(){
				this.listQuery.pageNum = 1;
				this.listQuery.brandId =  this.$refs.brand.values;
				this.listQuery.status =  this.$refs.status.values;
				this.$set(this.params,"goodsQuery",this.listQuery);
				this.init();
			},
			status_click(status)
			{
				let name = "上架";
				let tip = "确定要上架选中商品吗?";
				if(status == 1)
				{
					name = "下架";
					tip = "确定要下架选中商品吗,下架后商城装修的商品将会删除?";
				}
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					that.$message.warning('请选择要'+name+'的商品!');
				}else
				{
					this.$confirm(tip, '提示', {
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
						let statuslist = {
							"ids":ids,
							"status":status
						}
						goods.updateStatus(statuslist).then(res => {
							if(res.meta.success)
							{
								that.$message.success(name+'成功');
								that.init();
							}else
							{
								let mes = res.meta.message + name +'失败!';
								that.$message.error(mes);
							}
						});
					}).catch(() => {
						that.$message.info("已取消"+name);
					});
				}
			},
		}
	}
</script>
