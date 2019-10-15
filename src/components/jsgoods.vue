<template>
	<div>
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
	</div>
</template>
<script>
	import list from '@/components/list'
	import { mapState, mapActions } from "vuex";
	import API from "@/api/member";
	import goods from "@/api/goods";
	import basicAPI from '@/api/basic'
	import toolspage from '@/components/toolspage'
	
	export default {
		name:'jsgoods',
		components: {
			'list-data': list,
			'tools-page':toolspage
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
				headHeight: 0,
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
				brandOption:[{
					value : 0,
					label : "全部"
				},],
				total:0,
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
		}
	}
</script>
<style scoped lang="scss">
</style>
