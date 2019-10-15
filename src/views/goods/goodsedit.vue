<template>
	<div style="height: 99%;">
			<div class="topBtn">
				<btn-custom :btnType="1" :listurl="listurl"  :custombtn="custombtn"></btn-custom>
			</div>
		<div class="div_tabs">
			<el-tabs v-model="activeName" class="tabs">
				<el-tab-pane label="基本信息" name="first" style="height: 100%">
					<el-form ref="form" :model="form" label-width="120px" class="editForm" >
						<el-row>
							<el-col :span="12">
								<el-form-item label="品牌:">
									<select-list ref="brand" pcode="" :code="form.brandId" type="4">
									</select-list>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="是否登录后显示:">
									<el-radio-group v-model="form.loginShow">
									<el-radio :label="0">不是</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>	
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="销量显示:">
									<el-radio-group v-model="form.sellType">
									<el-radio :label="2">实际销量</el-radio>
									<el-radio :label="1">自定义销量</el-radio>
									<el-radio :label="0">不显示</el-radio>
								</el-radio-group>	
								</el-form-item>
							</el-col>
							<el-col :span="12" v-show="form.sellType == 1 ? true:false">
								<el-form-item label="自定义销量:" prop="coustromSell" 
								:rules="[
									{ type: 'number', message: '自定义销量必须为数字值'}
								]">
									<el-input v-model.number="form.coustromSell"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="下单类型:">
									<el-radio-group v-model="form.orderType">
									<el-radio :label="0">默认</el-radio>
									<el-radio :label="1">按件</el-radio>
									<el-radio :label="2">按散</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="起订量:" prop="minNum" 
									  :rules="[
											{ type: 'number', message: '起订量必须为数字值'}
										]">
									<el-input v-model.number="form.minNum"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="关注显示:">
									 <el-radio-group v-model="form.viewType">
											<el-radio :label="2">实际关注</el-radio>
											<el-radio :label="1">自定义关注</el-radio>
											<el-radio :label="0">不显示</el-radio>
									 </el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="自定义关注数:" v-show="form.viewType == 1 ? true:false" prop="coustromView" 
									:rules="[
										{ type: 'number', message: '自定义关注数必须为数字值'}
									]"
								>
									<el-input v-model.number="form.coustromView"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="商品图片:">
								 <tools-img ref="goodsImage" :limit="10" :typeid="1" :fileslist="fileslist"></tools-img>
								 <el-tag>建议图片大小为:340*340</el-tag>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="23">
								<el-form-item label="电脑端详情:"> 
									<tinymce id="pcContent" :height="tiny.height" v-model="form.pcContent"></tinymce>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="23">
								<el-form-item label="微信端详情:">
									<tinymce id="mobileContent"  :height="tiny.height" v-model="form.mobileContent"></tinymce>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品评论" name="second">
					<el-row>
						<el-col :span="24">
							<div class="bootomclas">
								<list-data :columndata="columndatas" :bindata="listdata" :headHeight="headHeight"></list-data>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="block">
								<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
							</div>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>
		
	</div>
</template>

<script>
	import goods from '@/api/goods';
	import base from '@/api/base';
	import toolsbtncustom from '@/components/toolsbtncustom';
	import selectlist from "@/components/toolselect";
	import toolsimg from "@/components/toolsimgupload";
	import tinymce from "@/components/toolstinymce";
	import list from '@/components/list';
	import toolspage from '@/components/toolspage';
	import { mapState, mapActions } from "vuex";
	
	export default {
		components: {
			tinymce,
			'btn-custom': toolsbtncustom,
			"select-list": selectlist,
			"tools-img": toolsimg,
			'list-data': list,
			'tools-page':toolspage,
		},
		data() {
			return {
				tiny: {
					height: 500
				},
				columndatas: [{
						label: '主键',
						prop: 'id',
						type: 'selection',
						align: 'center'
					},
					{
						label: '客户名称',
						prop: 'khName'
					},
					{
						label: '评分等级',
						prop: 'grade',
					},
					{
						label: '评论时间',
						prop: 'createTime',
						type:'ymd'
					},
					{
						label: '评论描述',
						prop: 'content',
					},
					{
						label: '评论状态',
						prop: 'commentStatus',
					}
				],
				listdata: null,
				headHeight:0,
				total:1,
				listQuery: {
					pageSize:20,
					pageNum:1,
					goodsId:-1
				},
				activeName: 'first',
				form: {
					"id": 0,
					"brandId": -1,
					"sellType":2,
					"orderType":0,
					"coustromSell":0,
					"viewType":0,
					"coustromView":0,
					"pcContent":"",
					"mobileContent":"",
					"minNum":0,
					"loginShow":0,
					"picture":""
				},
				dialogImageUrl: "",
				dialogVisible: false,
				fileslist: [],
				listurl:"/goods/goodslist",
				custombtn:[
					{ name: '公开显示',icoName:"qiyong s-green",fnHandler: '$parent.status_click(1)'},
					{ name: '不显示',icoName:"tingyong s-green",fnHandler: '$parent.status_click(0)'}
				]
			}
		},
		created() {
			this.init();
		},
		mounted() {
			this.headHeight = 110;
		},
		computed: {
			...mapState({
				multipleSelection : state => state.toolslist.multipleSelection
			})
		},
		methods: {
			...mapActions({
				setMultipleSelection: "setMultipleSelection"
			}),
			init(){
				goods.release("GETID", this.$route.query.id).then(res => {
						this.form = res.data.obj;
						let query = {"businessType":1,"relationId":res.data.obj.goodsId}
						base.getfilelist(query).then(data => {
								let ls = [];
								for (let file of data.data){
									ls.push({key:this.getkeybyfile(file.path), url: file.path, id: file.id});
								}
								this.fileslist = ls;
						});
						this.listQuery.goodsId = res.data.obj.goodsId;
						goods.commentGoods(this.listQuery).then(data => {
								this.total = data.data.total;
								this.listdata = data.data.list;
						});
						
				});
				
			},
			setPage(msg){
				this.listQuery.pageSize = msg.pageSize;
				this.listQuery.pageNum = msg.pageNum;
				this.init();
			},
			save_click() {	
				if(this.$refs.brand.values == null)
				{
					this.$message.warning('请选择商品所属品牌!');
					return;
				}
				this.form.picture = "";
				if(this.$refs.goodsImage.files_list != null)
				{
					for(let file of this.$refs.goodsImage.files_list)
					{
						if(file.id == 0)
						{
							this.form.picture = this.form.picture + ","+file.url;
						}
					}
					if(this.form.picture.length > 0)
					{
						this.form.picture = this.form.picture.substring(1);
					}
					
				}
				this.form.brandId = this.$refs.brand.values;
				this.$refs.form.validate((valid,obj) => {
					if(valid)
					{
						goods.release("PATCH",this.form).then(res => {
							if(res.meta.success)
							{
								this.$message.success('保存成功');
								this.$router.push(this.listurl);
							}else
							{
								let mes = res.meta.message +'保存失败!';
								this.$message.error(mes);
							}
						});
					}else
					{
						let mess = JSON.stringify(obj).split("message");
						this.$message.error(mess[1].substring(3,mess[1].indexOf(",")-1));
					}
				});
			},
			status_click(status)
			{
				let name = "公开显示";
				if(status == 0)
				{
					name = "不显示";
				}
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					that.$message.warning('请选择要'+name+'的记录!');
				}else
				{
					this.$confirm('确定要'+name+'选中记录吗?', '提示', {
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
						let statuslist = {
							"ids":ids,
							"status":status
						}
						goods.commentStatus(statuslist).then(res => {
							if(res.meta.success)
							{
								that.$message.success(name+'成功');
								that.init();
							}else
							{
								let mes = res.meta.message + name +'失败!';
								that.$message.error(mes);
							}
						});
					}).catch(() => {
						that.$message.info("已取消显示操作");
					});
				}
			},
		}
	}
</script>
