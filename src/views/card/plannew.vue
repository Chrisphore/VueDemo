<template>
	<div style="width: 100%;height:calc(100% - 50px);">
			<div class="topBtn">
				<btn-custom :btnType="1"  :listurl="listurl"></btn-custom>
			</div>
			<el-container style="height:100%">
					<el-aside width="375px">
							<div class="grid-content bg-purple">
								<div class="bgSize">
									<div class="workSize" v-bind:style="'background:'+form.colorVal">
											<div class="cardName" style="">
												{{form.name}}
											</div>
											<div class="faceValue center" style="">
												<span>￥</span>
												{{form.cardMoney}}
											</div>
											<div class="cardMinMoney center" style="">
												订单满
												{{form.minMoney}}
											</div>
											<div class="cardTime center" style="">
												有效日期:
												{{dateFormat(form.starTime)}} - {{dateFormat(form.endTime)}}
											</div>
											<div class="cardRemark" style="">
												<p>使用说明</p>
												<div class="remarkContent">
													{{form.summary}}
												</div>
											</div>
									</div>
								</div>
							</div>
							
							<div v-bind:style="'display:'+show">
								<div class="workSize2" v-bind:style="'background:'+form.colorVal">
										<div class="cardName2">
											微信卡券
										</div>
										<div class="wxMain">
											<div class="logo center" style="">
											<!-- <img id="img-brand" v-bind:src="form.cardLogo" alt="图片XX" onerror="this.src='http://www.zstb.cn/upload/adv/11111111111111.png'"/> -->
											<img id="img-brand" v-bind:src="form.cardLogo"/>
												<div class="center gzh-name " id="">{{form.brandName}} </div>
											</div>
											<div class="cardMainTitle center" style="">
												<h3>满{{form.minMoney}}减{{form.cardMoney}}代金券</h3>
											</div>
											
											<div class="cardChildrenTitle center" style="">
												{{form.childrenTitle}}
											</div>
											<div class="center" style="margin-top: 15px;">
												<el-button type="warning" class=" ljsybtn">立即使用</el-button>
											</div>
											
											
											<div class="cardTime2 center" style="">
												有效日期:
												{{dateFormat(form.starTime)}} - {{dateFormat(form.endTime)}}
											</div>
									</div>	
								</div>
							</div>
					</el-aside>
					<el-main style="padding: 0px 15px;height:100%">
							<div class="div_tabs">
								<el-form ref="form" :model="form" label-width="120px" class="editForm">
									<el-tabs v-model="activeName"  class="tabs" >
										<el-tab-pane label="基础信息" name="first">
											<el-row>
												<el-col :span="20">
													<el-form-item label="卡券名称:">
														<el-input v-model="form.name" maxlength="9" placeholder="名称,最多9个字" class="inputLong"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="发放总量:">
														<el-input-number v-model="form.cardCnt"  @change="handleChange" :min="1" :max="100000"></el-input-number>&nbsp;&nbsp;张
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="面值:">
														<el-input-number v-model="form.cardMoney" @change="handleChange" :min="1" :max="100000"></el-input-number>&nbsp;&nbsp;元
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="起用金额:">
														<el-input-number v-model="form.minMoney" @change="handleChange" :min="1" :max="100000"></el-input-number>&nbsp;&nbsp;元可使用
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="卡券颜色:">
														<!-- <el-input v-model="form.colorName"></el-input> -->
														<el-color-picker v-model="form.colorVal" :predefine="predefineColors"> </el-color-picker>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="是否同步微信:">
														<el-radio-group v-model="form.syncwx">
															<el-radio :label="1" @change="pcCardclick">不同步微信</el-radio>
															<el-radio :label="0" @change="wxCardclick">同步微信</el-radio>
														</el-radio-group>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row v-bind:style="'display:'+show">
												<el-col :span="20">
													<el-form-item label="卡券标题:">
														<el-input v-model="'满'+form.minMoney+'减'+form.cardMoney+'代金券'" maxlength="9" placeholder="最多9个字"  class="inputLong" readonly></el-input>
														
													</el-form-item>
												</el-col>
											</el-row>
											<el-row v-bind:style="'display:'+show">
												<el-col :span="20">
													<el-form-item label="卡券副标题:">
														<el-input value="请在本公众号内使用" v-model="form.childrenTitle" maxlength="15" placeholder="最多15个字" class="inputLong"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row v-bind:style="'display:'+show">
												<el-col :span="20">
													<el-form-item label="卡券LOGO:">
															<el-select v-model="form.cardLogo" placeholder="请选择" class="inputLong" @change="selectGet">
																<el-option
																	v-for="brand in brandArray"
																	:key="brand.id"
																	:label="brand.name"
																	:value="brand.logoUrl">
																</el-option>
															</el-select>
													</el-form-item>
												</el-col>
											</el-row>
										</el-tab-pane>
										<el-tab-pane label="基本规则" name="second">
											<el-row>
												<el-col :span="20">
													<el-form-item label="限领:">
														<el-input-number v-model="form.limit" :min="1" :max="100000" class="inputLong"></el-input-number>&nbsp;&nbsp;张
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
													<el-form-item label="生效时间:" width="120px">
														<el-col :span="10">
															<el-date-picker type="date" placeholder="选择日期" v-model="form.starTime" ></el-date-picker>
															<el-time-picker placeholder="选择时间" v-model="form.starTime" ></el-time-picker>
														</el-col>
													</el-form-item>
											</el-row>
											<el-row>
												<el-form-item label="过期时间:" width="120px">
													<el-col :span="10">
														<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" ></el-date-picker>
														<el-time-picker placeholder="选择时间" v-model="form.endTime" ></el-time-picker>
													</el-col>
												</el-form-item>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="使用说明:"> 
														<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.summary"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row>
												<el-col :span="20">
													<el-form-item label="推广">
														<!-- <el-checkbox v-model="form.share" disabled>允许分享领取链接</el-checkbox><br/> -->
														<el-checkbox v-model="form.give" @change="presentclick">允许转赠(不勾选时微信卡券将不可转赠.)</el-checkbox><br/>
														<!-- <el-checkbox v-model="form.newCoustrom" disabled>仅新客户可领取(可按需设定哪些客户为新客户)</el-checkbox> -->
													</el-form-item>
												</el-col>
											</el-row>
											
											<el-row>
												<el-col :span="20">
													<el-form-item label="范围">
														<el-radio-group v-model="form.limitType" style="line-height: 30px;">
															<el-radio :label="0" @change="pickAllclick">全店通用</el-radio><br/>
															<el-radio :label="1" @change="goodsclick2"  >
																指定商品
																	<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请指定商品" v-model="goodsPick" @focus="goodsclick" :disabled="goodsDisabled" readonly></el-input>
															</el-radio><br/>
															<el-radio :label="2" @change="brandclick2">
																指定品牌
																<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请指定品牌" v-model="brandPick" @focus="brandclick" :disabled="brandDisabled" readonly></el-input>
															</el-radio>
														</el-radio-group>
													</el-form-item>
												</el-col>
											</el-row>
										</el-tab-pane>
										
									</el-tabs> 
								</el-form>
							</div>
					</el-main>
			</el-container>
			<brand-bind></brand-bind> 
			<goods-bind></goods-bind> 
		</div> 
	</template>

<script>
	import card from '@/api/card';
	import basic from '@/api/basic';
	import editbtn from '@/components/editbtn';
	import { mapState, mapActions } from "vuex";
	import brandbind from './brandbind'; 
	import goodsbind from './goodsbind'; 
	import toolsbtncustom from '@/components/toolsbtncustom'
	
	export default {
		components: {
			'btn-custom': toolsbtncustom,
			'btn-tools': editbtn,
			 'brand-bind': brandbind,
			 'goods-bind': goodsbind
		},
		data() {
			return {
				form: {
					"id": 0,
					"name": "",
					"cardCnt": 0,
					"cardMoney": 0,
					"minMoney": 0,
					"colorName":"",
					"colorVal":"",
					"cardType": 0,
					"syncwx":1,
					"mainTitle": "",
					"childrenTitle": "请在本公众号内使用",
					"cardLogo": "",
					"limit": 0,
					"starTime": new Date(),
					"endTime": new Date(),
					"summary": "",
					"share": true,
					"give": true,
					"newCoustrom": true,
					"limitType": 0,
					"brandName":""
					
				},
				activeName: 'first',
				predefineColors: [
				  '#63B359',
				  '#2C9F67',
				  '#509FC9',
				  '#5885CF',
				  '#9062C0',
				  '#D09A45',
				  '#E4b138',
				  '#EE903C',
				  '#F08500',
				  '#A9D92D',
				  '#DD6549',
				  '#CC463D',
				  '#CF3E36',
				  '#5E6671',
							/* '#026842', */
							
				],
				brandArray:[],
				listQuery: {
					keyword: ''
				},
				show:'none',
				goodsDisabled:true,
				brandDisabled:true,
				listurl:"/card/planlist",
			}
		},
/* 		created() {
			this.init();
		}, */
		activated(){
			this.init();
		},
		
		 computed: {
			...mapState({
				//ishow: state => state.toolslist.dialogshow,
				//id: state => state.toolslist.id
				brandPick: state =>state.toolslist.brandPick,
				goodsPick: state =>state.toolslist.goodsPick,
				multipleSelection: state =>state.toolslist.multipleSelection
				
			})
		}, 
		methods: {
			  ...mapActions({
				setdialogshow: "setdialogshow",
				setdialogshow1: "setdialogshow1",
				setid: "setid",
				setbrandPick:"setbrandPick",
				setgoodsPick:"setgoodsPick"
			}), 
			getBack() {
				this.$router.push('/card/planlist'); 
			}, 
			handleChange(value) {
				//console.log(value);
			},
			brandclick(){
				this.setgoodsPick("");
				this.setid(0);
				this.setdialogshow(); 
			},
			brandclick2(){
				this.setgoodsPick("");
				this.goodsDisabled=true;
				this.brandDisabled=false;
			},
			goodsclick(){
				this.setbrandPick("");
				this.setid(0);
				this.setdialogshow1(); 
			},
			goodsclick2(){
				this.setbrandPick("");
				this.goodsDisabled=false;
				this.brandDisabled=true;
			},
			pickAllclick(){
				this.setbrandPick("");
				this.setgoodsPick("");
				this.goodsDisabled=true;
				this.brandDisabled=true;
			},
			pcCardclick(){
				this.show="none";
			},
			wxCardclick(){
				this.show="";
			},
			selectGet(logoUrl){
				var obj=this.brandArray;
				for(var i=0;i<obj.length;i++){
					if(obj[i].logoUrl==logoUrl){
						this.form.brandName=obj[i].name;
						
						return;
					}
				}
			},
			presentclick(val){
				if(val==false){
					this.form.summary=this.form.summary+",不可转赠"
				}else{
					this.form.summary=this.form.summary.replace(",不可转赠","")
				}
				
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
			trim: function(str){
				return str.replace(/(^\s*)|(\s*$)/g, ""); 
			}, 
			isNull: function(data){
				return (this.trim(data) == "" || data == undefined || data == null) ? true : false;  
			},
			getColorName: function(val){
				if(val=="#63B359"){
					this.form.colorName="Color010";
				}else if(val=="#2C9F67"){
					this.form.colorName="Color020";
				}else if(val=="#509FC9"){
					this.form.colorName="Color030";
				}else if(val=="#5885CF"){
					this.form.colorName="Color040";
				}else if(val=="#9062C0"){
					this.form.colorName="Color050";
				}else if(val=="#D09A45"){
					this.form.colorName="Color060";
				}else if(val=="#E4B138"){
					this.form.colorName="Color070";
				}else if(val=="#EE903C"){
					this.form.colorName="Color080";
				}else if(val=="#F08500"){
					this.form.colorName="Color081";
				}else if(val=="#A9D92D"){
					this.form.colorName="Color082";
				}else if(val=="#DD6549"){
					this.form.colorName="Color090";
				}else if(val=="#CC463D"){
					this.form.colorName="Color100";
				}else if(val=="#CF3E36"){
					this.form.colorName="Color101";
				}else if(val=="#5E6671"){
					this.form.colorName="Color102";
				}
				
			},
			init(){
				  this.form = {
					"id": 0,
					"name": "",
					"cardCnt": 0,
					"cardMoney": 0,
					"minMoney": 0,
					"colorName":"",
					"colorVal":"#E4B138",
					"cardType": 0,
					"syncwx":1,
					"mainTitle": "",
					"childrenTitle": "请在本公众号内使用",
					"cardLogo": "",
					"limit": 0,
					"starTime": new Date(),
					"endTime": new Date(),
					"summary": "",
					"share": true,
					"give": true,
					"newCoustrom": true,
					"limitType": 0,
					"brandList": [],
					"goodsList": [],
				}; 
				this.show="none";
				if(this.$route.params.id > 0)
				{ 
					card.plan("GETID", this.$route.params.id).then(res => {
						if(res.data.obj != undefined){
							if(res.data.obj.share==0){
								res.data.obj.share=true;
							}else{
								res.data.obj.share=false;
							}
							
							if(res.data.obj.give==0){
								res.data.obj.give=true;
							}else{
								res.data.obj.give=false;
							}
							
							if(res.data.obj.newCoustrom==0){
								res.data.obj.newCoustrom=true;
							}else{
								res.data.obj.newCoustrom=false;
							}
							
						} 
						this.form = res.data.obj;
						
					});
				} 
				
				basic.brand("LIST", this.listQuery).then(res => {
					this.brandArray = res.data;
					if(this.form.cardLogo==""){
						this.form.cardLogo=this.brandArray[0].logoUrl;
						this.form.brandName=this.brandArray[0].name;
					}
				});
				
			},
			save_click() {
				let method = "POST";
				if(this.form.id > 0)
				{
					method = "PATCH";
				}
				if(this.form != undefined){
					if(this.form.share==true){
						this.form.share=0;
					}else{
						this.form.share=1;
					}
					
					if(this.form.give==true){
						this.form.give=0;
					}else{
						this.form.give=1;
					}
					
					if(this.form.newCoustrom==true){
						this.form.newCoustrom=0;
					}else{
						this.form.newCoustrom=1;
					}
					if(this.form.syncwx==1){
						this.form.cardType=0;
					}else{
						this.form.cardType=1;
					}
					if(this.form.limitType==2)
					{
						var list = this.multipleSelection;
						if(list == null || list.length == 0)
						{
							this.$message({message:'请选择要指定的品牌',type:'warning'});
						}else
						{
							let ids=[];
							for(let i=0; i<list.length; i++)
							{
								ids.push(list[i].id);
							}
							this.form.brandList=ids;
						}
					}else if(this.form.limitType==1)
					{
							var list = this.multipleSelection;
							if(list == null || list.length == 0)
							{
								this.$message({message:'请选择要指定的商品',type:'warning'});
							}else
							{
								let ids=[];
								for(let i=0; i<list.length; i++)
								{
									ids.push(list[i].goodsId);
								}
								this.form.goodsList=ids;
							}
					}
					this.getColorName(this.form.colorVal);
					this.form.mainTitle = '满'+this.form.minMoney+'送'+this.form.cardMoney;
				}
				if(this.isNull(this.form.name)){
					this.$message({message:'请输入卡券名称',type:'warning'});
					return;
				} 
				if(this.isNull(this.form.summary)){
					this.$message({message:'请输入卡券使用说明',type:'warning'});
					return;
				}
				if(this.form.starTime >= this.form.endTime){
					this.$message({message:'开始时间需要少于过期时间',type:'warning'});
					return;
				}
				if(this.form.cardLogo == undefined && this.form.syncwx == 0){
					this.$message({message:'微信卡券Logo不能为空,需要在品牌设置中上传',type:'warning'});
					return;
				}
				card.plan(method,this.form).then(res => {
					 //console.log(JSON.stringify(res));
					if(res.meta.success)
					{
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						//this.$parent.init();
						this.$router.push('/card/planlist');
						
					}else
					{
						let mes = res.meta.message +'保存失败!';
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

<style scoped>


.bgSize{
	width:375px;
	min-height: 380px;
 	position:absolute; 
	margin-left: 5px;
	margin-top: 5px;
}
.workSize{
	width:375px;  
	min-height:300px;  
	position:absolute; 
}
	
.colorSize{
 /* width:300px;  */
 height:175px;  
  border-radius:10px 10px 0px 0px;
	padding: 0 5px;

}
.cardName{
	/* width:288px; */
	height:40px;
	line-height: 40px;
	font-size: 18px;
	padding: 10px;
	color: rgb(255,238,230);
}
.faceValue{
	/* width:288px; */
	height:48px;
    font-weight: 500;
    font-size: 40px;
	/* border:1px solid red; */
	color: white;
	
}
.center {
    text-align: center;
}
.cardMinMoney{
	height: 36px;
  line-height: 36px;
	font-size: 13px;
	/* border:1px solid red; */
	color: white;
}
.cardTime{
	height: 36px;
	line-height: 36px;
	font-size: 13px;
	/* border:1px solid red; */
	color: rgba(255,255,255,0.5);
}
.cardRemark{
	background: rgb(249,249,249);
    padding: 15px 15px;
    border-bottom: solid 1px #ddd;
    color: #808080;
    border-top: dashed 1px #ddd;
		font-size: 13px;

}
.remarkContent{
	background: #fff;
	height: 120px;
	word-break:break-all;
}



.workSize2{
	width:375px;  
	min-height:330px;  
	 position:absolute; 
	margin-left: 5px;
  top: 420px;   
}	

.wxMain{
		border-radius: 5px;
    background: #fff;
    width: 355px;
    height: 263px;
    margin: 10px;
    position: absolute;
    top: 44px;
}




.cardName2{
	padding: 10px;
	width: 84px;
	height:20px;
	font-size: 14px;
	color: #000000;
}

.logo > img {
	position: relative;
    top: -23px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 auto;
    border: 1px solid #ddd;
}
.logo > .gzh-name {
    position: relative;
		font-size: 13px;
    color: #393939;
}
.cardMainTitle{
		font-size: 22px;
	/* color: white; */
	
}
.cardChildrenTitle{
	font-size: 13px;
	
	
}
.btn-warning {
    background-color: #ffb752!important;
    border-color: #ffb752!important;
}
.btn-small {
    padding: 0 8px;
    line-height: 24px;
    border-width: 4px;
    font-size: 13px;
} 
.btn-warning:hover {
    background-color: #e59729!important; 
}
.cardTime2{
	height: 36px;
	line-height: 36px;
	font-size: 13px;
	color: #393939;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
	.inputLong{
		width: 220px;
	}
	
	
	.ljsybtn{
		  width: 168px;

  height: 36px;

  border-radius: 4px;

  background-color: #ffb822;
	}
	
</style>