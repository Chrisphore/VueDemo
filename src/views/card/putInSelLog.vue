<template>
	<div>
		<div  ref="head">
			<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
		</div>		
	
		<el-row>
			<el-col :span="24">
				<div class="bootomclas" >
					<list-data :columndata="columndatas" :bindata="listdata" :headHeight="headHeight"></list-data>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
				</div>
			</el-col>
		</el-row>	
	</div>
</template>
<script>
	import card from '@/api/card';
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import toolsbtncustom from '@/components/toolsbtncustom';
	
	export default {
		components: {
			'list-data': list,
			'tools-page':toolspage,
			'btn-custom': toolsbtncustom,
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
						label: '投放类型',
						prop: 'putType'
					},
					{
						label: '卡券名称',
						prop: 'cardName',
					},
					{
						label: '投放条件',
						prop: 'condition',
						width:'420px'
					},
					{
						label: '投放时间',
						prop: 'createTime',
						type:'yyyy-MM-dd'
					},
					 {
						label: '投放数量/使用数量',
						prop: 'mergeLogNum'
					} 
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					pageSize:20,
					pageNum:1
				},
				headHeight:0,
				custombtn: [{ name: '返回',icoName:"back s-blue",fnHandler: 'return_click("/card/putInType")'}],
			}
		},
/* 		created() {
			this.init();
		}, */
		activated(){
			this.init();
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight;
			// console.log("----"+this.headHeight);
		},
		 computed: {
		}, 
		methods: {
			getBack() {
				this.$router.push('/card/putInType'); 
			}, 
			init() {
				card.log("/pageByLogGuid",this.listQuery).then(res => {
					
					this.total = res.data.total;
					this.listdata = res.data.list;
					
				})
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
		}
	}
</script>
