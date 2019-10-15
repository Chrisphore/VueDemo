<template>
	<div class="zscy-edit-container">
		<div class="topBtn">
			<btn-custom :btnType="1" :listurl="listurl"></btn-custom>
		</div>
		<div ref="head"  class="topsercah1">
		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br />
			<el-row>
				<el-col :span="8">
					<el-form-item label="列表名称:">
						<el-input v-model="form.menuName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="列表编码:">
						<el-input v-model="form.menuCode"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="对应表格位置:">
						<el-input v-model="form.tableLocation"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="sql语句:">
						<el-input v-model="form.tableName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="表格类型:">
						<el-select v-model="form.tableType" placeholder="请选择">
							<el-option v-for="item in tableTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>


			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="是否自定义表头:">
						<el-select v-model="form.isCustomHeadr" placeholder="请选择">
							<el-option v-for="item in isCustomHeadrOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="表格分类:">
						<select-list ref="tableLabelId" :code="form.tableLabelId" :type="17"></select-list>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="报表图标:">
						<el-input v-model="form.tableIcon"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="是否分页:">
						<el-select v-model="form.isPage" placeholder="请选择">
							<el-option v-for="item in isPageOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="每页显示数量:">
						<el-input v-model="form.pageSize"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		</div>
		
		
		<el-row>
			<el-col :span="24">
				<div class="bootomclas">
						<button class="addicon" @click="addRow()">新建列表</button>
						<v-table
										is-horizontal-resize
										style="width:100%"
										:columns="detailColumns"
										:table-data="form.listDetail"
										row-hover-color="#eee"
										row-click-color="#edf7ff"
										:cell-edit-done="cellEditDone"
										:height='300'
										:title-row-height='30'
										:row-height='30'
										@on-custom-comp="customCompFunc"
						></v-table>
				</div>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="24">
				<div class="bootomclas">
						<button class="addicon" @click="addRowSearch()">新建条件</button>
						<v-table
										is-horizontal-resize
										style="width:100%"
										:columns="searchColumns"
										:table-data="form.listSearch"
										row-hover-color="#eee"
										row-click-color="#edf7ff"
										:cell-edit-done="cellEditDoneSearch"
										:height='300'
										:title-row-height='30'
										:row-height='30'
										@on-custom-comp="customCompFuncSearch"
						></v-table>
				</div>
			</el-col>
		</el-row>
		
		
	</div>
</template>

<script>
	import basic from '@/api/basic';
	import {
		mapState,
		mapActions
	} from "vuex";
	import toolsbtncustom from "@/components/toolsbtncustom";
	import selectlist from "@/components/toolselectnew";

	export default {
		components: {
			"btn-custom": toolsbtncustom,
			"select-list": selectlist
		},
		data() {
			return {
				form: {
					"id": 0,
					"menuName": "",
					"menuCode": "",
					"tableLocation": 0,
					"tableName": "",
					"isPage": 0,
					"pageSize": 20,
					"tableType": 0,
					"tableLabelId": 0,
					"isCustomHeadr": 0,
					"tableIcon": "",
					listDetail:[],
					listSearch:[]
				},
				isPageOptions: [{
					value: 0,
					label: '分页'
				}, {
					value: 1,
					label: '不分页'
				}],
				tableTypeOptions: [{
					value: 0,
					label: '菜单表格'
				}, {
					value: 1,
					label: '报表表格'
				}, {
					value: 2,
					label: '弹框选择'
				}],
				isCustomHeadrOptions: [{
					value: 0,
					label: '否'
				}, {
					value: 1,
					label: '是'
				}],
				listurl: "/report/tableconfiglist",
				detailColumns:  [
							 {field: 'custome-adv', title: '操作',width: 60, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true},
							 {field: 'sn', title:'排序', width:80, titleAlign: 'center',columnAlign:'center',isEdit:true,type:'number',isResize:true},
							 {field: 'field', title: '字段名称',width:80,  titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
							 {field: 'headerName', title: '列名称', width:80, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
							 {field: 'width', title: '列宽度',width:80, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
							 {field: 'dataFormat', title: '数据格式',width:80,  titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
							 {field: 'formatContent', title: '格式内容',width:80,  titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
							 {field: 'color', title: '颜色',width:80, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
							 {field: 'fontSize', title: '字体大小',width:80, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
							 {field: 'calculate', title: '计算公式',width:80,  titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true}
			  ],
			  searchColumns:  [
							{field: 'custome-adv', title: '操作',width: 60, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true},
							{field: 'sort', title:'排序', width:80, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true,type:'number',required: true},
							{field: 'title', title: '名称',width:80,  titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
							{field: 'controlType', title: '类型',width:80,  titleAlign: 'center',columnAlign:'left',componentName:'select-control',isResize:true},
							{field: 'filedName', title: '对应数据库字段',width:80, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
							{field: 'dataSource', title: '数据来源',width:80,  titleAlign: 'center',columnAlign:'left',componentName:'select-source',isResize:true},
							{field: 'defaultValue', title: '默认值',width:80,  titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true}
				],					
			}
		},
		activated: function() {
			this.init();
		},
		methods: {
			init() {
				this.form = {
					"id": 0,
					"menuName": "",
					"menuCode": "",
					"tableLocation": 0,
					"tableName": "",
					"isPage": 0,
					"pageSize": 20,
					"tableType": 0,
					"tableLabelId": 0,
					"isCustomHeadr": 0,
					"tableIcon": "",
					listDetail:[],
					listSearch:[]
				};
				if (this.$route.query.id > 0) {
					basic.config("GETID", this.$route.query.id).then(res => {
						this.form = res.data.obj;
						this.form.listSearch = res.data.listSearch;
						this.form.listDetail = res.data.listDetail;
					});
				}
			},
			save_click() {
				let method = "POST";
				let that = this;
				let result = true;
				
				this.form.listDetail.forEach(function (search) {
						that.detailColumns.forEach(function (column) {
								if(column.type == 'number')
								{
									var re = /^[1-9]\d*$/;
									if (!re.test(search[column.field])) { 
										that.$message.error(column.title+":请输入数字");
										result = false;
										return false;
							　　}
								}
						});
				});
				
				this.form.listSearch.forEach(function (search) {
						that.searchColumns.forEach(function (column) {
								if(column.type == 'number')
								{
									var re = /^[1-9]\d*$/;
									if (!re.test(search[column.field])) { 
										that.$message.error(column.title+":请输入数字");
										result = false;
										return false;
							　　}
								}
						});
				});
				
				if(result)
				{
					basic.config(method, this.form).then(res => {
						if (res.meta.success) {
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
							this.$router.push('/report/tableconfiglist');
						} else {
							let mes = res.meta.message + '保存失败!';
							this.$message({
								type: 'success',
								message: mes
							});
						}
					});
				}
				
			},
			rowclick: function(row) {
				this.form.listSearch.forEach((column, index) => {
					column.edit = false;
				});
				this.form.listDetail.forEach((column, index) => {
					column.edit = false;
				});
				row.edit = true;
			},
			addRow:function()
			{
				let detail = {
					sn:'',
					field:'',
					headerName:'',
					width:'',
					dataFormat:'',
					formatContent:'',
					color:'',
					fontSize:'',
					calculate:''
				}
				this.form.listDetail.push(detail);
			},
			addRowSearch:function()
			{
				let search = {
					sort:'',
					title:'',
					controlType:'',
					filedName:'',
					dataSource:'',
					defaultValue:''
				}
				this.form.listSearch.push(search);
			},
			// 单元格编辑回调
			cellEditDone(newValue,oldValue,rowIndex,rowData,field){
				this.form.listDetail[rowIndex][field] = newValue;
				// 接下来处理你的业务逻辑，数据持久化等...
			},
			
			// 单元格编辑回调
			cellEditDoneSearch(newValue,oldValue,rowIndex,rowData,field){
				
				this.form.listSearch[rowIndex][field] = newValue;
				// 接下来处理你的业务逻辑，数据持久化等...
			},
			
			customCompFunc(params){
				this.$delete(this.form.listDetail,params.index);
      },
			
			customCompFuncSearch(params){
				console.log(params.dataSource);
				if(params.type == 'delete')
				{
					this.$delete(this.form.listSearch,params.index);
				}else if(params.type == 'source')
				{
					this.form.listSearch[params.index].dataSource = params.dataSource;
				}else if(params.type == 'control')
				{
					this.form.listSearch[params.index].controlType = params.controlType;
				}
      },
		},
	}
	
	// 自定义列组件
	Vue.component('table-operation',{
			template:`<span>
			<a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
			</span>`,
			props:{
					rowData:{
							type:Object
					},
					field:{
							type:String
					},
					index:{
							type:Number
					}
			},
			methods:{
					deleteRow(){
							// 参数根据业务场景随意构造
							let params = {type:'delete',index:this.index};
							this.$emit('on-custom-comp',params);
					}
			}
	})
	
	Vue.component('select-source',{
			template:`<span>
			<select @change="selectSource()" v-model="rowData.dataSource" style="width:100px">
				<option value="-1" >无</option>
			  <option value="1">商品类型</option>
				<option value="2">供应商类型 </option>
				<option value="3">仓库</option>
				<option value="4">客户类型</option>
				<option value="5">员工选择</option>
				<option value="6">品牌列表</option>
				<option value="7">日期类型</option>
				<option value="8">统计类型</option>
				<option value="9">分类级别</option>
				<option value="10">客户</option>
				<option value="11">员工类型</option>
				<option value="12">机构</option>
				<option value="13">会员分组</option>
				<option value="14">数量类型</option>
				<option value="15">销售类型</option>
				<option value="16">表格类型</option>
				<option value="17">表格分类</option>
			</select>
			</span>`,
			props:{
					rowData:{
							type:Object
					},
					field:{
							type:String
					},
					index:{
							type:Number
					}
			},
			methods:{
					selectSource(){
							// 参数根据业务场景随意构造
							let params = {type:'source',dataSource:this.rowData.dataSource,index:this.index};
							this.$emit('on-custom-comp',params);
					}
			}
	})
	
	Vue.component('select-control',{
			template:`<span>
			<select @change="selectSource()" v-model="rowData.controlType" style="width:100px">
				<option value="text" >文本框</option>
				<option value="date" >时间类型</option>
				<option value="select">下拉框</option>
				<option value="scategory">分类下拉框</option>
				<option value="checkbox">复选框</option>
				<option value="goods">商品列表</option>
				<option value="year">年份</option>
			</select>
			</span>`,
			props:{
					rowData:{
							type:Object
					},
					field:{
							type:String
					},
					index:{
							type:Number
					}
			},
			methods:{
					selectSource(){
							// 参数根据业务场景随意构造
							let params = {type:'control',controlType:this.rowData.controlType,index:this.index};
							this.$emit('on-custom-comp',params);
					}
			}
	})
	
	
	
</script>

