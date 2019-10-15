<template>
	<el-dialog title="指定卡券方案" :visible="ishow" center width="90%" @open="openinit" @close="closedialog" class="eidt_body">
		<el-row class="btn" >
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" v-on:click="onSubmit()" >
					<i class="u-icon fa fa-add s-green"></i><span>确定</span>
				</button>
			</el-col>
		</el-row>
		<el-row class="topsercah">
			<el-form :inline="true" class="el-form-class" :model="listQuery">
				<el-form-item label="卡券名称">
					<el-input v-model="listQuery.keyword" placeholder="卡券名称"></el-input>
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
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id,
				multipleSelection : state => state.toolslist.multipleSelection,
				params : state => state.toolslist.params
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
						prop: 'id',
						width:'60px',
					},
					{
						label: '卡券名称',
						prop: 'name',
					},
					{
						label: '价值(元)',
						prop: 'cardMoney',
					},
					{
						label: '最低消费',
						prop: 'minMoney',
					},
					{
						label: '领取限制',
						prop: 'limit',
					},
					{
						label: '库存',
						prop: 'stockCnt',
					},
					{
						label: '有效期',
						prop: 'indateString',
						width:'350px',
					},
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					status:1,
					pageSize:20,
					pageNum:1
				},
				myHeight: (window.innerHeight - 540) + 'px' ,
			}
		},

		methods: {
			...mapActions({
				setdialoghidden: "setdialoghidden",
				setbrandPick:"setbrandPick",
				setMultipleSelection:"setMultipleSelection",
				setparams:"setparams"
			}),
			closedialog() {
				this.setdialoghidden();
			},
			 openinit(){
					card.planBackUp("/pageByPutIn", this.listQuery).then(res => {
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
				this.setbrandPick(val.name);
				var list = [];
					list.push({id:val.id});
					if(list == null || list.length == 0)
					{
						this.$message({message:'请选择卡券',type:'warning'});
						return;
					}else
						{
							//this.setMultipleSelection(list);
							//this.setparams(list);
							this.$set(this.params,"cardPlanList",list );
							this.setdialoghidden();
						}
			},
			onSubmit() {
				var that = this;
				var list = that.multipleSelection;
				var timestampNow=new Date().getTime();
				if (list.length == 0) {
					this.$message({
						message: '请选择要投放的卡券方案!',
						type: 'warning'
					});
					return;
				}else if (list.length > 1) {
					that.$message({
						message: "只能选择一个卡券方案",
						type: "warning"
					});
					return;
				}else if (timestampNow > list[0].endTime) {
					that.$message({
						message: "该卡券已过期",
						type: "warning"
					});
					return;
				}else if (list[0].stockCnt <= 0) {
					that.$message({
						message: "该卡券库存为0",
						type: "warning"
					});
					return;
				}else{
					var name=list[0].name;
					this.setbrandPick(name);
					//this.setMultipleSelection(list);
					//this.setparams(list);
					this.$set(this.params,"cardPlanList",list );
					this.setdialoghidden();
				}	
				
			}, 
			
		}
	}
</script>



