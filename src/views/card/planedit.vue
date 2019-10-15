<template>
	<el-dialog  v-bind:title="'编辑 - '+form.name" :visible="ishow" center width="40%" @open="openinit" @close="closedialog">
		<el-form ref="form" :model="form" label-width="120px" class="editForm">
			<br/>
			<el-row>
				<el-col :span="20">
					<el-form-item label="现有库存:">
						<el-input v-model="oldStockCnt" :disabled="true" class="inputStockCnt"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="输入新库存:">
						<el-input v-model="form.stockCnt" class="inputStockCnt" maxlength="6" @blur="updateStock" ></el-input><span>只接受小于 一百万的整数</span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="">
					<span class="stockDif">{{stockDifString}}</span>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
					<el-form-item label="过期时间:" width="120px">
						<el-col :span="10">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="timestamp" :readonly="dateLimt"></el-date-picker>
							<el-time-picker placeholder="选择时间" v-model="form.endTime" value-format="timestamp" :readonly="dateLimt"></el-time-picker>
						</el-col>
					</el-form-item>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="链接地址(货架URL):">
						<el-input type="textarea" :rows="2" placeholder="卡券货架URL" v-model="form.receiveUrl"></el-input>
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
	import card from '@/api/card';
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
					"name":"",
					cardCnt:0,
					stockCnt: 0,
					collarCnt:0,
					"endTime": new Date(),
					"receiveUrl":"",
					"syncwx": 0,
					"status": 0
				},
				 "dateLimt":false,
				 oldStockCnt:0,
				 stockDifString:"增加0"
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
			updateStock(){
				var stockDif = parseInt(this.form.stockCnt) - parseInt(this.oldStockCnt);
				if(stockDif>0){
					this.stockDifString="增加"+parseInt(stockDif);
					this.form.wxUpdateStockstatus=1;
					this.form.wxUpdateStockCnt=parseInt(stockDif);
				}else if(stockDif<0){
					this.stockDifString="减少"+parseInt(-stockDif);
					this.form.wxUpdateStockstatus=2;
					this.form.wxUpdateStockCnt=parseInt(-stockDif);
				}
			},
			openinit(){
				this.form = {
					"id": 0,
					"name":"",
					cardCnt:0,
					stockCnt: 0,
					collarCnt:0,
					"endTime": new Date(),
					"receiveUrl":"",
					"syncwx": 0,
					"status": 0
				};
				this.stockDifString="增加0";
				if(this.id > 0)
				{
					card.plan("GETID", this.id).then(res => {
						this.form = res.data.obj;
						this.oldStockCnt = this.form.stockCnt;
						if(this.form.syncwx==0){
							this.dateLimt=true;
						}else{
							this.dateLimt=false;
						}
					});
				}
			},
			onSubmit() {
				this.form.cardCnt = parseInt(this.form.stockCnt) + parseInt(this.form.collarCnt);
				let method = "PATCH";
				card.plan(method,this.form).then(res => {
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

<style scoped>
  .inputStockCnt {
    width: 200px;
  }
	.stockDif{
		background-color: #D8ECF6;
		/* padding:8px,35px,8px,14px; */
	}

</style>