<template>
	<div style="height: 99%;margin: 5px;">
		<el-row class="btn">
			<el-col class="el-col-sty m-view">
				<button class="m-btn-group" @click="next">
					<i class="u-icon fa fa-add s-green"></i><span>下一步</span>
				</button>
			</el-col>
		</el-row> 
		<div class="market-background">
			<h3>你可以通过以下方式确定投放用户的范围</h3>
			<div class="market-padding">
				<el-radio-group v-model="radio">
					<el-radio :label="1" >激活可能流失的用户
						<p class="subtitle">智能分析出可能流失的用户，通过赠送优惠券重新吸引这批用户。</p>
					</el-radio></br>
						
					<el-radio :label="2" >激活关注未下单用户
						<p class="subtitle">智能分析在商城中重来不下单的用户，通过赠送优惠券吸引他们。</p>
					</el-radio></br>
					
					<el-radio :label="3" >回馈热度较高的用户
						<p class="subtitle">分析某段时间内下单总金额较高的用户，赠送优惠券作为回馈。</p>
					</el-radio></br>
					
					<el-radio :label="4" >回馈忠诚用户
						<p class="subtitle">分析长期支持本商城的用户，赠送优惠券作为回馈。</p>
					</el-radio></br>
					
					
					<el-radio :label="5" >自定义投放范围
						<p class="subtitle">可根据客户姓名、手机等进行筛选，自定义目标用户。</p>
					</el-radio></br>
						
					<el-radio :label="6">查询投放记录
						<p class="subtitle">查询曾经投放的记录，通过数据查看投放效果。</p>
					</el-radio>
				</el-radio-group>	
			</div>
		</div>
	</div>
</template>

<script>
	import card from '@/api/card';

	export default {
		 components: {
			
		}, 
		data() {
			return {
				radio: 1
			}
		},
		created() {
			this.init();
		},
		
		  computed: {
			 
		 }, 
		methods: {

			next(){
				if(this.radio==1){
					//激活可能流失的用户
					this.$router.push('/card/putInNotOrdersByMonth'); 
				}else if(this.radio==2){
					//激活关注未下单用户
					this.$router.push('/card/putInLoginNotOrders'); 
				}else if(this.radio==3){
					//回馈热度较高的用户
					this.$router.push('/card/putInWhileHeatHighKh'); 
				}else if(this.radio==4){
					//回馈忠诚用户
					this.$router.push('/card/putInLoyaltyKh'); 
				}else if(this.radio==5){
					//自定义投放范围
					this.$router.push('/card/putInCustom'); 
				}else if(this.radio==6){
					//查询投放记录
					this.$router.push('/card/putInSelLog'); 
				}
			
			},
			init(){
			},
		}
	}
</script>

<style scoped>
	.market-padding{
		padding: 0 0 0px 20px;
	}
	.market-background{
		background-color: white;
		padding: 0.1px 0px 0px 20px;
		height: calc(100% - 60px);
	}
	
	.subtitle{
		padding-left: 23px;
		color: #999999;
	}
	
</style>