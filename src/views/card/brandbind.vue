<template>
	<el-dialog title="指定品牌编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog" class="eidt_body">
		<el-row class="btn" >
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" v-on:click="onSubmit()" >
					<i class="u-icon fa fa-add s-green"></i><span>确定</span>
				</button>
			</el-col>
		</el-row>
		<el-row>
			<div class="topsercah">
				<el-form :inline="true" class="el-form-class" :model="listQuery">
					<el-form-item label="品牌名称">
						<el-input v-model="listQuery.keyword" placeholder="品牌名称"></el-input>
					</el-form-item>
					<el-button type="info" v-on:click="openinit" plain class="queryBtn">查询</el-button>
				</el-form>
			</div>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas" v-bind:style="{height: myHeight}">
					<list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick"></list-data>
				</div>
			</el-col>
		</el-row>
		</el-dialog>
</template>

<script>
	import basic from '@/api/basic';
	import list from '@/components/list'
	import { mapState, mapActions } from "vuex";
	import editbtn from '@/components/editbtn';
	
	export default {
		components: {
			'list-data': list,
			'btn-tools': editbtn
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id,
				multipleSelection : state => state.toolslist.multipleSelection
			})
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
						prop: 'code',
						width:'200px',
					},
					{
						label: '品牌名称',
						prop: 'name',
					}
				],
				listdata: null,
				listLoading: true,
				listQuery: {
					keyword: ''
				},
				 myHeight: (window.innerHeight - 450) + 'px' ,
			}
		},
		methods: {
			...mapActions({
				setdialoghidden: "setdialoghidden",
				setbrandPick:"setbrandPick",
				setMultipleSelection:"setMultipleSelection"
			}),
			closedialog() {
				this.setdialoghidden();
			},
			 openinit(){
					basic.brand("LIST", this.listQuery).then(res => {
						this.listdata = res.data;
					})
				
			}, 
			rowdblclick(val){
				this.setbrandPick(val.name);
				var list = [];
					list.push({id:val.id});
					if(list == null || list.length == 0)
					{
						this.$message({message:'请选择要指定的品牌',type:'warning'});
					}else
						{
							this.setMultipleSelection(list);
							this.setdialoghidden();
						}
			},
			onSubmit() {
				 var that = this;
				 var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					 this.$message({message:'请选择要指定的品牌',type:'warning'});
				}else
					{
						let names="";
						for(let i=0; i<list.length; i++)
						{
							names=names + list[i].name+ ",";
						}
					  this.setbrandPick(names);
						this.setMultipleSelection(list);
					  this.setdialoghidden();
					}
			}, 
			
		}
	}
</script>



