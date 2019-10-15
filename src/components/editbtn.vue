<template>
	<el-row class="btn">
		<el-col class="el-col-sty m-view">
			<button class="m-btn-group" v-on:click="redirtUrl()" round>
				<i class="u-icon fa fa-back s-blue"></i><span>返回</span>
			</button>
			<button class="m-btn-group" v-on:click="onSubmit()" round>
				<i class="u-icon fa fa-edit s-green"> </i><span>保存</span>
			</button>
		</el-col>
	</el-row>
</template>
<script>
	export default {
		props: ["listPage"],
		methods: {
			redirtUrl(index) {
				this.$router.push(this.listPage);
			},
			onSubmit() {
				
				this.$emit('submit',''); 
			}
		}
	};
</script>