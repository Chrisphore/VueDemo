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
						<el-form-item label="链接名称">
							<el-input v-model="listQuery.keyword" placeholder="链接名称"></el-input>
						</el-form-item>
						<el-button type="info" v-on:click="search" plain class="queryBtn">查询</el-button>
					</el-form>
				</div>
			</el-row>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas" >
					<list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick" :headHeight="headHeight"></list-data>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
				</div>
			</el-col>
		</el-row>
		<links-edit></links-edit>
	</div>
</template>
<script>
	import basic from '@/api/basic';
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import linksedit from './linksedit';
	
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'list-data': list,
			'tools-page':toolspage,
			"links-edit": linksedit
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
						label: '链接名称',
						prop: 'name',
					},
					{
						label: '链接地址',
						prop: 'redirturl',
					},
					{
						label: '图片地址',
						prop: 'imgurl',
						width:'350px',
						type: 'img',
						imgheight:'40px'
					},
					{
						label: '状态',
						prop: 'statusMany'
					}
					
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					pageSize:20,
					pageNum:1
				},
				headHeight:0
			}
		},
		created() {
			this.init();
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight;
			// console.log("----"+this.headHeight);
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid"
			}),
			init() {		
				basic.links("PAGE", this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
			},
			search() {
	this.listQuery.pageNum =1;
		this.init();
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			rowdblclick(val){
				this.setid(val.id);
				this.setdialogshow();
			},
			del_click(ids) {
				let listids = {'ids':ids}
				basic.links("DELETE",listids).then(res => {
					console.log(JSON.stringify(res.data));
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.init();
				});
			}
		}
	}
</script>
