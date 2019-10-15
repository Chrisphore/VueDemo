<template>
	<div style="height: 99%;margin: 5px;">
		<div class="topBtn">
			<btn-custom :btnType="2" :custombtn="custombtn" :customrightbtn="customrightbtn"></btn-custom>
		</div>
		<div ref="head"  class="topsercah1">
			<el-form ref="form" :model="form" label-width="120px" class="editForm">
				<br/>
				<el-row>
					<el-col :span="6">
						<el-form-item label="订单号:">
							<label>{{ form.orderNo }}</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="订单状态:">
							<label>{{ form.statusName }}</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="销售单号:">
							<label>{{ form.saleNo }}</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="送货日期:">
							<label>{{ form.deliverDate }}</label>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="客户名称:">
							<label>{{ form.khName }}</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="来源:">
							<label>{{ form.sourceName }}</label>
						</el-form-item>
					</el-col>

					<el-col :span="6">
						<el-form-item label="联系人:">
							<label>{{ form.recevier }}</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系电话:">
							<label>{{ form.phone }}</label>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						<el-form-item label="地址:">
							<label>{{ form.address }}</label>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="支付状态:">
							<label>
								<font color="red">{{ form.payStatusName }}</font>
							</label>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4">
						<el-form-item label="仓库:">
							<tool-select ref="store" pcode="1" :code="form.storeId" type="3">
							</tool-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="业务员:">
							<tool-select ref="employee" pcode="1" :code="form.employeeId" type="5">
							</tool-select>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="销售开单日期:">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.orderDate" value-format="timestamp"></el-date-picker>
							<el-time-picker placeholder="选择时间" v-model="form.orderDate" value-format="timestamp"></el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="物流方式:">
							<tool-select ref="logistics" pcode="7" :code="form.logisticsId" type="6">
							</tool-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						<el-form-item label="备注:">
							<el-input v-model="form.summary"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas">
					<el-table :data="listdata"
						border
						show-summary
						:summary-method="getSummaries"
						highlight-current-row
						tooltip-effect="dark"
						class="el-table-class"
						:row-class-name="tableRowClassName"
						@selection-change="handleSelectionChange" 
						@row-click="rowclick"
						:height="myHeight"
						ref="listTalbe">
							<el-table-column prop="id" label="主键" type='selection' width="120" align='center'>
							</el-table-column>
							<el-table-column prop="goodsCode" label="商品编号" fixed width="120">
							</el-table-column>
							<el-table-column prop="goodsName" label="商品名称" fixed width="240" :formatter="titleFormat">
							</el-table-column>
							<el-table-column prop="barCode" label="条码" width="120">
							</el-table-column>
							<el-table-column prop="packingSpecification" label="包装规格"  width="120">
							</el-table-column>
							<el-table-column label="散售价" width="120">
								 <template slot-scope="scope">
									<template v-if="scope.row.saleIPName">
										<el-input class="edit-input" v-model="scope.row.spPrice" @blur="isNotShow(scope.row)" @change="bindinputcalc(scope.row)"></el-input>
									</template>
									<div v-else>{{ scope.row.spPrice}}</div>
								</template>
						</el-table-column>
						<el-table-column label="件售价" width="120">
								<template slot-scope="scope">
									<template v-if="scope.row.saleIPName">
										<el-input class="edit-input" v-model="scope.row.ipPrice" @blur="isNotShow(scope.row)" @change="bindinputcalc(scope.row)"></el-input>
									</template>
									<div v-else>{{ scope.row.ipPrice}}</div>
								</template>
						</el-table-column>
						<el-table-column label="散数" width="120">
								<template slot-scope="scope">
									<template v-if="scope.row.saleIPName">
										<el-input class="edit-input" v-model="scope.row.spcnt" @blur="isNotShow(scope.row)" @change="bindinputcalc(scope.row)"></el-input>
									</template>
									<div v-else>{{ scope.row.spcnt}}</div>
								</template>
						</el-table-column>
						<el-table-column label="件数" width="120">
								<template slot-scope="scope">
									<template v-if="scope.row.saleIPName">
										<el-input class="edit-input" v-model="scope.row.ipcnt" @blur="isNotShow(scope.row)" @change="bindinputcalc(scope.row)"></el-input>
									</template>
									<div v-else>{{ scope.row.ipcnt}}</div>
								</template>
						</el-table-column>
						<el-table-column prop="totalMoney" label="金额"  width="150">
						</el-table-column>
						<el-table-column prop="summary" label="备注"  width="120">
						</el-table-column>
						<el-table-column prop="lastspPrice" label="上次散售价"  width="120">
						</el-table-column>
						<el-table-column prop="lastipPrice" label="上次件售价"  width="120">
						</el-table-column>
						<el-table-column prop="lastOrderDate" label="上次销售时间"  width="180" :formatter="formatDate">
						</el-table-column>
						<el-table-column prop="discount" label="促销"  width="120">
						</el-table-column>
						<el-table-column prop="isStock" label="库存数" width="120">
						</el-table-column>
						<el-table-column prop="storeName" label="仓库"  width="120">
						</el-table-column>
						<el-table-column prop="orderTypeName" label="订单类型"  width="120">
						</el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<el-row style="margin: 10px;font-size: 13px;text-align: right;">
			<el-col :span="24">*商品记录颜色说明:
				<font color="red">红色</font>-亏本
				<font color="#808080">灰色</font>-跟踪售价
				<font color="#BBD69D">绿色</font>-促销
				<font color="#4D90E0">蓝色</font>-库存不足
				<font style="text-decoration:line-through">字体删除线</font>:代表该行商品已删除
			</el-col>
		</el-row>
		<div class="flow">
			<div v-for="item in flowlist">
				<div :class="item.styleName" @click="fnHandler(item.fnHandler)"><div class="middleNum">{{item.middleNum}}</div></div>
				<div style="float: left;">
					<p class="mainTitle">{{item.statusName}}</p>
					<p class="subTitle">{{item.subName}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import order from '@/api/order';
	import toolsbtncustom from '@/components/toolsbtncustom';
	import selectlist from "@/components/toolselect";
	import list from '@/components/listorder';
	import {
		mapState,
		mapActions
	} from "vuex";
	import toolselect from "@/components/toolselect";
	import * as API from '@/api/index';

	export default {
		components: {
			"tool-select": toolselect,
			'btn-custom': toolsbtncustom,
			"select-list": selectlist,
			'list-data': list
		},
		data() {
			return {
				listdata: null,
				flowlist:[],
				form: {},
				listurl:"/order/orderlist/-1",
				custombtn: [],
				customrightbtn: [],
				myHeight: "400px",
				topHeight: 1,
			}
		},
		created() {
			const that = this;
			var host = window.location.host;
			that.menutype = localStorage.getItem(host + "X-router");
			if (that.menutype == 0) {
				that.topHeight = 50;
			}
			this.init();
		},
		computed: {
			...mapState({
				multipleSelection: state => state.toolslist.multipleSelection
			})
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight+160;
			const that = this;
			window.onresize = function temp() {
				
				that.myHeight = window.innerHeight - 45 - that.headHeight - that.topHeight + "px";
			};
		},
		updated() {
			const that = this;
			that.myHeight = window.innerHeight - 45 - that.headHeight - that.topHeight + "px";
		},
		methods: {
			...mapActions({
				setMultipleSelection: "setMultipleSelection"
			}),
			init() {
				let that = this;
				order.getIdAll(that.$route.query.id).then(res => {
					that.form = res.data.obj;
					that.listdata = res.data.listDetail;
					that.flowlist = [];
					let styleName = "current";
					
					
					that.custombtn = [];
					that.customrightbtn = [];
					that.custombtn.push({ name: '返回',icoName:"back s-blue",fnHandler: 'return_click("/order/orderlist/-1")'});
					if(res.data.obj.status != 1 && res.data.listFlow.length < 3 && res.data.obj.status != 7)
					{
						that.custombtn.push({
							name: '删除商品',
							icoName: "delete s-green",
							fnHandler: 'del_click("/goods/ordersDetail")'
						});
						
						that.customrightbtn.push({
							name: '取消订单',
							fnHandler: '$parent.del_click("/goods/orders")'
						});
						
						that.customrightbtn.push({
							name: '选中库存不足商品',
							fnHandler: '$parent.checkgoods_click()'
						});
					}
					
					for(let i=0;i<6; i++)
					{
						if(res.data.listFlow.length > i)
						{
							if(res.data.listFlow[i].operaor != null)
							{
								res.data.listFlow[i].statusName = res.data.listFlow[i].statusName + "-"+res.data.listFlow[i].operaor
							}
							res.data.listFlow[i].subName = that.dateFormat(res.data.listFlow[i].createTime);
							res.data.listFlow[i].styleName = "achieve";
							
							if(i == 2 && res.data.obj.status != 7)
							{
								res.data.listFlow[i].styleName = "apply";
								res.data.listFlow[i].fnHandler = "againupdateStatus()";
							}
							
							that.flowlist.push(res.data.listFlow[i]);
							
						}else
						{
							let statusName = "";
							switch(i)
							{
								case 2:
									statusName = "审核订单";
									break;
								case 3:
									statusName = "配货中";
									break;
								case 4:
									statusName = "已发货";
									break;
								case 5:
								  statusName = "已收货";
								  break;
								
							}
							let step = i+1;
							let fnHandler = ""; 
							
							if(styleName == "current" && res.data.obj.status != 7)
							{
								fnHandler = "updateStatus("+step+")";
							}
							let row = {
								statusName:statusName,
								subName:"未开始",
								styleName:styleName,
								middleNum:step,
								fnHandler:fnHandler
							}
							that.flowlist.push(row);
							styleName = "notDone";
						}
					}
				});
			},
			checkgoods_click() {
				let rows = [];
				this.listdata.forEach(row => {
					if (row.isStock == 0) {
						rows.push(row);
					}
				});
				this.$refs.listTalbe.clearSelection();
				rows.forEach(row => {
						this.$refs.listTalbe.toggleRowSelection(row);
				});
			},
			del_click(url) {
				var that = this;
				that.$confirm('确定要取消当前订单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				let statuslist = {
					"id":that.form.id,
					"status":7
				}
				order.updateStatus(statuslist).then(res => {
						if (res.meta.success) {
							that.$message.success('取消成功');
							that.$router.push(that.listurl);
						} else {
							let mes = res.meta.message + '取消失败!';
							that.$message.error(mes);
						}
					});
				});
			},
			fnHandler(item) {
				if(item != '')
				{
					eval("this."+item);
				}
				
			},
			updateStatus(status)
			{
				var that = this;
				if (this.$refs.logistics.values != null) {
					this.form.logisticsId = this.$refs.logistics.values;
				}
				if (this.$refs.employee.values != null) {
					this.form.employeeId = this.$refs.employee.values;
				}
				if (this.$refs.store.values != null) {
					this.form.storeId = this.$refs.store.values;
				}
				if(that.form.status != 1)
				{
					that.$confirm('确定要更新当前状态吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.form.status = status;
						order.updateStatus(that.form).then(res => {
							if(res.meta.success)
							{
								that.$message.success('更新成功');
								that.init();
							}else
							{
								let mes = res.meta.message +'更新失败!';
								that.$message.error(mes);
							}
						});
					});
				}else{
					that.$message.warning("已合并订单,不能在进行修改");
				}
				
			},
			againupdateStatus()
			{
				var that = this;
				if (this.$refs.logistics.values != null) {
					this.form.logisticsId = this.$refs.logistics.values;
				}
				if (this.$refs.employee.values != null) {
					this.form.employeeId = this.$refs.employee.values;
				}
				if (this.$refs.store.values != null) {
					this.form.storeId = this.$refs.store.values;
				}
				if(that.form.status != 1)
				{
					that.$confirm('已有一个销售订单，确定要重新生成新的销售订单吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.form.status = 3;
						order.updateStatus(that.form).then(res => {
							if(res.meta.success)
							{
								that.$message.success('生成成功');
								that.init();
							}else
							{
								let mes = res.meta.message +'生成失败!';
								that.$message.error(mes);
							}
						});
					});
				}else{
					that.$message.warning("已合并订单,不能在进行修改");
				}
				
			},
			tableRowClassName({row, rowIndex}) {
					let styleName = "";
					if(row.delflag == 0)
					{
						styleName =  "delflag-row";
					}
					if(row.isWarning != null && row.isWarning == 1)
					{
						styleName = styleName + ' warning-row';
						return styleName;
					}
					if(rowIndex%2 != 0)
					{
						styleName = styleName + ' striped-row';
					}
					return styleName;
			},
			bindinputcalc(row) {
				var that = this;
			  row['totalMoney'] = row['spPrice'] * row['spcnt']  + row['ipPrice'] * row['ipcnt'];
				order.detail("PATCH", row).then(res => {
					if (res.meta.success) {
						that.$message.success('保存成功');
					} else {
						let mes = res.meta.message + '保存失败!';
						that.$message.error(mes);
					}
				});
			},
			isNotShow(row) {
				row.saleIPName = false;
			},
			rowclick: function(row) {
				if(this.form.status < 3 && this.form.status != 1 &&  row.delflag == 1)
				{
					row.saleIPName = true;
				}
			},
			formatDate(row, column, cellValue){
          return this.dateFormat(cellValue);
      },
			handleSelectionChange: function(val) {
				this.setMultipleSelection(val);
			},
			titleFormat: function (row, column, cellValue) {
					var title = cellValue;
					if (title) {
							if (title.length > 15) {
									return title.substring(0, 15) + "...";
							}
					}
			},
			getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
          }else if(index === 8)
					{
						let js = 0;
						for(var i=0;i<data.length;i++){
							if(data[i]["delflag"] === 1)
							{
								js += Number(data[i]["ipcnt"]);
							}
						}
						sums[index] = '件数：' + js;
					}else if(index === 7)
					{
						let js = 0;
						for(var i=0;i<data.length;i++){
							if(data[i]["delflag"] === 1)
							{
								js += Number(data[i]["spcnt"]);
							}
						}
						sums[index] = '散数：' + js;
						
					}else if(index === 9)
					{
						let js = 0;
						for(var i=0;i<data.length;i++){
							if(data[i]["delflag"] === 1)
							{
								js += Number(data[i][column.property]);
							}
						}
						sums[index] = '总金额：' + js.toFixed(2);
						
					}
        });

        return sums;
      },
		},
		// 销毁组件，返回刷新
		deactivated() {
			this.$destroy()
		},
	}
</script>
