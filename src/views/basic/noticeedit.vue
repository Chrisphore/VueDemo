<template>
	<el-dialog title="公告编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">

		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br/>
			<el-row>
				<el-col :span="20">
					<el-form-item label="公告名称:">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="父级代码:">
						<el-input v-model="form.pcode"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="数据字典代码:">
						<el-input v-model="form.code"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="公告备注:">
						<el-input v-model="form.summary"></el-input>
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
					"pcode": "",
					"code": "",
					"summary": ""
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
					"pcode": "",
					"code": "",
					"summary": ""
				};
				if(this.id > 0)
				{
					basic.dict("GETID", this.id).then(res => {
						this.form = res.data.obj;
					});
				}
			},
			onSubmit() {
				let method = "POST";
				if(this.form.id > 0)
				{
					method = "PATCH";
				}
				basic.dict(method,this.form).then(res => {
					 //console.log(JSON.stringify(res));
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
