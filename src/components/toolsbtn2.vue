<template>
	<el-row class="btn">
		<el-col class="el-col-sty m-view">
			 <button class="m-btn-group" v-on:click="redirtUrl()" >
				<i class="u-icon fa fa-add s-green"></i><span>新增N</span>
			</button> 
			<button class="m-btn-group"  v-on:click="modify_click()" round>
				<i class="u-icon fa fa-edit s-green"> </i><span>编辑</span>
			</button>
			<button class="m-btn-group" v-on:click="del_click()" round>
				<i class="u-icon fa fa-delete s-green"></i><span> 删除</span>
			</button>
		</el-col>
	</el-row>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	
	export default {
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id,
				multipleSelection : state => state.toolslist.multipleSelection
			})
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid"
			}),
			 redirtUrl() {
				this.setid(0);
				this.$router.push('/card/plannew');
			}, 
			modify_click(){
				var that = this;
				var list = that.multipleSelection;
				if (list.length == 0) {
					this.$message({
						message: '请选择要编辑的记录!',
						type: 'warning'
					});
					return;
				}else if (list.length > 1) {
					that.$message({
						message: "只能选项一条记录进行修改",
						type: "warning"
					});
					return;
				}else{
					if(this.iscustom){
						this.$emit('mod_click',list[0].id); 
					}else{
						that.setid(list[0].id);
						that.setdialogshow();
					}
					
					
				}
			},
			del_click() {
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					this.$message({
					message: '请选择要删除的记录!',
					type: 'warning'
					});
				}else
				{
					this.$confirm('确定要删除选中记录吗?', '提示', {
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
						this.$emit('del_click',ids);
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				
			}
		}
	};
</script>
<style>
	.el-col-sty {
		padding: 5px;
	}

	.btn {
		background: #F0F0F0;
	}
</style>
