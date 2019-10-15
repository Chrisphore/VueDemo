<template>
	<el-dialog title="添加商品" :visible="ishow" center width="60%" @open="openinit" @close="closedialog" class="eidt_body">
		<el-row class="btn" >
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" v-on:click="onSubmit()" >
					<i class="u-icon fa fa-add s-green"></i><span>增加N</span>
				</button>
			</el-col>
		</el-row>
		<el-row class="topsercah">
			<el-form :inline="true" class="el-form-class" :model="listQuery">
				<el-col>
					<el-form-item label="商品名称">
						<el-input v-model="listQuery.keyword" placeholder="商品名称"></el-input>
					</el-form-item>
					<el-form-item label="条形码">
						<el-input v-model="listQuery.barCode" placeholder="条形码"></el-input>
					</el-form-item>
					<el-form-item label="型号">
						<el-input v-model="listQuery.typeSpecification" placeholder="型号"></el-input>
					</el-form-item>
					<el-button type="info" v-on:click="openinit" plain class="queryBtn">查询</el-button>
				</el-col>
				<el-col> 
					<el-form-item label="品牌">
						<select-list ref="brand" pcode="" code="" type="4">
						</select-list>
					</el-form-item>
					
				</el-col>
			</el-form>
		</el-row>
		<div>
			<el-row>
				<el-col :span="24">
					<div class="bootomclas">
						<list-data ref="listGoods" :columndata="columndatas" :bindata="listdata" headHeight="350"></list-data>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="block">
						<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
					</div>
				</el-col>
			</el-row>
		</div>
		
	</el-dialog>
</template>

<script>
	import goods from '@/api/goods';
	import editbtn from '@/components/editbtn';
	import { mapState, mapActions } from "vuex";
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import selectlist from "@/components/toolselect";
	
	export default {
		components: {
			'btn-tools': editbtn,
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
						label: '商品编号',
						prop: 'goodsCode',
						width:150
					},
					{
						label: '名称',
						prop: 'goodsName',
					},
					{
						label: '条形码',
						prop: 'barCode',
						width:150
					},
					{
						label: '型号',
						prop: 'typeSpecification',
						width:200
					},
					{
						label: '单位',
						prop: 'largeUnit',
						width:100
					}
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					pageSize:20,
					pageNum:1,
					barCode:'',
					typeSpecification:''
				},
				headHeight:0
			}
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow
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
				goods.notRelease(this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.openinit();
			},
			onSubmit() {
				var that = this;
				var list = this.$refs.listGoods.multipleSelection;
				if(this.$refs.brand.values.length == 0)
				{
					that.$message.warning('请选择商品所属品牌!');
					return;
				}
				if(list == null || list.length == 0)
				{
					that.$message.warning('请选择要添加的商品!');
				}else
				{
					console.log(list);
					let listcon = [];
					for (let i = 0; i < list.length; i++) {
						listcon.push({"goodsId":list[i].goodsId,"brandId":this.$refs.brand.values,"typeId":list[i].typeId});
					}
					goods.release("POST",listcon).then(res => {
						if(res.meta.success)
						{
							that.$message.success('保存成功');
							this.$parent.init();
							this.setdialoghidden();
						}else
						{
							let mes = res.meta.message +'保存失败!';
							that.$message.error(mes);
						}
					});
				}
				
			},
			
		}
	}
</script>
