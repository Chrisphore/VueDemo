<template>
	<el-dialog title="指定商品编辑" :visible="ishow" center width="70%" @open="openinit" @close="closedialog" class="eidt_body">
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
					<el-form-item label="商品名称">
						<el-input v-model="listQuery.keyword" placeholder="商品名称"></el-input>
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
			<el-col :span="24">
				<div class="block">
					<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
				</div>
			</el-col>
		</el-row>
		</el-dialog>
</template>

<script>
	import card from '@/api/card';
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	import editbtn from '@/components/editbtn';
	
	export default {
		components: {
			'list-data': list,
			'tools-page':toolspage,
			'btn-tools': editbtn
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow1,
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
						prop: 'goodsCode',
						width:'200px',
					},
					{
						label: '商品名称',
						prop: 'goodsName',
						width:'550px'
					},
					{
						label: '型号规格',
						prop: 'typeSpecification',
					},
					{
						label: '条码',
						prop: 'barCode',
					},
					{
						label: '品牌',
						prop: 'brandId',
					},
					
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					pageSize:20,
					pageNum:1
				},
				 myHeight: (window.innerHeight - 450) + 'px' ,
			}
		},
		methods: {
			...mapActions({
				setdialoghidden1: "setdialoghidden1",
				setgoodsPick:"setgoodsPick",
				setMultipleSelection:"setMultipleSelection"
			}),
			closedialog() {
				this.setdialoghidden1();
			},
			 openinit(){
					card.plangoods("PAGE", this.listQuery).then(res => {
						this.total = res.data.total;
						this.listdata = res.data.list;
						
					})
				
			}, 
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.openinit();
			},
			rowdblclick(val){
				this.setgoodsPick(val.goodsName);
				var list = [];
					list.push({goodsId:val.goodsId});
					if(list == null || list.length == 0)
					{
						this.$message({message:'请选择要指定的品牌',type:'warning'});
					}else
						{
							this.setMultipleSelection(list);
							this.setdialoghidden1();
						}
			},
			onSubmit() {
				 var that = this;
				 var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					 this.$message({message:'请选择要指定的商品',type:'warning'});
				}else
					{
						let names="";
						for(let i=0; i<list.length; i++)
						{
							names=names + list[i].goodsName+ ",";
						}
					  this.setgoodsPick(names);
					  this.setMultipleSelection(list);
					  this.setdialoghidden1();
					}
			}, 
			
		}
	}
</script>



