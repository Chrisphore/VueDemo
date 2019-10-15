<template>
	<div>
		<div class="con-area clear"  v-for="(item,index) in listtag" :key="index">
			<h5 class="title">{{item.name}}</h5>
			<li class="ng-scope" @click="toPage(data.menuCode)"  v-for="(data,index1) in item.children" :key="index1">
				<i class="icon-analysis pssDetail"></i>
				<div class="ng-binding">{{data.menuName}}</div>
			</li>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				listtag:[{id:0,name:'报表与分析',children:[]}],
				listdata: null
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				let that = this;
				
				this.get("/common/dic/list", 1, {dictionaryTypeId: 17}).then(res => {
					res.data.forEach(row => {
						row.children = [];
						that.listtag.push(row);
					});
					that.get("/common/pubTableConfig/list", 1,{tableType:1}).then(list => {
						// that.listdata = list.data;
						
						that.listtag.forEach(type => {
							list.data.forEach(row => {
								if(row.tableLabelId > 0)
								{
									// console.log(row.tableLabelId)
									if(row.tableLabelId.toString() === type.dictionaryCode)
									{
										type.children.push(row);
									}
								}else
								{
									if(type.id == 0)
									{
										type.children.push(row);
									}
								}
							});
						});
						// console.log(that.listtag);
					});
						
				});
			},
			toPage(menuCode){
				let url = "/report/query/"+menuCode;
				this.$router.push(url);
			}
		}
	}
</script>

<style scoped="scoped">
	
	.title{
		margin: 30px 0 5px 30px;
		font-size: 12px;
		color: #171919;
		font-weight: normal;
	}
	
	.con-area{
		width: 90%;
		margin-left: 20px;
		font-size: 14px;
		float: left;
	}
	
	.con-area > li{
		
		display: flex;
		-webkit-flex-flow: row;
		justify-content: flex-start;
		width: 260px;
		height: 50px;
		
		float: left;
		align-items: center;
		border: 2px solid transparent;
		margin: 13px 10px;
		background-color: #fff;
		border-radius: 4px;
		cursor: pointer;
		position: relative;
	}
	
	.icon-analysis {
		margin-left: 40px;
		margin-right: 20px;
		display: inline-block;
		height: 20px;
		width: 20px;
		background: url(../../assets/img/sprite_layer2_relate.png) no-repeat;
	}
	
	.icon-analysis.NotMovingQuery {
		background-position: -60px 0;
	}
</style>