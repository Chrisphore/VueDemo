<template>
	<el-dialog title="合并订单" :visible="ishow" center width="60%" @open="openinit" @close="closedialog" class="eidt_body">
		<el-row class="btn" >
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" v-on:click="onSubmit()" >
					<i class="u-icon fa fa-add s-green"></i><span>合并</span>
				</button>
			</el-col>
		</el-row>
		<div>
			<el-row>
				<el-col :span="24">
					<div class="bootomclas">
						<list-data ref="childrenlist" :columndata="columndatas" :bindata="listdata" headHeight="350" :isMultipleSelection="false"></list-data>
					</div>
				</el-col>
			</el-row>
		</div>
		
	</el-dialog>
</template>

<script>
	import order from '@/api/order';
	import { mapState, mapActions } from "vuex";
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import selectlist from "@/components/toolselect";
	
	export default {
		components: {
			'list-data': list,
			'tools-page':toolspage,
			"select-list": selectlist
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
						label: '订单号',
						prop: 'orderNo',width:'200',
					},
					{
						label: '下单时间',
						prop: 'createTime',width:'180',
						type:'ymd'
					},
					{
						label: '来源',
						prop: 'sourceName',width:'120',
					},
					{
						label: '客户名称',
						prop: 'khName',width:'120',
					},
					{
						label: '送货地址',
						prop: 'address'
					},
					{
					  label: "卡券名称",
					  width: "120",
					  prop: "cardName"
					},
				],
				listdata: null,
				listLoading: true,
				listQuery: {
					id:-1,
					keyword: '',
				},
				headHeight:0
			}
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id
			})
		},
		methods: {
			...mapActions({
				setdialoghidden: "setdialoghidden"
			}),
			closedialog() {
				this.setdialoghidden();
			},
			openinit(){
				this.listQuery.id = this.id;
				let that = this;
				order.queryMerge(that.listQuery).then(res => {
					that.listdata = res.data;
				})
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.openinit();
			},
			onSubmit() {
				var that = this;
				var list = that.$refs.childrenlist.multipleSelection;
				if(list == null || list.length < 2)
				{
					that.$message.warning('请选择要合并的订单!');
				}else
				{
					let ids = "";
					for (let i = 0; i < list.length; i++) {
						ids = ids + "," + list[i].id;
					}
					if (ids.length > 0) {
						ids = ids.substring(1);
					}
					let listids = {'mergeIds':ids};
					order.merge(listids).then(res => {
						if(res.meta.success)
						{
							that.$message.success('合并成功');
							this.$parent.init();
							this.setdialoghidden();
						}else
						{
							let mes = res.meta.message +'合并失败!';
							that.$message.error(mes);
						}
					});
				}
				
			},
			
		}
	}
</script>
