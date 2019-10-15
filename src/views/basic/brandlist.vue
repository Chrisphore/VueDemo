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
						<el-form-item label="品牌名称">
							<el-input v-model="listQuery.keyword" placeholder="品牌名称"></el-input>
						</el-form-item>
						<el-button type="info" v-on:click="init" plain class="queryBtn">查询</el-button>
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
		 <brand-edit></brand-edit> 
	</div>
</template>
<script>
	import basic from '@/api/basic';
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import brandedit from './brandedit';
	
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'list-data': list,
			'tools-page':toolspage,
			"brand-edit": brandedit
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
						label: '品牌名称',
						prop: 'name',
					},
					{
						label: '品牌代码',
						prop: 'code',
					},
					{
						label: '图片地址',
						prop: 'imgUrl',
						width:'350px',
						type: 'img',
						imgheight:'40px'
					},
					{
						label: '状态',
						prop: 'statusMany'
					},
					{
						label: '是否推荐 ',
						prop: 'groomMany'
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
				basic.brand("PAGE", this.listQuery).then(res => {
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
				basic.brand("DELETE",listids).then(res => {
					console.log(JSON.stringify(res.data));
					
					if(res.meta.success == false){
						
						this.$message({ message: '当前品牌已被使用,不能删除!',type: "warning" });
						//this.$message({ message: res.meta.message,type: "warning" });
						return;
					}
					
					this.$message({type: 'success',message: '删除成功!'});
					this.init();
				});
			}
		}
	}
</script>
