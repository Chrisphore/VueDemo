<template>
	<div style="margin: 5px;">
		<div class="topBtn">
			<btn-custom :btnType="2" :custombtn="custombtn" :customrightbtn="customrightbtn"></btn-custom>
		</div>
		<el-container>
			<el-aside width="70%">
					<div ref="head" style="width: 99%">
							<el-row>
								<div class="topsercah">
									<el-form :inline="true" class="el-form-class" :model="listQuery" >
										<el-form-item label="查询" >
												<span class="demonstration"></span>
												<el-date-picker
												v-model="listQuery.smallDate"
												type="date"
												placeholder="选择日期" style="width: 145px;">
												</el-date-picker>
										</el-form-item>
										
										<el-form-item label="至" >
												<span class="demonstration"></span>
												<el-date-picker
												v-model="listQuery.bigDate"
												type="date"
												placeholder="选择日期" style="width: 145px;">
												</el-date-picker>
										</el-form-item>
										
										<el-form-item label="订单合计金额满">
											<el-input v-model="listQuery.sumMoney" placeholder="金额满" style="width: 80px;" ></el-input>
										</el-form-item>
										<el-form-item label="元的用户.">
										</el-form-item>
										<el-button type="info" v-on:click="query" plain class="queryBtn">查询</el-button>
									</el-form>
								</div>
							</el-row>
					    </div>
					    
						<el-row style="width: 99.2%">
							<el-col :span="24">
								<div class="grid-content2 bg-purple-dark">
									<el-row>
										<el-col :span="24">
											<div class="bootomclas" >
												<list-data :columndata="columndatas" :bindata="listdata" @selectclick="selectclick" @selectAllClick="selectAllClick" :headHeight="headHeight" ref="listTalbeData"></list-data>
											</div>
										</el-col>
										<el-col :span="24">
											<div class="block">
												<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
											</div>
										</el-col>
									</el-row>
							
							
								</div>
							</el-col>
						</el-row>
			
					</el-aside>
					<el-main style="padding: 0px;margin: 5px 0px;">
							<div class="rightCard">
						 搜索优惠券
						<el-input v-model="brandPick" placeholder="未选择优惠券..." style="max-width: 250px;" @focus="getCardPlan" ></el-input>
							<h3>已选择({{sum}})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="danger" size="mini" v-on:click="clearPutKh" round >清空</el-button></h3>
						<el-table
							:data="tableData"
							:height="myHeight"
							style="width: 100%">
							<el-table-column
								prop="name"
								label="客户">
							</el-table-column>
							<el-table-column
								prop="phone"
								label="手机">
							</el-table-column>
						</el-table>
					</div>
					</el-main>
				</el-container>
			
			<putIn-cardplan></putIn-cardplan> 
		</div> 
	</template>

<script>
	import card from '@/api/card';
	import member from '@/api/member';
	import list from '@/components/list'
	import toolspage from '@/components/toolspage'
	import toolsbtncustom from '@/components/toolsbtncustom';
	import putIncardplan from './putIncardplan'; 

	import { mapState, mapActions } from "vuex";
	
	
	export default {
		components: {
			'list-data': list,
			'tools-page':toolspage,
			'btn-custom': toolsbtncustom,
			'putIn-cardplan': putIncardplan,
		},
		data() {
			return {
				columndatas: [{
						label: '主键',
						prop: 'khId',
						type: 'selection',
						align: 'center'
					},
					{
						label: '客户',
						prop: 'khName',
					},
					{
						label: '手机',
						prop: 'mobilePhone'
					},
					{
						label: '注册时间',
						prop: 'khLogonTime'
					},
					{
						label: '合计订单金额',
						prop: 'sumMoney'
					}
				],
				tableData: [],
				detailsVal:[],
				tableData2:[],
				
				listdata: null,
				total:1,
				listLoading: true,
				listQuery: {
					smallDate:this.dateSetStart(new Date('2018-07-25')),
					bigDate:this.dateSetEnd(new Date()),
					sumMoney:50,
					pageSize:20,
					pageNum:1
				},
				headHeight:0,
				myHeight:"300px",
				topHeight: 1,
				sum:0,
				form: {
					log:[{
						id: 0,
						guid: "",
						putType: "回馈热度较高的用户",
						condition: "根据某个时间段的合计订单金额。",
						summary: "",
						cardId:0,
						stockCnt:0,
						collarCnt:0,
						reduceStock:0,
						syncwx:0,
						wxcardId:""
					}],
					details:[]
				},
				custombtn: [{ name: '返回',icoName:"back s-blue",fnHandler: 'return_click("/card/putInType")'}],
				customrightbtn: [{name: '发送优惠券',fnHandler: '$parent.onSubmit()'}],
			}
		},
/* 		created() {
			this.init();
		}, */
		activated(){
			this.init();
		},
		mounted() {
			const that = this;
			var host = window.location.host;
			that.menutype = localStorage.getItem(host + "X-router");
			if (that.menutype == 0) {
				that.topHeight = 50;
			}
			this.headHeight = this.$refs.head.offsetHeight+50;
			window.onresize = function temp() {
				that.myHeight = window.innerHeight - 90 - that.headHeight - that.topHeight + "px";
			};
		},
		updated() {
			const that = this;
			// console.log( window.innerHeight -45- that.headHeight-that.topHeight);
			that.myHeight =
				window.innerHeight - 90 - that.headHeight - that.topHeight + "px";
		},
		
		 computed: {
			...mapState({
				//ishow: state => state.toolslist.dialogshow,
				//id: state => state.toolslist.id
				brandPick: state =>state.toolslist.brandPick,
				goodsPick: state =>state.toolslist.goodsPick,
				multipleSelection: state =>state.toolslist.multipleSelection,
				params : state => state.toolslist.params
				
			})
		}, 
		methods: {
			  ...mapActions({
				setdialogshow: "setdialogshow",
				setdialogshow1: "setdialogshow1",
				setid: "setid",
				setbrandPick:"setbrandPick",
				setgoodsPick:"setgoodsPick",
				setparams:"setparams"
			}), 
			getCardPlan(){
				this.setid(0);
				this.setdialogshow(); 
			},
			selectclick(val,val2){
				var isChecked=false;//是否为选中
				var isPush=true;//是否需要添加
				var isSplice=false;//是否需要删除
				for(var i=0;i<val.length;i++)
				{
					if(val[i].khId ==val2.khId)
					{
						isChecked=true;
						break;
					}
				}
				if(isChecked)
				{
					if(this.tableData.length >0)
					{
						for(var i=0;i<this.tableData.length;i++)
						{
							if(this.tableData[i].khId == val2.khId)
							{
								isPush=false;
								break;
							}
						}
						if(isPush)
						{
							if(this.tableData.length >= 20)
							{
								this.$message({message:'最多只能添加20个',type:'warning'});
								this.$refs.listTalbeData.toggleRowSeleClick(val2,false);
								return;
							}
							this.tableData.push({id:val2.id,name: val2.khName,phone: val2.mobilePhone,khId:val2.khId,openId:val2.openid});
						}
					}else
					{
						if(this.tableData.length >= 20)
						{
							this.$message({message:'最多只能添加20个',type:'warning'});
							this.$refs.listTalbeData.toggleRowSeleClick(val2,false);
							return;
						}
						this.tableData.push({id:val2.id,name: val2.khName,phone: val2.mobilePhone,khId:val2.khId,openId:val2.openid});
					}
						
				}else if(isChecked == false){
					if(this.tableData.length >0)
					{
						for(var i=0;i<this.tableData.length;i++)
						{
							if(this.tableData[i].khId == val2.khId)
							{
								isSplice=true;
								this.tableData.splice(i, 1);//删除该条客户的投放
								break;
							}
						}
					}
				}
				this.sum=this.tableData.length; 
				this.detailsVal=this.tableData;
			},
			selectAllClick(val){
				this.tableData=[];
				//this.detailsVal=val;
				if(this.tableData2.length >0){
					for(var i=0;i<this.tableData2.length;i++){
						this.tableData.push({id:this.tableData2[i].id,name: this.tableData2[i].name,phone: this.tableData2[i].phone,khId:this.tableData2[i].khId,openId:this.tableData2[i].openid});
					}
				}
				var selLength = this.tableData.length + val.length;
				if(selLength > 20){
					this.$message({message:'最多只能添加20个',type:'warning'});
					this.$refs.listTalbeData.clearSeleClick();
					return;
				}
				for(var i=0;i<val.length;i++){
					this.tableData.push({id:val[i].id,name: val[i].khName,phone: val[i].mobilePhone,khId:val[i].khId,openId:val[i].openid});
				}
				this.sum=this.tableData.length; 
				this.detailsVal=this.tableData;
			},
			dateFormat: function(date){
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y+M+D;
			},
			longTimestamp: function(date){
				var timestamp = date.getTime();
				return timestamp;
			},
			dateSetStart:function(date){
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				return date;
			},
			dateSetEnd:function(date){
				date.setHours(23);
				date.setMinutes(59);
				date.setSeconds(59);
				return date;
			},
			init() {
				this.setbrandPick("");
				//this.tableData=[];
				if(this.tableData.length >0){
					this.tableData2=[];
					for(var i=0;i<this.tableData.length;i++){
						this.tableData2.push({id:this.tableData[i].id,name: this.tableData[i].name,phone: this.tableData[i].phone,khId:this.tableData[i].khId,openId:this.tableData[i].openid});
					}
				}
				this.$set(this.params,"cardPlanList",[] );
				
				this.listQuery.smallLong = this.longTimestamp(this.dateSetStart(this.listQuery.smallDate));
				this.listQuery.bigLong = this.longTimestamp(this.dateSetEnd(this.listQuery.bigDate));
					
				if(this.listQuery.smallLong > this.listQuery.bigLong){
					this.$message({message:'开始时间不能大于结束时间',type:'warning'});
					return;
				}
				card.log("/pageByOrdersDate",this.listQuery).then(res => {
					this.total = res.data.total;
					this.listdata = res.data.list;
				})
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			query() {
				var msg = {pageSize: 20, pageNum: 1};
				this.setPage(msg);
			},
			clearPutKh(){
				this.$refs.listTalbeData.clearSeleClick();
				this.tableData=[];
				this.tableData2=[];
				this.sum=this.tableData.length; 
				this.detailsVal=this.tableData;
			},
			onSubmit() {
				var list = this.params.cardPlanList;
				if(list == null  || list.length == undefined || list.length == 0)
				{
					this.$message({message:'请选择要指定优惠券',type:'warning'});
					return;
				}else if(this.sum > list[0].stockCnt){
					this.$message({message:'卡券库存不够，请增加库存!',type:'warning'});
					return;
				}else{
					this.form.log[0].guid=list[0].guid;
					this.form.log[0].cardId = list[0].id;
					this.form.log[0].stockCnt = list[0].stockCnt-this.sum;
					this.form.log[0].collarCnt = list[0].collarCnt+this.sum;
					this.form.log[0].reduceStock = this.sum;
					this.form.log[0].syncwx = list[0].syncwx;
					this.form.log[0].wxcardId = list[0].wxcardId;
					this.form.log[0].condition="查询"+this.dateFormat(this.listQuery.smallDate)+" 至 "+this.dateFormat(this.listQuery.bigDate)+" 订单合计金额满 "+this.listQuery.sumMoney+" 元的用户。"
				}
				
				if(this.detailsVal == null || this.detailsVal.length == undefined || this.detailsVal.length == 0)
				{
					this.$message({message:'请选择要投放的客户',type:'warning'});
					return;
				}else{
					this.form.details=[];
					for(var i=0;i<this.detailsVal.length;i++){
						this.form.details.push({
							id:this.detailsVal[i].id,
							guid: list[0].guid,
							openId: this.detailsVal[i].openid,
							khId: this.detailsVal[i].khId});
					}
				}
				card.putIn("POST",this.form).then(res => {
					if(res.meta.success)
					{
						this.$message({type: 'success',message: '投放成功!'});
						var msg = {pageSize: 20, pageNum: 1};
						this.sum=0;
						this.tableData=[];
						this.detailsVal=[];
						this.tableData2=[];
						this.setPage(msg);
					}else
					{
						let mes = res.meta.message +'投放失败!';
						this.$message({
							type: 'success',
							message: mes
						});
					}
				});
			},
			
		}
	}
</script>
