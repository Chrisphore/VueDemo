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
					<el-form-item label="文章作者">
						<el-input v-model="listQuery.author" placeholder="文章作者"></el-input>
					</el-form-item>
					<el-form-item label="文章分类">
						<el-select clearable v-model="listQuery.parentList" placeholder="请选择">
							<el-option-group
								v-for="group in parentLists"
								:key="group.label"
								:label="group.label">
								<el-option
									v-for="item in group.options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-option-group>
						</el-select>
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
		<articledetail-edit></articledetail-edit>
	</div>
</template>
<script>
	import basic from '@/api/basic';
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import articledetailedit from './articledetailedit';
	
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'list-data': list,
			'tools-page':toolspage,
			"articledetail-edit": articledetailedit
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
						label: '文章标题',
						prop: 'title',
					},
					{
						label: '文章作者',
						prop: 'author'
					},
					{
						label: '文章来源',
						prop: 'source'
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
					author: null,
					pageSize:20,
					pageNum:1,
					parentList: null
				},
				headHeight: 0,
				parentLists: null
			}
		},
		created() {
			this.init();
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight;
			// console.log(this.headHeight);
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid",
				setMultipleSelection: "setMultipleSelection"
			}),
			init() {
				this.setMultipleSelection("");
				basic.articledetail("PAGE", this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
				//获取文章分类列表
				basic.articlecatfind("GET", this.listQuery).then(res => {
					this.parentLists = res.data;
				})
			},
			search() {
				this.listQuery.pageNum=1;
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
				basic.articledetail("DELETE",listids).then(res => {
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
