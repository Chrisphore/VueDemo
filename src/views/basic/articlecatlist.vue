<template>
	<div>
		<div ref="head">
			<el-row>
				<div class="topBtn">
					<el-row class="btn">
						<el-col class="el-col-sty m-view">
							<button class="m-btn-group"  v-on:click="redirtUrl()">
								<i class="u-icon fa fa-add s-green"></i><span>新增N</span>
							</button>
							<button class="m-btn-group" v-on:click="modify_click()"  round>
								<i class="u-icon fa fa-edit s-green"> </i><span>编辑</span>
							</button>
							<button class="m-btn-group" v-on:click="del_click()" round>
								<i class="u-icon fa fa-delete s-green"></i><span> 删除</span>
							</button>
						</el-col>
					</el-row>
				</div>
			</el-row>
			
			<el-row>
				<div class="topsercah">
					<el-form :inline="true" class="el-form-class" :model="listQuery">
						<el-form-item label="">
							<el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</el-row>
		</div>
		
		<el-row>
			<el-col :span="24">
				<div class="bootomclas">
					<el-tree :data="data" node-key="id" :highlight-current="true"
									 :props="defaultProps" default-expand-all
									 :filter-node-method="filterNode" @node-click="handleNodeClick"
							      ref="tree" :expand-on-click-node="false">
					</el-tree>
				</div>
			</el-col>
		</el-row>
		<articlecat-edit></articlecat-edit>
	</div>
</template>
<script>
	import basic from '@/api/basic';
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import articlecatedit from './articlecatedit.vue'
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'articlecat-edit': articlecatedit
		},
		data() {
			return {
				data: null,
				filterText: '',
				listQuery: {},
				myHeight: (window.innerHeight - 220) + 'px',
				defaultProps: {
				  children: 'children',
				  label: 'label'
				},
				parentId:0,
				headHeight:0,
				articlecat: null
			};
		},
		created() {
			this.init();
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight;
			// console.log(this.headHeight);
		},
		
		watch: {
		  filterText(val) {
			this.$refs.tree.filter(val);
		  }
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid"
			}),
			//初始化
			init() {		
				basic.articlecattree("GET", this.listQuery).then(res => {
					this.data = res.data;
				})
			},
			//点击节点触发事件
			handleNodeClick(data) {
        console.log(data);
      },
			//关键字过滤
			filterNode(value, data) {
				if (!value) 
				  return true;
				return data.label.indexOf(value) !== -1;
			},
			//新增按钮事件
			redirtUrl() {
				let _this = this;
				if(_this.$refs.tree.getCurrentNode() != null)
				{
					_this.parentId = _this.$refs.tree.getCurrentNode().id;
					basic.articlecat("GETID", _this.$refs.tree.getCurrentNode().id).then(res => {
						if(res.meta.success)
						{
							if(res.data.obj.level >= 2)
							{
								_this.$message({
									message: "只能设置二级分类",
									type: "warning"
								});
							}else {
								_this.setid(0);
								_this.setdialogshow();
							}
							
						}
					});
				}else{
					_this.setid(0);
					_this.setdialogshow();
				}
				
			},
			//修改按钮事件
			modify_click(){
				if(this.$refs.tree.getCurrentNode() == null)
				{
					this.$message({
						message: "请选择需要编辑的节点",
						type: "warning"
					});
					return;
				}
				basic.articlecat("GETID", this.$refs.tree.getCurrentNode().id).then(res => {
					 if(res.meta.success)
					 {
						 if(res.data.obj.articlecatType == 0)
						 {
							 this.$message({
							 	message: "当前文章分类节点为系统默认,不可编辑!",
							 	type: "warning"
							 });
						 }else{
							 this.setid(this.$refs.tree.getCurrentNode().id);
							 this.setdialogshow();
						 }
					 }
				});
				
			},
			
			//删除按钮事件
		  del_click() {
			  if(this.$refs.tree.getCurrentNode() == null)
			  {
			  	this.$message({
			  		message: "请选择需要删除的节点",
			  		type: "warning"
			  	});
			  	return;
			  }else
				{
					basic.articlecat("GETID", this.$refs.tree.getCurrentNode().id).then(res => {
						if(res.meta.success)
						{
							if(res.data.obj.articlecatType == 0)
							{
								this.$message({
									message: "当前文章分类节点为系统默认,不可删除!",
									type: "warning"
								});
								
							}else{
								this.$confirm('确定要删除选中的节点及其所有子节点吗?', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									let ids = this.$refs.tree.getCurrentNode().id + "";
									let listids = {'ids':ids}
									basic.articlecat("DELETE",listids).then(res => {
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
						}
					});
					
				}
				
		  }
		}
	};
</script>
