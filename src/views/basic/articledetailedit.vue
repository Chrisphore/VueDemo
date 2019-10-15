<template>
	<el-dialog title="文章明细编辑" :visible="ishow" center width="60%" @open="openinit" @close="closedialog">
		<!-- <el-row>
			<div class="topBtn">
				<btn-tools :listPage="listPage" @submit="onSubmit"></btn-tools>
			</div>
		</el-row> -->
		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br/>
			<el-row>
				<el-col :span="20">
					<el-form-item label="文章标题:">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="文章分类:">
						<el-select filterable v-model="form.parentList" placeholder="请选择">
							<el-option-group
								v-for="group in parentLists"
								:key="group.label"
								:label="group.label">
								<el-option
									v-for="item in group.options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="文章作者:">
						<el-input v-model="form.author"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="文章关键字:">
						<el-input v-model="form.keywords"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="文章来源:">
						<el-input v-model="form.source"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="外部链接:">
						<el-input v-model="form.redirt"></el-input>
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
			<el-row>
				<el-col :span="20">
					<el-form-item label="文章内容:">
						<tinymce :height="tiny.height" v-model="form.content" ref="tinymce"></tinymce>
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
	import tinymce from "@/components/toolstinymce";
	
	export default {
		components: {
			'btn-tools': editbtn,
			tinymce,
		},
		data() {
			return {
				form: {
					"id": 0,
					"title": "",
					"author": "",
					"keywords": null,
					"source": "",
					"redirt": null,
					"sort": 0,
					"status":0,
					"content":"",
					"parentList":""
				},
				options: [{
				  value: 0,
				  label: '显示'
				}, {
				  value: 2,
				  label: '不显示'
				}],
				parentLists:null,
				listQuery: {},
				tiny: {
					height: 500
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
				this.$refs.tinymce.setContent("");
			},
			openinit(){
				this.form = {
					"id": 0,
					"title": "",
					"author": "",
					"keywords": null,
					"source": "",
					"redirt": null,
					"sort": 0,
					"status":0,
					"content":"",
					"parentList":""
				};
				
				if(this.id > 0)
				{
					basic.articledetail("GETID", this.id).then(res => {
						this.form = res.data.obj;
						this.$refs.tinymce.setContent(this.form.content);
					});
				}
				basic.articlecatfind("GET", this.listQuery).then(res => {
					this.parentLists = res.data;
				})
			
			},
			onSubmit() {
				if(this.form.title === ""){
					this.$message.warning('文章标题不能为空!');
					return;
				}
				if(this.form.parentList === ""){
					this.$message.warning('文章分类不能为空!');
					return;
				}
				if(this.form.content === "")
				{
					this.$message.warning('文章内容不能为空!');
					return;
				}
				if(this.form.status < 0)
				{
					this.$message.warning('请选择文章状态!');
					return;
				}
				let method = "POST";
				if(this.form.id > 0)
				{
					method = "PATCH";
				}
				basic.articledetail(method,this.form).then(res => {
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
						let mes = '保存失败!';
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
