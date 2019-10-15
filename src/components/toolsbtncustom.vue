<template>
	<el-row class="btn">
		<el-col class="el-col-sty m-view">
			<button class="m-btn-group" v-for="item in btnlists" @click="fnHandler(item.fnHandler,0)">
				<i :class="'u-icon fa fa-' + item.icoName"></i><span>{{item.name}}</span>
			</button>
			<button class="m-btn-group" v-for="item in custombtn" @click="fnHandler(item.fnHandler,1)">
				<i :class="'u-icon fa fa-' + item.icoName"></i><span>{{item.name}}</span>
			</button>
			<el-button class="m-rightbtn-group" type="warning" v-for="item in customrightbtn" key="item.name" @click="fnHandler(item.fnHandler,1)">
				{{item.name}}
			</el-button>
		</el-col>
	</el-row>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	import * as API from '@/api/index'
	
	export default {
		props: {
			btnList: Array,
			custombtn:Array,
			customrightbtn:Array,
			btnType:0,
			addurl:"",
			editurl:"",
			listurl:"",
			apiurl:""
		},
		data(){
			return {
				btnlists:Array,
			}
		},
		created() {
			switch(this.btnType)
			{
				case 0:
					this.btnlists = 
							[
								{ name: '新建',icoName:"add s-green",fnHandler: 'add_click("'+this.addurl+'")'},
								{ name: '修改',icoName:"edit s-green",fnHandler: 'modify_click("'+this.editurl+'")'},
								{ name: '删除',icoName:"delete s-green",fnHandler: 'del_click("'+this.apiurl+'")'}
							]
					break;
				case 1:
					this.btnlists = 
							[
								{ name: '返回',icoName:"back s-blue",fnHandler: 'return_click("'+this.listurl+'")'},
								{ name: '保存',icoName:"edit s-green",fnHandler: '$parent.save_click()'},
							]
					break;
			}
			
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id,
				multipleSelection : state => state.toolslist.multipleSelection
			})
		},
		methods: {
			...mapActions({
				setdialogshow: "setdialogshow",
				setid: "setid",
				setMultipleSelection: "setMultipleSelection"
			}),
			fnHandler(item,type) {
				eval("this."+item);
			},
			add_click(url) {
				this.setid(0);
				if(url != "undefined" && url.length > 0)
				{
					this.setMultipleSelection("");
					this.$router.push(url);
				}else
				{
					this.setdialogshow();
				}
			},
			modify_click(url){
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
					if(url && url != "undefined" && url.length > 0){
						this.setMultipleSelection("");
						this.$router.push({path: url,query:{id:list[0].id}});
					}else{
						that.setid(list[0].id);
						that.setdialogshow();
					}
				}
			},
			del_click(url) {
				var that = this;
				var list = that.multipleSelection;
				if(list == null || list.length == 0)
				{
					that.$message.warning('请选择要删除的记录!');
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
						let listids = {'ids':ids};
						API.DELETE(url,1,listids).then(res => {
							this.setMultipleSelection("");
							if(res.meta.success)
							{
								that.$message.success('删除成功');
								that.$parent.init();
							}else
							{
								let mes = res.meta.message +'删除失败!';
								that.$message.error(mes);
							}
						});
					}).catch(() => {
						that.$message.info("已取消删除");
					});
				}
				
			},
			return_click(url) {
				this.setMultipleSelection("");
				this.$router.push(url);
			}
		}
	};
</script>
