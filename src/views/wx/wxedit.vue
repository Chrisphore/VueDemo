<template>
	<div class="wx-list">
		<div class="topBtn">
			<btn-custom :btnType="2" :custombtn="custombtn" :customrightbtn="customrightbtn"></btn-custom>
		</div>
	
	  <el-row class="wx-tabs">
		<div style="min-height: 760px;"> 
			<!-- <el-steps :active="active" finish-status="success" simple align-center>
				<el-step title="设置域名" ></el-step>
				<el-step title="设置Appid" ></el-step>
				<el-step title="设置模板消息" ></el-step>
				<el-step title="设置微信支付" ></el-step>
				<el-step title="公众号验证文件(txt文件)" ></el-step>
			</el-steps> -->
			<div class="flow">
					<div v-for="item in flowlist">
						<div :class="item.styleName" @click="fnHandler(item.fnHandler)"><div class="middleNum">{{item.middleNum}}</div></div>
						<div style="float: left;">
							<p class="mainTitle">{{item.statusName}}</p>
							<p class="subTitle">{{item.subName}}</p>
						</div>
					</div>
				</div>
			
			<el-row class=" mt10" >
			<el-col class="el-col-sty m-view">
				<el-form  label-width="120px" :model="form" class="wx-edit-form">
					<template v-if="showDiv === 0">
						<span class="span-title">域名</span>
						<el-form-item label="域名">
							<el-input v-model="form.pcode"></el-input>
							<label class="label-tip">域名必须在指定网站注册，并通过备案。例如：www:zstb.cn。不能有Http协议头："http://"</label>
						</el-form-item>
					</template>
					<template v-else-if="showDiv === 1">
						<span class="span-title">公众号Appid</span>
						<el-form-item label="Appid">
							<el-input v-model="form.appid"></el-input>
							<label class="label-tip">对应公众号的Appid</label>
						</el-form-item>
						<el-form-item label="secret">
							<el-input v-model="form.secret" ></el-input>
							<label class="label-tip">对应公众号的Secret</label>
						</el-form-item>
					</template>
					<template v-else-if="showDiv === 2">
						<span class="span-title">公众号模板消息</span>
						<el-form-item label="模板ID1">
							<el-input v-model="messageList[0].messageId"></el-input>
							<label class="label-tip">订单提交成功通知</label>
						</el-form-item>
						<el-form-item label="模板ID2">
							<el-input v-model="messageList[1].messageId"></el-input>
							<label class="label-tip">服务状态提醒</label>
						</el-form-item>
						<el-form-item label="模板ID3">
							<el-input v-model="messageList[2].messageId"></el-input>
							<label class="label-tip">微订单状态提醒</label>
						</el-form-item>
					</template>
					<template v-else-if="showDiv === 3">
						<span class="span-title">订单支付方式配置</span>
						<el-form-item label="支付方式">
							<el-radio-group v-model="form.payment">
								<el-radio :label="0">云收银支付（默认）</el-radio>
								<el-radio :label="1">威付通</el-radio>
							</el-radio-group>
						</el-form-item>
						
						<span class="span-title">云收银扫码支付</span>
						<el-form-item label="商户号">
							<el-input v-model="form.ysymchId"></el-input>
							<label class="label-tip">云收银扫码支付商户号</label>
						</el-form-item>
						<el-form-item label="密钥">
							<el-input v-model="form.ysyKey"></el-input>
							<label class="label-tip">云收银扫码支付密钥</label>
						</el-form-item>
						<el-form-item label="终端号">
							<el-input v-model="form.ysyTerminal"></el-input>
							<label class="label-tip">云收银扫码支付终端号</label>
						</el-form-item>
						<el-form-item label="机构号">
							<el-input v-model="form.ysyOrg"></el-input>
							<label class="label-tip">云收银扫码支付机构号</label>
						</el-form-item>
						<el-form-item label="服务地址">
							<el-input v-model="form.ysService"></el-input>
							<label class="label-tip">云收银扫码支付服务地址</label>
						</el-form-item>
						
						<span class="span-title">威付通支付</span>
						<el-form-item label="商户号">
							<el-input v-model="form.wftmchId"></el-input>
							<label class="label-tip">wft_mch_id</label>
						</el-form-item>
						<el-form-item label="支付密钥">
							<el-input v-model="form.wftKey" ></el-input>
							<label class="label-tip">wft_key</label>
						</el-form-item>
					</template>
					<template v-else>
						<span class="span-title">公众号验证txt文件</span>
						<el-form-item label="验证文件">
								<el-upload
											class="upload-demo" 
											:limit="1"
											action="/" 
											:http-request="uploadimg" 
											:on-exceed="handlexceed" 
											:file-list="fileList">
									<el-button size="small" type="primary">点击上传</el-button>
								</el-upload>
							<label class="label-tip">一个从公众号上下载的txt文件,在商城后台保存此文件后，才可以在公众号设置域名</label>
						</el-form-item>
					</template>
					
				</el-form>
			</el-col>
			</el-row>
		</div>

	  </el-row>
	  
	</div>
</template>

<script>
	import wxAPI from "@/api/wx"
  import {bus} from '@/bus.js'
	import toolsbtncustom from '@/components/toolsbtncustom';
	
	export default {
		components: {
			'btn-custom': toolsbtncustom,
		},
		data() {
			return {
				form:{
					id:0,
					pcode: "",
					appid: "",
					secret: "",
					payment: "0",
					ysymchId: "",
					ysyKey:	"",
					ysyTerminal: "",
					ysyOrg: "",
					ysService: "",
					wftmchId:	"",
					wftKey: "",
					validation: "",
					welcome: "",
					messList:[]
				},
				showDiv: 0,
				active: 0,
				stepName: "下一步",
				messageList:[
					{
					messageId:'',
					id: 0,
					sort: 1
					},
					{
						messageId:'',
						id: 0,
						sort: 2
					},
					{
						messageId:'',
						id: 0,
						sort: 3
					},
				],
				listFlow:{
					statusName:'',
					styleName:''
				},
				flowlist:[],
				styleName: "current",
				fileList: [{name:''}],
				custombtn: [
					{ name: '返回',icoName:"back s-blue",fnHandler: 'return_click("/wx/wxlist")'},
					{ name: '保存',icoName:"edit s-green",fnHandler: '$parent.save_click(0)'},
				],
				customrightbtn:[
					{name: '下一步',fnHandler: '$parent.nextStep()'},
					{name: '上一步',fnHandler: '$parent.lastStep()'},
				],
			}
		},
		created() {
			this.init();
		},
		methods: {
			init(){
				this.form = {
					form:{
						id:0,
						pcode: "",
						appid: "",
						secret: "",
						payment: "0",
						ysymchId: "",
						ysyKey:	"",
						ysyTerminal: "",
						ysyOrg: "",
						ysService: "",
						wftmchId:	"",
						wftKey: "",
						validation: "",
						welcome: "",
						messList:[]
					},
					messageList:[
						{
						messageId:'',
						id: 0,
						sort: 1
						},
						{
							messageId:'',
							id: 0,
							sort: 2
						},
						{
							messageId:'',
							id: 0,
							sort: 3
						},
					]
				}
				
				wxAPI.wxconfig("LIST", this.form).then(res => {
					if(res.data.length > 0)
					{
						this.form = res.data[0];
						let list = this.form.messList;
						for(let i= 0; i< this.form.messList.length; i++ ){
							this.messageList[i].messageId = list[i].messageId;
							this.messageList[i].id = list[i].id;
							this.messageList[i].sort = list[i].sort;
						}
						this.fileList[0].name = this.form.validation;
					}
				});
				
				if(this.flowlist.length == 0)
				{
					for(let i=0;i<5;i++)
					{
						let statusName = "";
						switch(i)
						{
							case 0:
								statusName = "设置域名";
								break;
							case 1:
								statusName = "设置Appid";
								break;
							case 2:
								statusName = "设置模板消息";
								break;
							case 3:
								statusName = "设置微信支付";
								break;
							case 4:
								statusName = "公众号验证文件（txt文件）";
								break;
						}
						let step = i+1;
						
						let row = {
							statusName:statusName,
							subName:"未完成",
							styleName:this.styleName,
							middleNum:step,
						}
						this.flowlist.push(row);
						this.styleName = "notDone";
					}
				}
				
			},
			//下一步
			nextStep(){
				if(this.active >= 4){
					this.active = 4;
					this.save_click(1);
				}else{
					//设置已完成状态
					this.flowlist[this.active].styleName = "achieve";
					this.flowlist[this.active].middleNum = '';
					this.flowlist[this.active].subName = "已完成";
					
					this.active++;
					//设置下一个步骤的样式
					if(this.active < 5)
					{
						this.flowlist[this.active].styleName = "current";
						this.flowlist[this.active].subName = "进行中";
					}
					
					if(this.active > 3){
						this.stepName = "完成";
					}
					this.showDiv = this.active;
				}
				
			},
			//上一步
			lastStep(){
				if(this.active < 1){
					this.active = 0;
				}else{
					
					//设置下一个步骤的样式
					this.flowlist[this.active].styleName = "notDone";
					this.flowlist[this.active].middleNum = this.active + 1;
					this.flowlist[this.active].subName = "未完成";
					
					this.active--;
					
					//设置已完成状态
					this.flowlist[this.active].styleName = "current";
					this.flowlist[this.active].middleNum = this.active + 1;
					this.flowlist[this.active].subName = "进行中";
					
					this.stepName = "下一步";
					this.showDiv = this.active;
				}
				
			},
			//保存微信配置字典
			save_click(type){
					let method = "POST";
					if(this.form.id > 0)
					{
						method = "PATCH";
					}
					this.form.messList = this.messageList;
					wxAPI.wxconfig(method,this.form).then(res => {
						if(res.meta.success)
						{
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
							if(type == 0)
							{
								this.init();
							}else{
								this.$router.push("/wx/wxlist");
							}
							
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
			//上传验证文件
			uploadimg(file) {
				var that = this;
				let param = new FormData();
				param.append("multipartfile", file.file);
				wxAPI.uploadfile("POST", param).then(res => {
					if(res.meta.success){
						this.$message({
							type: 'success',
							message: '上传成功!'
						});
						this.form.validation = res.data;
					}else{
						this.$message({
							type: 'error',
							message: '上传失败!'+ res.meta.message
						});
					}
				}).catch(function(err) {
          that.$message.warning("上传失败");
        });
				
			},
			
			handlexceed(files, fileList) {
				this.$message.error("上传文件超出了当前最大限制");
				console.log("上传文件超出个数了");
			},
			
		},

	}
</script>

<style>
	.wx-list{margin:10px;}
	.wx-tabs{
		height: 100%;
		background: #FFF;
		margin-top:5px;
	}
	.mt10{
		margin-top:10px;
	}
	.step-btn-div{
		float: right;
		padding:20px;
	}
	.step-btn{
		border:2px solid #FFF;;
		background: #7cb638;
		padding: 10px 20px;
		color:#FFF;
	}
	.step-btn:hover{
		border:2px solid #7ED2DF;
		cursor: pointer;
	}
	.wx-edit-form .el-input__inner{
		width: 60%;
	}
	.el-input.is-disabled .el-input__inner{
		background-color: #FFF; 
		border-color: #e4e7ed;
		color: #000;
		cursor: not-allowed;
	}
	.span-title{
		margin:30px 0 10px 20px;
		font-weight: bold;
		display:block;
	}

	
</style>
