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
						<el-form-item label="公告名称">
							<el-input v-model="listQuery.name" placeholder="公告名称"></el-input>
						</el-form-item>
						<el-button type="info" v-on:click="init" plain class="queryBtn">查询</el-button>
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
		<notice-edit></notice-edit>
	</div>
</template>
<script>
	import basic from '@/api/basic';
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import noticeedit from './noticeedit';
	
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'list-data': list,
			'tools-page':toolspage,
			"notice-edit": noticeedit
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
						label: '编号',
						prop: 'id',
					},
					{
						label: '公告名称',
						prop: 'name',
					},
					{
						label: '公告备注',
						prop: 'summary',
						width:'600px'
					}
					
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					name:"",
					keyword: 'sysNotice',
					pageSize:20,
					pageNum:1
				},
				headHeight:0,
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
				basic.dictNotice("/pageByName",this.listQuery).then(res => {
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
				this.setid(val.id);
				this.setdialogshow();
			},
			del_click(ids) {
				let listids = {'ids':ids}
				basic.dict("DELETE",listids).then(res => {
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
