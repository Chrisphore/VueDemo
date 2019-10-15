<template>
	<div id="app">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data(){
			return{
				isRouterAlive:true
			}
		},
		methods:{
			reload(){
				this.isRouterAlive = false;
				this.$nextTick(function(){
					this.isRouterAlive = true;
				})
			}
		},
		watch: {
		    '$route' (to, from) {
// 				if(to.path.indexOf("/order/orderlist") > -1)
// 				{
// 					this.reload();
// 				}
			}
		},
	}
</script>
