<template>
	<el-dialog title="文章分类编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
		<!-- <el-row>
			<div class="topBtn">
				<btn-tools :listPage="listPage" @submit="onSubmit"></btn-tools>
			</div>
		</el-row> -->
		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br/>
			<el-row>
				<el-col :span="20">
					<el-form-item label="所属分类:" >
						<el-input v-model="parentObj.name" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="级别:">
						<!-- <el-select v-model="form.level" placeholder="请选择">
							<el-option
								v-for="item in levelOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select> -->
						<el-input v-model="form.level" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="分类名称:">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="排序:">
						<el-input v-model="form.sort"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="状态:">
						<el-select v-model="form.status" placeholder="请选择">
							<el-option
							  v-for="item in options"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="info" class="eidtButton" @click="closedialog" plain>取消</el-button>
			<el-button type="warning" class="eidtButton" @click="onSubmit">保存</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import basic from '@/api/basic';
	import editbtn from '@/components/editbtn';
	import { mapState, mapActions } from "vuex";
	export default {
		components: {
			'btn-tools': editbtn
		},
		data() {
			return {
				form: {
					"id": 0,
					"name": "",
					"level": "",
					"sort": 0,
					"parentId":0,
					"status":0,
					articlecatType:1
				},
				options: [{
				  value: 0,
				  label: '启用'
				}, {
				  value: 1,
				  label: '停用'
				}],
				levelOptions: [{
					value: 1,
					label: '1'
				}, {
					value: 2,
					label: '2'
				}],
				parentObj:{
					"id": 0,
					"name": "",
					"level": "",
					"sort": 0,
					"parentId":0,
					"status":0
				}
			}
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow,
				id: state => state.toolslist.id
			})
		},
		methods: {
			...mapActions({
				setdialoghidden: "setdialoghidden"
			}),
			closedialog() {
				this.setdialoghidden();
			},
			openinit(){
				this.form = {
					"id": 0,
					"name": "",
					"level": "",
					"sort": 0,
					"parentId":0,
					"status":0,
					articlecatType:1
				};
				this.parentObj = {
					"id": 0,
					"name": "",
					"level": "",
					"sort": 0,
					"parentId":0,
					"status":0
				};
				
				if(this.id > 0)
				{
					basic.articlecat("GETID", this.id).then(res => {
						console.log(res.data.obj)
						this.form = res.data.obj;
						if(this.form.parentId != null && this.form.parentId > 0)
						{
							basic.articlecat("GETID", this.form.parentId).then(res => {
								this.parentObj = res.data.obj;
							});
						}
					
					});
					
				}
				else
				{
					this.form.parentId = this.$parent.parentId;
					basic.articlecat("GETID", this.$parent.parentId).then(res => {
						this.parentObj = res.data.obj;
						this.form.level = this.parentObj.level+1;
					});
				}
				
			},
			onSubmit() {
				if(this.form.name === "")
				{
					this.$message.warning('分类名称不能为空!');
					return;
				}
				
				if(this.form.status === null || this.form.status < 0)
				{
					this.$message.warning('请选择文章分类状态!');
					return;
				}
				
				let method = "POST";
				if(this.form.id > 0)
				{
					method = "PATCH";
				}
				basic.articlecat(method,this.form).then(res => {
					// console.log(JSON.stringify(res));
					if(res.meta.success)
					{
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						this.$parent.init();
						this.setdialoghidden();
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
