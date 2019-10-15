<template>
	<div style="height: 99%;">
		<el-row class="btn mt10">
			<el-col class="el-col-sty m-view">
				<template v-if="activeName === 'wxMenu' ">
					<button class="m-btn-group" v-on:click="del_menu_click()" round>
						<i class="u-icon fa fa-delete s-green"></i><span>删除</span>
					</button>
					
					<div class="wx-menu-btn">
						<el-button class="m-rightbtn-group" type="warning" size="mini" v-on:click="create_menu()">一键创建标准菜单</el-button>
						<el-button class="m-rightbtn-group" type="warning" size="mini" v-on:click="save_menu()">保存自设菜单</el-button>
					</div>
				</template>
				<template v-else>
					<button class="m-btn-group" v-on:click="modify_click()" tooltip="">
						<i class="u-icon fa fa-edit s-green"></i><span>编辑</span>
					</button>
					<button class="m-btn-group" v-on:click="save_click()" tooltip="">
						<i class="u-icon fa fa-save s-green"></i><span>保存</span>
					</button>
					<button class="m-btn-group" v-on:click="del_click()" round>
						<i class="u-icon fa fa-delete s-green"></i><span>删除</span>
					</button>
				</template>
			</el-col>
		</el-row>
	
	  <el-row class="div_tabs" >
			<el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
				<el-tab-pane label="微信配置" name="wxConfig" style="height: 100%">
					<el-form :label-position="labelPosition" label-width="120px" :model="form" :disabled="disabled" class="wx-config editForm">
						<span class="span-title">域名</span>
						<el-form-item label="域名">
							<el-input v-model="form.pcode"></el-input>
							<label class="label-tip">域名必须在指定网站注册，并通过备案。例如：www:zstb.cn。不能有Http协议头："http://"</label>
						</el-form-item>
						
						<span class="span-title">公众号Appid</span>
						<el-form-item label="Appid">
							<el-input v-model="form.appid"></el-input>
							<label class="label-tip">对应公众号的Appid</label>
						</el-form-item>
						<el-form-item label="secret">
							<el-input v-model="form.secret" type="password"></el-input>
							<label class="label-tip">对应公众号的Secret</label>
						</el-form-item>
						
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
						
						<span class="span-title">订单支付方式配置</span>
						<el-form-item label="支付方式">
							<el-input v-model="form.paymentShow"></el-input>
						</el-form-item>
						
						<span class="span-title">云收银扫码支付</span>
						<el-form-item label="商户号">
							<el-input v-model="form.ysymchId"></el-input>
							<label class="label-tip">云收银扫码支付商户号</label>
						</el-form-item>
						<el-form-item label="密钥">
							<el-input v-model="form.ysyKey" type="password"></el-input>
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
							<el-input v-model="form.wftKey" type="password"></el-input>
							<label class="label-tip">wft_key</label>
						</el-form-item>
						
						<span class="span-title">公众号验证txt文件</span>
						<el-form-item label="验证文件">
							<el-input v-model="form.validation"></el-input>
							<label class="label-tip">一个从公众号上下载的txt文件,在商城后台保存此文件后，才可以在公众号设置域名</label>
						</el-form-item>
						
					</el-form>
				</el-tab-pane>
				
				
				<el-tab-pane label="关注欢迎语" name="wxWelecome">
					<div class="wx-welecome" v-bind:style="{height: myHeight}">
						<el-form :label-position="labelPosition" :model="form" >
							<span class="span-title">微信公众号-设置欢迎语</span>
							<el-form-item label="">
								<el-input class="wx-welecome-text" type="textarea" v-model="form.welcome" :autosize="{ minRows: 12, maxRows: 20}"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
				
				<el-tab-pane label="微商城菜单" name="wxMenu" style="height: 100%" class="editForm">
					<div>
						<div class="menu-table">
							<el-table
								:data="tableData"
								border
								style="width: 100%;"
								>
								<el-table-column
									prop="menu"
									label="微信商城菜单"
									align="center"
								>
								</el-table-column>
								
								<el-table-column prop="fristCol" label="第一列" align="center">
									<template slot-scope="scope" >
											<el-input @focus="edit_menu(scope.row.fristCol, scope.row)" v-model="scope.row.fristCol.menuName"  class="wx-menu" placeholder="请输入菜单名称" ></el-input>
									</template>
								</el-table-column>
								
								<el-table-column prop="secondCol" label="第二列" align="center">
									<template slot-scope="scope" >
										<el-input @focus="edit_menu(scope.row.secondCol, scope.row)" v-model="scope.row.secondCol.menuName" class="wx-menu" placeholder="请输入菜单名称"></el-input>
									</template>
								</el-table-column>
								
								<el-table-column prop="thridCol" label="第三列" align="center">
									<template slot-scope="scope" >
										<el-input @focus="edit_menu(scope.row.thridCol, scope.row)" v-model="scope.row.thridCol.menuName" class="wx-menu" placeholder="请输入菜单名称"></el-input>
									</template>
								</el-table-column>
							</el-table>
						</div>
						
						<div class="menu-edit-div">
							<el-form :model="form" label-width="120px" >
								<span class="span-title">其他参数</span>
								<el-form-item label="名称">
									<label>{{wxmenu.menuName}}</label>
								</el-form-item>
								<el-form-item label="类型">
									<el-select v-model="wxmenu.menuType" placeholder="请选择">
										<el-option
											v-for="item in typeOption"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="跳转关键字">
									<el-input v-model="wxmenu.keywords" style="width: 60%;"></el-input>
								</el-form-item>
							</el-form>
						</div>
						<div style="clear: both;"></div>
					</div>
					
					<el-row>
						<template>
							<span class="summary">一键创建标准菜单</span>
							<label class="remark">点击创建微商城标准菜单，无需填写任何内容，只需要轻点一下。新建菜单后， 由于微信缓存的原因，部分机型可能需要20分钟~180分钟的时间才会刷新。若需即时看到效果，则可以通过取关>再重新关注来查看</label>
							
							<span class="summary">删除菜单</span>
							<label class="remark">可以删除已创建的菜单。 删除菜单后，若需即时看到效果，可通过取关>再重新关注来查看</label>
							
							<span class="summary">保存自设菜单</span>
							<label class="remark">
								某些情况下，可能标准菜单不合适。例如自设链接地址的需要，如何设置呢？很简单:<br />
								将任意一个一级或二级菜单的链接地址（即Url)设为微商城的地址即可。格式为：http://您的域名/wx_home/wx_index <br />
								为微商城保留至少一个入口菜单，其它的菜单您可以按需设置成自己需要的
							</label>
							
							<span class="summary">常用URL地址参考(新版)</span>
							<label class="remark">
								<ul>
									<li>首页: http://您的域名/wx/#/pages/hom</li>
									<li>秒杀: http://您的域名/wx/#/seckill</li>
									<li>我的收藏: http://您的域名/wx/#/pages/collection</li>
									<li>商品分类: http://您的域名/wx/#/pages/goodsclassify</li>
									<li>搜索: http://您的域名/wx/#/goodslist</li>
									<li>会员中心: http://您的域名/wx/#/pages/my</li>
									<li>我的订单: http://您的域名/wx/#/order/list</li>
									<li>购物车: http://您的域名/wx/#/pages/shoppingcart</li>
									<li>卡券: http://您的域名/wx/#/idcard</li>
									<li>注册: http://您的域名/wx/#/register</li>
									<li>登录：http://您的域名/wx/#/login</li>
								</ul>
							</label>
							
							<span class="summary">秒杀看板</span>
							<label class="remark">
								<ul>
									<li>列表: http://您的域名/wx/#/seckill</li>
								</ul>
							</label>
							
							<span class="summary">&nbsp;</span>
							<label class="remark">&nbsp;</label>
						</template>
					</el-row>
				</el-tab-pane>
				</el-tabs>
		</el-row>
	</div>
</template>

<script>
	import wxAPI from "@/api/wx"
  import {bus} from '@/bus.js'
	 
	export default {
		data() {
			return {
				activeName: 'wxConfig',
				labelPosition: 'right',
				form:{
					id:0,
					pcode: "",
					appid: "",
					secret: "",
					payment: "",
					ysymchId: "",
					ysyKey:	"",
					ysyTerminal: "",
					ysyOrg: "",
					ysService: "",
					wftmchId:	"",
					wftKey: "",
					validation: "",
					welcome: "",
					messList:[],
				},
				disabled: true,
				myHeight: (window.innerHeight - 220) + 'px',
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
				wxmenuForm: [],
				wxmenu:{
					id: 0,
					menuName: '',
					menuType: 1,
					firstRow: '',
					firstCol: '',
					keywords: ''
				},
				typeOption: [
					{
						value : 1,
						label : "点击事件"
					},
					{
						value : 2,
						label : "访问网页"
					}
				],
				//微信菜单数据
				tableData: [{
          menu: '一级菜单按钮',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 1,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 1,
						firstCol: 2,
						keywords: '',
					},
					thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 1,
						firstCol: 3,
						keywords: '',
					},
        }, {
          menu: '二级菜单 NO.1',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow:2,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 2,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 2,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级按钮 NO.2',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 3,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 3,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 3,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级菜单 NO.3',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 4,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 4,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 4,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级菜单 NO.4',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 5,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 5,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 5,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级菜单 NO.5',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 6,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 6,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 6,
						firstCol: 3,
						keywords: '',
					}
        }],
				menuIds:''
			}
		},
		created() {
			this.init();
		},
		methods: {
			handleClick(tab , event){
				console.log(tab ,event);
			},
			//初始化
			init(){
				this.form = {
					id:0,
					pcode: "",
					appid: "",
					secret: "",
					payment: "",
					ysymchId: "",
					ysyKey:	"",
					ysyTerminal: "",
					ysyOrg: "",
					ysService: "",
					wftmchId:	"",
					wftKey: "",
					validation: "",
					welcome: "",
					messList:[],
					paymentShow:''
				}
				let params = {};
				wxAPI.wxconfig("LIST", params).then(res => {
					if(res.data.length > 0)
					{
						this.form = res.data[0];
						let list = this.form.messList;
						for(let i= 0; i< this.form.messList.length; i++ ){
							this.messageList[i].messageId = list[i].messageId;
							this.messageList[i].id = list[i].id;
							this.messageList[i].sort = list[i].sort;
						}
						
						if(this.form.payment == 0){
							this.form.paymentShow = "云收银支付";
						}else{
							this.form.paymentShow = "威付通";
						}
						
					}
				});
				this.show_menu();
			},
			//编辑
			modify_click(){
				this.$router.push("/wx/wxedit");
			},
			
			//保存微信配置字典
			save_click(){
					let method = "POST";
					if(this.form.id > 0)
					{
						method = "PATCH";
					}
					
					wxAPI.wxconfig(method,this.form).then(res => {
						// console.log(JSON.stringify(res));
						if(res.meta.success)
						{
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
							this.init();
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
			
			//删除微信配置字典
			del_click(){
				if(this.form.id == 0)
				{
					this.$message({
					message: '没有可删除记录!',
					type: 'warning'
					});
				}else
				{
					this.$confirm('确定要删除微信配置吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let ids = this.form.id + "";
						let messIds = "";
						let list = this.form.messList;
						for(let i= 0; i< list.length;i++ ){
							if(list[i].id != null && list[i].id != 0){
								messIds = messIds + "," + list[i].id;
							}
						}
						if (messIds.length > 0) {
							messIds = messIds.substring(1);
						}
						
						let listids = {'ids':ids, 'messIds': messIds}
						wxAPI.wxconfig("DELETE",listids).then(res => {
							if(res.meta.success){
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.init();
							}else{
								this.$message({
									type: 'error',
									message: '删除失败!'
								});
							}
							
						});
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			
			
			//显示菜单
			show_menu() {
				wxAPI.wxmenu("LIST", this.form).then(res => {
					if(res.data.length > 0){
						res.data.forEach(element =>{
							if(element.firstCol == 1)
							{
								this.tableData[(element.firstRow-1)].fristCol = element;
							}else if(element.firstCol == 2){
								this.tableData[(element.firstRow-1)].secondCol = element;
							}else{
								this.tableData[(element.firstRow-1)].thridCol = element;
							}
						});
					}
				});
			},
			
			//点击菜单名称编辑
			edit_menu(col, row){
					this.wxmenu = col;
					if(this.wxmenu.firstCol == 1){
						row.fristCol = this.wxmenu;
					}else if(this.wxmenu.firstCol == 2){
						row.secondCol = this.wxmenu;
					}else{
						row.thridCol = this.wxmenu;
					}
			},
			
			//保存自设菜单事件
			save_menu(){
				let num = 0;
				for(let i=0; i< this.tableData.length; i++){
					if(this.tableData[i].fristCol.menuName != '')
					{
						num++;
					}
					if(this.tableData[i].secondCol.menuName != "")
					{
						num++;
					}
					if(this.tableData[i].thridCol.menuName != '')
					{
						num++;
					}
					
					this.wxmenuForm.push(this.tableData[i].fristCol);
					this.wxmenuForm.push(this.tableData[i].secondCol);
					this.wxmenuForm.push(this.tableData[i].thridCol);
				}
				if(num == 0)
				{
					this.$message({
						type: 'warning',
						message: '当前无可保存的菜单数据!'
					});
					return;
				}
				
				wxAPI.savewxmenu("POST", this.wxmenuForm).then(res => {
					if(res.meta.success)
					{
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						this.init();
					}else
					{
						let mes = res.meta.message +'保存失败!';
						this.$message({
							type: 'error',
							message: mes
						});
					}
				});
			},
			
			//一键创建标准菜单
			create_menu(){
				this.$confirm('确定要创建微信标准菜单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					wxAPI.createmenu("GET", null).then(res =>{
						if(res.meta.success)
						{
							this.$message({
								type: 'success',
								message: '菜单创建成功!'
							});
							this.init();
						}else
						{
							let mes = res.meta.message +'创建失败!';
							this.$message({
								type: 'error',
								message: mes
							});
						}
					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
				
			},
			
			//删除微信菜单
			del_menu_click(){
				this.$confirm('确定要删除微信菜单吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let listids = {'ids': 0};
					wxAPI.wxmenu("DELETE",listids).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.clearMenuData();
					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//刷新微信菜单数据
			clearMenuData(){
				this.tableData =[{
          menu: '一级菜单按钮',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 1,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 1,
						firstCol: 2,
						keywords: '',
					},
					thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 1,
						firstCol: 3,
						keywords: '',
					},
        }, {
          menu: '二级菜单 NO.1',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow:2,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 2,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 2,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级按钮 NO.2',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 3,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 3,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 3,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级菜单 NO.3',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 4,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 4,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 4,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级菜单 NO.4',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 5,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 5,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 5,
						firstCol: 3,
						keywords: '',
					}
        }, {
          menu: '二级菜单 NO.5',
          fristCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 6,
						firstCol: 1,
						keywords: '',
					},
          secondCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 6,
						firstCol: 2,
						keywords: '',
					},
          thridCol: {
						id: 0,
						menuName: '',
						menuType: 1,
						firstRow: 6,
						firstCol: 3,
						keywords: '',
					}
        }]
			}
			
		}
	}
</script>

<style scoped>
	
	
	.wx-config .el-input__inner{
		width: 60%;
		 border-left:none;
    border-right:none;
    border-top:none;
    border-bottom:1px solid #D9D9D9;
	}
	.wx-menu .el-input__inner{
		width: 95%;
		border:0px solid #C0C4CC;
		text-align: center;
	}
	
	.el-input.is-disabled .el-input__inner{
		background-color: #FFF; 
    border-color: #e4e7ed;
    color: #000;
    cursor: not-allowed;
	}
	.span-title{
		margin:5px 0 10px 20px;
		font-weight: bold;
		display:block;
	}
	
	.wx-welecome{
		width: 100%;
	}
	.wx-welecome-text{
		width: 95%;
		margin-left:20px;
	}
	
	
	.menu-table{
		width: 60%;
		float: left;
	}
	.menu-edit-div{
		width: 39%;
		float: right;
	}
	
	.wx-menu-btn{
		float: right;
	}
	
	.summary{
		display: block;
		font-weight: bold;
		margin:20px 0 5px 20px;
	}
	
	.remark{
		display: block;
		margin-left: 20px;
		margin-bottom: 10px;
	}
</style>
