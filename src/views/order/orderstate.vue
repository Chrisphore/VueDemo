<template>
	<tool-menu :menulist="menudata"></tool-menu>
</template>

<script>
	import toolsmenu from "@/components/toolsmenu";
	import order from '@/api/order';

	export default {
		components: {
			"tool-menu": toolsmenu
		},
		data() {
			return {
				menudata: [{
					name: "全部",
					isactive: false,
					path: "/order/orderlist/-2",
					menuId: -1,
				}]
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				order.status("").then(res => {
					for (var i = 0; i < res.data.length; i++) {
						let menu = {
							"name": res.data[i].name,
							"isactive": false,
							"path": "/order/orderlist/" + res.data[i].code,
							"menuId": res.data[i].code,
						};
						this.menudata.push(menu);
					}
				});
			},
		}
	};
</script>
