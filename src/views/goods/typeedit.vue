<template>
	<el-dialog title="添加商品类型" :visible="ishow" center width="40%" @open="openinit" @close="closedialog" class="eidt_body">
		<el-row class="btn" >
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" v-on:click="onSubmit()" :disabled="isDisable">
					<i class="u-icon fa fa-add s-green"></i><span>增加N</span>
				</button>
			</el-col>
		</el-row>
		<div>
		<el-tree ref="tree" node-key="id" :check-strictly="true" :show-checkbox="true" :default-expand-all="true" :data="data" :props="defaultProps" 
		style="height: 400px;overflow-y: auto;"></el-tree>
		</div>
	</el-dialog>
</template>

<script>
	import basic from '@/api/basic';
	import goods from '@/api/goods';
	import editbtn from '@/components/editbtn';
	import { mapState, mapActions } from "vuex";
	
	export default {
		components: {
			'btn-tools': editbtn
		},
		data() {
			return {
				data: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				isDisable:false
			}
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow1
			})
		},
		methods: {
			...mapActions({
				setdialoghidden1: "setdialoghidden1"
			}),
			closedialog() {
				this.setdialoghidden1();
			},
			openinit(){
				this.isDisable = false;
				this.data = [];
				goods.typeGoods("GET", "").then(res => {
					this.data = this.dataToTree(res.data,"id");
					goods.typeRelease("LIST", "","").then(res1 => {
						
						let ids = [];
						for (let i = 0; i < res1.data.length; i++) {
							
							ids.push(res1.data[i].typeId);
						}
						this.$refs.tree.setCheckedKeys(ids);
					});
				})
			},
			onSubmit() {
				this.isDisable = true;
				const that = this;
				var len = that.$refs.tree.getCheckedNodes().length;
				if(len > 0)
				{
					let list = [];
					for(let i=0;i<len;i++)
					{
						list.push(that.$refs.tree.getCheckedNodes()[i].id);
					}
					goods.typeRelease("POST",list,"/addList").then(res => {
						if(res.meta.success)
						{
							that.$message.success('保存成功');
							that.$parent.$parent.init();
							that.setdialoghidden1();
						}else
						{
							this.isDisable = false;
							let mes = res.meta.message +'保存失败!';
							that.$message.error(mes);
						}
					});
				}else{
					this.isDisable = false;
					that.$message.warning('没有选择商品类型');
				}
				
			},
			
		}
	}
</script>