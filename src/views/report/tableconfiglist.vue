<template>
	<div class="zscy-list-container">
		<div ref="head">
			<div class="topBtn">
				<btn-custom :btnType="0" :addurl="editurl" :editurl="editurl" :apiurl="apiurl"></btn-custom>
			</div>
			<el-row>
				<div class="topsercah">
					<el-form :inline="true" class="el-form-class" :model="listQuery">
						<el-form-item label="对应菜单名称">
							<el-input v-model="listQuery.keyword" placeholder="对应菜单名称"></el-input>
						</el-form-item>
						<el-form-item label="表格类型">
							<select-list ref="tableLabelId" :default="listQuery.tableLabelId" type="16"></select-list>
						</el-form-item>
						<el-button type="info" v-on:click="init" plain class="queryBtn" >查询</el-button>
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
	</div>
</template>
<script>
	import basic from '@/api/basic';
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import selectlist from "@/components/toolselectnew";
	import toolsbtncustom from "@/components/toolsbtncustom";
	
	
	export default {
		computed: {
			...mapState({
				multipleSelection : state => state.toolslist.multipleSelection
			})
		},
		components: {
			"btn-custom": toolsbtncustom,
			'list-data': list,
			'tools-page':toolspage,
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
						label: '对应菜单名称',
						prop: 'menuName',
					},
					{
						label: '对应菜单编码',
						prop: 'menuCode',
					},
					{
						label: '对应表格位置',
						prop: 'tableLocation',
					},
					{
						label: '对应表名称',
						prop: 'tableName'
					},
					{
						label: '是否分页',
						prop: 'isPageString'
					},
					{
						label: '每页显示数量',
						prop: 'pageSize'
					},
					{
						label: '表格类型',
						prop: 'tableTypeString'
					},
					{
						label: '表格标签id',
						prop: 'tableLabelId'
					},
					{
						label: '是否自定义表头',
						prop: 'isCustomHeadrString'
					},
					{
						label: '报表图标',
						prop: 'tableIcon'
					}
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					pageSize:20,
					pageNum:1,
					tableType:-1,
				},
				headHeight:0,
				editurl:"/report/tableconfigedit",
				apiurl:"/common/pubTableConfig"
			}
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight;
			this.init();
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid"
			}),
			init() {	
				this.listQuery.tableType =  this.$refs.tableLabelId.values;
				basic.config("PAGE", this.listQuery).then(res => {
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
			}
		},
		activated() {
			this.init();
		}
	}
</script>
