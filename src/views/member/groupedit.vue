<template>
	<el-dialog title="会员分组编辑" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
		<!-- <el-row>
			<div class="topBtn">
				<btn-tools :listPage="listPage" @submit="onSubmit"></btn-tools>
			</div>
		</el-row> -->
		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br/>
			<el-row>
				<el-col :span="20">
					<el-form-item label="分组名称:" prop="name">
						<el-input v-model="form.name"></el-input>
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
	import member from '@/api/member';
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
					"name": null
				}
			}
		},
		computed: {
			...mapState({
				ishow: state => state.toolslist.dialogshow2,
				id: state => state.toolslist.id
			})
		},
		methods: {
			...mapActions({
				setdialoghidden2: "setdialoghidden2"
			}),
			closedialog() {
				this.setdialoghidden2();
			},
			openinit(){
				this.form = {
					"id": 0,
					"name": null
				};
				if(this.id > 0)
				{
					member.group("GETID", this.id).then(res => {
						this.form = res.data.obj;
					});
				}
			},
			onSubmit() {
				if(this.form.name == null){
					this.$message({
						type: 'warning',
						message: '分组名称不能为空!'
					});
					return false;
				}
				
				let method = "POST";
				if(this.form.id > 0)
				{
					method = "PATCH";
				}
				member.group(method,this.form).then(res => {
					// console.log(JSON.stringify(res));
					if(res.meta.success)
					{
						this.$message({
							type: 'success',
							message: '保存成功!'
						});
						this.$parent.$parent.init();
						this.setdialoghidden2();
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
