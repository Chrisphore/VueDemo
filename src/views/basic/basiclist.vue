<template>
	<div style="height: 99%;">
		<el-row class="btn" style="margin-top: 5px;">
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" v-on:click="onSubmit()">
					<i class="u-icon fa fa-save s-green"></i>
					<span>保存S</span>
				</button>
			</el-col>
		</el-row>
		<div class="div_tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
				<el-tab-pane label="基本设置" name="first" style="height: 100%">
					<el-form ref="form" :model="form" label-width="130px" class="editForm" >
						<el-row>
							<el-col :span="12"> 
								<el-form-item label="网站名称:" prop="sitename"
								:rules="[ 
									{ required: true, message: '请输入网站名称', trigger: 'blur'}
								]">
									<el-input v-model="form.sitename"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="联系电话:">
									<el-input v-model="form.phone"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="客服热线:" prop="coustrom"
								:rules="[ 
									{ required: true, message: '请输入客服热线', trigger: 'blur'}
								]">
									<el-input v-model="form.coustrom"></el-input>
									<span style="color: #BDBDBD;">&nbsp;&nbsp;(网站右上角)</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="联系邮箱:" >
									<el-input v-model="form.mail"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="备案号码:">
									<el-input v-model="form.record"></el-input>
									<span style="color: #BDBDBD;">&nbsp;&nbsp;(icp备案号码 显示在网站下面)</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="15">
								<el-form-item label="热门关键词:" prop="searchkey">
									<el-input type="textarea" :rows="2" v-model="form.searchkey"></el-input>
									<span style="color: #BDBDBD;">&nbsp;&nbsp;(用逗号分隔)</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="15">
								<el-form-item label="工商红盾电子标识:">
									<el-input type="textarea" :rows="4" v-model="form.SaintGeorge"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="会员登录广告:">
									<tool-img ref="memberloginimg" :typeid="5" :imgurl="form.memberlogin" :imgkey="imgkey" :uploadstu="true" :imgwidth="146" :imgheight="100" :islimit="false">
									</tool-img>
									<el-tag>图片大小：550*380</el-tag>
									<el-tag>点击图片进行上传</el-tag>
								</el-form-item>
							</el-col>
						</el-row>
						
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="在线客户" name="second" style="height: 100%">
					<el-form :model="form" label-width="150px" class="editForm" >
						<el-row>
							<el-col :span="12">
								<el-form-item label="启用客服栏:">
									<el-checkbox  v-model="form.enabled"></el-checkbox >
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="客服QQ(最多10个):">
									<el-input type="textarea" :rows="4" v-model="form.onlineservice" style="width: 95%;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12" style="font-size: 13px;padding-top: 20px;color: #606266;">
								1. 简洁模式,仅QQ号码,例如: 1597053395, 34693679；
								<br/>
								2. 自定义客服昵称,格式为[QQ号:昵称]。例如：1597053395:售前客服, 34693679:技术支持；
								<br/>
								3. 昵称用QQ号显示,格式为[QQ号:QQ号]，例如 34693679:34693679。这样就可以显示QQ号了。
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="微信客服二维码:">
									<tool-img ref="toolsimg" :typeid="5" :imgurl="form.wxcoustrom" :imgkey="imgkey" :uploadstu="true" :imgwidth="146" :imgheight="100" :islimit="false" :isdeleteimg="false">
									</tool-img>
									<el-tag>图片大小：98*98</el-tag>
									<el-tag>点击图片进行上传</el-tag>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="SEO搜索优化" name="third" style="height: 100%">
					<el-form :model="form" label-width="130px">
						<el-row>
							<el-col :span="24">
								<el-form-item label="关键词:">
									<el-input type="textarea" :rows="5" v-model="form.seokeywords"></el-input>
									<span style="color: #BDBDBD;">&nbsp;&nbsp;(多个请用逗号分隔,最长100,包括逗号)</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="企业介绍:">
									<el-input type="textarea" :rows="5" v-model="form.seodescription"></el-input>
									<span style="color: #BDBDBD;">&nbsp;&nbsp;(200字以内)</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="网站底部代码:">
									<el-input type="textarea" :rows="5" v-model="form.bottomcode"></el-input>
									<span style="color: #BDBDBD;">&nbsp;&nbsp;(统计、友情链接等)</span>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="功能设置" name="fourth" style="height: 100%">
					<el-form ref="form1" :model="form" label-width="140px">
						<el-row>
							<el-col :span="12">
								<el-form-item label="首页焦点图数量:" prop="focusimgnum" 
								:rules="[ 
									{ required: true, message: '请输入首页焦点图数量', trigger: 'blur'},
									{ type: 'number', message: '首页焦点图数量必须为数字值', trigger: 'blur'}
								]">
									<el-input v-model.number="form.focusimgnum"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="报价单:">
									<el-radio-group v-model="form.quotation">
										<el-radio label="0">启用</el-radio>
										<el-radio label="1">不启用</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="商品列表默认显示:">
									<el-radio-group v-model="form.goodslistshow">
										<el-radio label="0">图文方式显示</el-radio>
										<el-radio label="1">列表方式显示</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="商品每页显示行数:" prop="gooodspagenum" 
								:rules="[ 
									{ required: true, message: '请输入商品每页显示行数', trigger: 'blur'},
									{ type: 'number', message: '商品每页显示行数必须为数字值', trigger: 'blur'}
								]">
									<el-input  v-model.number="form.gooodspagenum"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="品牌推荐功能:">
									<el-radio-group v-model="form.brandrecommend ">
										<el-radio label="0">启用</el-radio>
										<el-radio label="1">不启用</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="散数是否可以修改:">
									<el-radio-group v-model="form.scatteredpmodify">
										<el-radio label="0">启用</el-radio>
										<el-radio label="1">不启用</el-radio>
									</el-radio-group>
									<el-tag>当启用时，包装规格有小数位的订单，散数将不能更改。例如 电线 1x17.5米 </el-tag>
								</el-form-item>
								
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="件散显示控制:">
									<el-radio-group v-model="form.scatteredpshow">
										<el-radio label="1">只显示件数件价</el-radio>
										<el-radio label="2">只显示散数散价</el-radio>
										<el-radio label="0">都显示</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="询价设置:">
									<el-checkbox  v-model="form.inquiry">启用询价</el-checkbox >
								</el-form-item>
							</el-col>
						</el-row>
						
						<el-row>
							<el-col :span="12">
								<el-form-item label="不显示零售价:">
									<el-checkbox  v-model="form.showprice">不显示</el-checkbox >
								</el-form-item>
							</el-col>
						</el-row>
						
						<el-row>
							<el-col :span="12">
								<el-form-item label="禁止库存不足下单:">
									<el-checkbox  v-model="form.inventoryisbuy">禁止</el-checkbox >
								</el-form-item>
							</el-col>
						</el-row>
						
					</el-form>
				</el-tab-pane>

			</el-tabs>
		</div>
	</div>
</template>
<script>
	import base from '@/api/base';
	import toolsimgsingle from "@/components/toolsimgsingle";

	export default {
		components: {
			"tool-img": toolsimgsingle
		},
		data() {
			return {
				imgkey: "",
				memberloginkey: "",
				activeName: 'first',
				form: {
					"sitename": "",
					"phone":"",
					"coustrom": "",
					"mail": "",
					"record": "",
					"searchkey": "",
					"SaintGeorge": "",
					"enabled": "",
					"seokeywords":"",
					"seodescription":"",
					"bottomcode":"",
					"onlineservice":"",
					"wxcoustrom":"",
					"memberlogin":"",
					"focusimgnum":8,
					"quotation":"",
					"inquiry":"",
					"scatteredpshow":"",
					"scatteredpmodify":"",
					"brandrecommend":"",
					"gooodspagenum":30,
					"goodslistshow":"",
					"showprice":"",
					"inventoryisbuy":"",
				}
			};
		},
		created() {
			this.init();
		},
		methods: {
			handleClick(tab, event) {
				//console.log(tab, event);
			},
			onSubmit(){
				this.$refs.form.validate((valid,obj) => {
					if(!valid)
					{
						let mess = JSON.stringify(obj).split("message");
						this.$message.error(mess[1].substring(3,mess[1].indexOf(",")-1));
					}else
					{
						
						this.$refs.form1.validate((valid,obj) => {
							if(!valid)
							{
								let mess = JSON.stringify(obj).split("message");
								this.$message.error(mess[1].substring(3,mess[1].indexOf(",")-1));
							}else
							{
								let enabled = 1;
								let inquiry = 1;
								let showprice = 1;
								let inventoryisbuy = 1;
								if(this.form.enabled)
								{
									enabled = 0;
								}
								if(this.form.inquiry)
								{
									inquiry = 0;
								}
								if(this.form.showprice)
								{
									showprice = 0;
								}
								if(this.form.inventoryisbuy)
								{
									inventoryisbuy = 0;
								}
								if (this.$refs.toolsimg.cdnurl) {
									this.form.wxcoustrom = this.$refs.toolsimg.cdnurl;
								}
								if (this.$refs.memberloginimg.cdnurl) {
									this.form.memberlogin = this.$refs.memberloginimg.cdnurl;
								}
								var list = [{
									"pcode":"webconfig",
									"code":"phone",
									"summary":this.form.phone
								},
								{
									"pcode":"webconfig",
									"code":"logo",
									"summary":this.form.logo
								},
								{
									"pcode":"webconfig",
									"code":"sitename",
									"summary":this.form.sitename
								},
								{
									"pcode":"webconfig",
									"code":"coustrom",
									"summary":this.form.coustrom
								},{
									"pcode":"webconfig",
									"code":"mail",
									"summary":this.form.mail
								},{
									"pcode":"webconfig",
									"code":"record",
									"summary":this.form.record
								},{
									"pcode":"webconfig",
									"code":"searchkey",
									"summary":this.form.searchkey
								},{
									"pcode":"webconfig",
									"code":"SaintGeorge",
									"summary":this.form.SaintGeorge
								},{
									"pcode":"webconfig",
									"code":"enabled",
									"summary":enabled
								},{
									"pcode":"webconfig",
									"code":"seokeywords",
									"summary":this.form.seokeywords
								},{
									"pcode":"webconfig",
									"code":"seodescription",
									"summary":this.form.seodescription
								},{
									"pcode":"webconfig",
									"code":"bottomcode",
									"summary":this.form.bottomcode
								},
								{
									"pcode":"webconfig",
									"code":"onlineservice",
									"summary":this.form.onlineservice
								},
								{
									"pcode":"webconfig",
									"code":"wxcoustrom",
									"summary":this.form.wxcoustrom
								},
								{
									"pcode":"webconfig",
									"code":"memberlogin",
									"summary":this.form.memberlogin
								},
								{
									"pcode":"webconfig",
									"code":"focusimgnum",
									"summary":this.form.focusimgnum
								},
								{
									"pcode":"webconfig",
									"code":"quotation",
									"summary":this.form.quotation
								},
								{
									"pcode":"webconfig",
									"code":"goodslistshow",
									"summary":this.form.goodslistshow
								},
								{
									"pcode":"webconfig",
									"code":"gooodspagenum",
									"summary":this.form.gooodspagenum
								},
								{
									"pcode":"webconfig",
									"code":"brandrecommend",
									"summary":this.form.brandrecommend
								},
								{
									"pcode":"webconfig",
									"code":"scatteredpmodify",
									"summary":this.form.scatteredpmodify
								},
								{
									"pcode":"webconfig",
									"code":"scatteredpshow",
									"summary":this.form.scatteredpshow
								},
								{
									"pcode":"webconfig",
									"code":"inquiry",
									"summary":inquiry
								},
								{
									"pcode":"webconfig",
									"code":"showprice",
									"summary":showprice
								},
								{
									"pcode":"webconfig",
									"code":"inventoryisbuy",
									"summary":inventoryisbuy
								}
								]
								base.updatedict(list).then(res => {
									if (res.meta.success) {
										this.$message.success("保存成功");
									} else {
										this.$message.error("保存失败");
									}
								})
							}
						})
					}
				});
				
			},
			init() {
				var keyword = {
					"keyword": "webconfig"
				};
				base.getdictlist(keyword).then(res => {
					for(var i=0;i<res.data.length;i++)
					{
						switch (res.data[i].code)
						{
							case "sitename":
								this.form.sitename = res.data[i].summary;
								break;
							case "coustrom":
								this.form.coustrom = res.data[i].summary;
								break;
							case "phone":
								this.form.phone = res.data[i].summary;
								break;
							case "mail":
								this.form.mail = res.data[i].summary;
								break;
							case "record":
								this.form.record = res.data[i].summary;
								break;
							case "searchkey":
								this.form.searchkey = res.data[i].summary;
								break;
							case "SaintGeorge":
								this.form.SaintGeorge = res.data[i].summary;
								break;
							case "enabled":
								if(res.data[i].summary == 0)
								{
									this.form.enabled = true;
								}else
								{
									this.form.enabled = false;
								}
								break;
							case "seokeywords":
								this.form.seokeywords = res.data[i].summary;
								break;
							case "seodescription":
								this.form.seodescription = res.data[i].summary;
								break;
							case "bottomcode":
								this.form.bottomcode = res.data[i].summary;
								break;
							case "onlineservice":
								this.form.onlineservice = res.data[i].summary;
								break;
							case "wxcoustrom":
								var key = this.getkeybyfile(res.data[i].summary);
								this.imgkey = key;
								this.form.wxcoustrom = res.data[i].summary;
								break;
							case "memberlogin":
								var key = this.getkeybyfile(res.data[i].summary);
								this.memberloginkey = key;
								this.form.memberlogin = res.data[i].summary;
								break;
							case "focusimgnum":
								this.form.focusimgnum = parseFloat(res.data[i].summary);
								break;
							case "quotation":
								this.form.quotation = res.data[i].summary;
								break;
							case "goodslistshow":
								this.form.goodslistshow = res.data[i].summary;
								break;
							case "gooodspagenum":
								this.form.gooodspagenum = parseFloat(res.data[i].summary);
								break;	
							case "brandrecommend":
								this.form.brandrecommend = res.data[i].summary;
								break;
							case "scatteredpmodify":
								this.form.scatteredpmodify = res.data[i].summary;
								break;
							case "scatteredpshow":
								this.form.scatteredpshow = res.data[i].summary;
								break;
							case "inquiry":
								if(res.data[i].summary == 0)
								{
									this.form.inquiry = true;
								}else
								{
									this.form.inquiry = false;
								}
								break;
							case "showprice":
								if(res.data[i].summary == 0)
								{
									this.form.showprice = true;
								}else
								{
									this.form.showprice = false;
								}
								break;
							case "inventoryisbuy":
								if(res.data[i].summary == 0)
								{
									this.form.inventoryisbuy = true;
								}else
								{
									this.form.inventoryisbuy = false;
								}
								break;
						}
					}
				})
			},
		}
	};
</script>
