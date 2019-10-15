<template>
	<div>
		<div ref="head">
			<div class="topBtn">
				<btn-custom :btnType="2" :custombtn="custombtn" :customrightbtn="custombtnright"></btn-custom>
			</div>
			
			<el-row class="topsercah" style="margin: 5px;width: 99%;">
				<el-form :inline="true" class="el-form-class" :model="listQuery" >
					<el-form-item label="卡券名称">
						<el-input v-model="listQuery.keyword" placeholder="卡券名称"></el-input>
					</el-form-item>
					<el-button type="info" v-on:click="query" plain class="queryBtn">查询</el-button>
					<el-tabs v-model="statusName" @tab-click="statusClick">
						<el-tab-pane label="所有优惠券" name="3"></el-tab-pane>
						<el-tab-pane label="未开始" name="0"></el-tab-pane>
						<el-tab-pane label="进行中" name="1"></el-tab-pane>
						<el-tab-pane label="已结束" name="2"></el-tab-pane>
					</el-tabs>
				</el-form>
			</el-row>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas" style="margin: 5px;width: 99%;">
					<list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick" :headHeight="headHeight"></list-data>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize" :currentpage="listQuery.pageNum"></tools-page>
				</div>
			</el-col>
		</el-row>
		<plan-edit></plan-edit> 
		<card-qrcode></card-qrcode>
	</div>
</template>
<script>
	import card from '@/api/card';
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import planedit from './planedit';
	import { mapState, mapActions } from "vuex";
	
	import toolsbtncustom from "@/components/toolsbtncustom";
	import cardqrcode from "@/views/card/cardQrcode";
	
	export default {
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id,
				multipleSelection : state => state.toolslist.multipleSelection
			})
		},
		components: {
			'list-data': list,
			'tools-page':toolspage,
			"plan-edit": planedit,
			"btn-custom": toolsbtncustom,
			"card-qrcode": cardqrcode

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
						label: '优惠券名称',
						prop: 'name',
					},
					{
						label: '同步微信',
						prop: 'syncwxMany'
					},
					{
						label: '价值(元)',
						prop: 'cardMoney'
					},
					{
						label: '状态',
						prop: 'statusMany'
					},
					{
						label: '最低消费',
						prop: 'minMoney'
					},
					{
						label: '领取限制',
						prop: 'limit'
					},
					{
						label: '卡券数量',
						prop: 'cardCnt'
					},
					{
						label: '开始时间',
						prop: 'starTime',
						type:'ymd',
						width:'180px'
					},
					{
						label: '结束时间',
						prop: 'endTime',
						type:'ymd',
						width: '180px'
					},
					{
						label: '库存数',
						prop: 'stockCnt'
					},
					{
						label: '领用数',
						prop: 'collarCnt'
					},
					{
						label: '使用数',
						prop: 'useCnt'
					}
				],
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					keyword: '',
					status:null,
					pageSize:20,
					pageNum:1
				},
				headHeight:0,
				statusName: '3',
				custombtn: [
					{
						name: "新增",
						icoName: " fa-add s-green",
						fnHandler: "$parent.redirtUrl()"
					},
					{
						name: "编辑",
						icoName: "edit s-green",
						fnHandler: "$parent.modify_click()"
					},
					{
						name: "删除",
						icoName: "delete s-green",
						fnHandler: "$parent.del_clickIf()"
					}
				],
				custombtnright: [
					 {
					  name: "二维码",
					  fnHandler: "$parent.clickGetCardQrcode()"
					},
					/* {
					  name: "结束",
					  fnHandler: "$parent.clickUpdateStatus(2)"
					},
					{
					  name: "开始",
					  fnHandler: "$parent.clickUpdateStatus(1)"
					},
					{
					  name: "未开始",
					  fnHandler: "$parent.clickUpdateStatus(0)"
					} */ 
				]
			}
		},
/* 		created() {
			this.init();
		}, */
		activated(){
			this.init();
		},
		mounted() {
			this.headHeight = this.$refs.head.offsetHeight+55;
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid",
				setparms: "setparams"
			}),
			init() {
				card.plan("PAGE", this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
			},
			statusClick(tab, event) {
				if(tab.name=="0"){
					this.listQuery.status = 0;
					var msg = {pageSize: 20, pageNum: 1};
					this.setPage(msg);
				}else if(tab.name=="1"){
					this.listQuery.status = 1;
					var msg = {pageSize: 20, pageNum: 1};
					this.setPage(msg);
				}else if(tab.name=="2"){
					this.listQuery.status = 2;
					var msg = {pageSize: 20, pageNum: 1};
					this.setPage(msg);
				}else if(tab.name=="3"){
					this.listQuery.status = null;
					var msg = {pageSize: 20, pageNum: 1};
					this.setPage(msg);
				}
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			query() {
				this.init();
			},
			rowdblclick(val){
				this.setid(val.id);
				this.setdialogshow();
			},
			redirtUrl() {
				this.setid(0);
				this.$router.push('/card/plannew');
			},
			modify_click(){
				var that = this;
				var list = that.multipleSelection;
				if (list.length == 0) {
					this.$message({
						message: '请选择要编辑的记录!',
						type: 'warning'
					});
				}else if (list.length > 1) {
					that.$message({
						message: "只能选项一条记录进行修改",
						type: "warning"
					});
					return;
				}else{
					if(this.iscustom){
						this.$emit('mod_click',list[0].id); 
					}else{
						that.setid(list[0].id);
						that.setdialogshow();
					}
					
					
				}
			},
			del_clickIf() {
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					this.$message({
					message: '请选择要删除的记录!',
					type: 'warning'
					});
				}else
				{
					this.$confirm('确定要删除选中记录吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let ids = "";
						for (let i = 0; i < list.length; i++) {
							ids = ids + "," + list[i].id;
						}
						if (ids.length > 0) {
							ids = ids.substring(1);
						}
						//this.$emit('del_click',ids);
						this.del_click(ids);
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			del_click(ids) {
				let listids = {'ids':ids}
				card.plan("DELETE",listids).then(res => {
					console.log(JSON.stringify(res.data));
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.init();
				});
			}, 
			//选择获取卡券二维码
			clickGetCardQrcode() {
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					this.$message({
					message: '请选择要生成二维码的卡券!',
					type: 'warning'
					});
				}else if (list.length > 1) {
					that.$message({ message: "只能选择一条记录进行扫码",type: "warning" });
					return;
				}else if (list[0].status == 0) {
					that.$message({ message: "该卡券活动未开始",type: "warning" });
					return;
				}else if (list[0].endTime < new Date().getTime()) {
					that.$message({ message: "该卡券已过期",type: "warning" });
					return;
				}else if (list[0].syncwx == 1) {
					that.$message({ message: "该卡券不是微信卡券，没有二维码",type: "warning" });
					return;
				}else if (list[0].stockCnt <= 0) {
					that.$message({ message: "该卡券已无库存",type: "warning" });
					return;
				}
				else{
					var wxcardId = list[0].wxcardId;
					this.getCardQrcode(wxcardId);
				}
			},
			//获取卡券二维码
			getCardQrcode(wxcardId) {
				var that = this;
				var q = { wxcardId: wxcardId };
				
				card.planDetail("/selWxcardid",q).then(res => {
					if (res.meta.success && res.data.obj != undefined && res.data.obj != null ) {
						var show_qrcode_url = res.data.obj.show_qrcode_url;
						that.setparms({ qrcodestt: true, qrcodeimgurl: show_qrcode_url });
					}else{
						this.$message({message: '获取二维码失败!',type: 'warning'});
					}
				})
			},
			clickUpdateStatus(status){
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					this.$message({
					message: '请选择要修改状态的记录!',
					type: 'warning'
					});
				}else{
					let ids = "";
					for (let i = 0; i < list.length; i++) {
						ids = ids + "," + list[i].id;
					}
					if (ids.length > 0) {
						ids = ids.substring(1);
					}
						//let listids = {'ids':ids,'status':status},
						var p = {
							ids:ids,
							status:status
						};
						card.planBackUp("/updateByListStatus",p).then(res => {
							console.log(JSON.stringify(res.data));
							this.$message({
								type: 'success',
								message: '修改状态成功!'
							});
							this.init();
						});
				}
			}
		}
	}
</script>
