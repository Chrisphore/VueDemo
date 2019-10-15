<template>
	<el-dialog title="请选择禁售商品" :visible="ishow" center width="60%" @open="init" @close="closedialog">
		<div>
			<el-row>
				<el-col :span="24">
					<div class="bootomclas"  style="margin-top:5px">
						<list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick"></list-data> 
					</div>
				</el-col>
				<el-col :span="24">
					<div class="block">
						<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
					</div>
				</el-col>
			</el-row>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="info" class="eidtButton" @click="closedialog" plain>取消</el-button>
			<el-button type="warning" class="eidtButton" @click="onSubmit">保存</el-button>
		</div>
	</el-dialog>
</template>
<script>
	import goods from "@/api/goods";
	import API from "@/api/member"
	import toolsbtn from '@/components/toolsbtn'
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import { mapState, mapActions } from "vuex";
	
	export default {
		components: {
			'btn-tools': toolsbtn,
			'list-data': list,
			'tools-page':toolspage,
		},
		computed: {
			...mapState({
				multipleSelection : state => state.toolslist.multipleSelection,
				ishow: state => state.toolslist.dialogshow1,
				id: state => state.toolslist.id
			})
		},
		data() {
			return {
				columndatas: [{
						label: '主键',
						prop: 'goodsId',
						type: 'selection',
						align: 'center'
					},
					{
						label: '图片',
						prop: 'picture',
						type:'img'
					},
					{
						label: '商品编号',
						prop: 'goodsCode',
					},
					{
						label: '名称',
						prop: 'goodsName',
					},
					{
						label: '条形码',
						prop: 'barCode',
					},
					{
						label: '实际销量',
						prop: 'factSell'
					},
					{
						label: '状态',
						prop: 'statusName'
					}
					
				],
				listdata: [],
				total:0,
				listLoading: true,
				listQuery: {
					pageSize:20,
					pageNum:1,
					memberGroupId: 0
				},
				form:{
					memberGroupId: 0,
					goodsIds:''
				}
			}
		},
		
		methods: {
			...mapActions({
				setdialoghidden1: "setdialoghidden1",
				setMultipleSelection: "setMultipleSelection"
			}),
			
			init() {
				this.listQuery.memberGroupId = this.id;
				goods.release("PAGE", this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
				
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			closedialog() {
				this.setdialoghidden1();
			},
			rowdblclick(val){
				
			},
			
			onSubmit() {
				var that = this;
				var list = that.multipleSelection;
				let ids = "";
				for (let i = 0; i < list.length; i++) {
					ids = ids + "," + list[i].goodsId;
				}
				if (ids.length > 0) {
					ids = ids.substring(1);
				}
				
				let url = "/goods/remove/batchSave";
				that.form.memberGroupId = that.id;
				that.form.goodsIds = ids;
				console.log(that.form);
				API.goodsremove("GET", url, that.form).then(res => {
					if (res.meta.success) {
						that.$message({
							message: "添加成功",
							type: "success"
						});
						that.$parent.init();
						that.setdialoghidden1();
						that.setMultipleSelection(null);
					} else {
						console.log(res);
						that.$message.error("添加失败");
					}
				})
				
				this.setdialoghidden1();
			},
			
			
		}
	}
</script>
<style scoped lang="scss">
	.btn.mt10.el-row{margin-top:5px;}
</style>
