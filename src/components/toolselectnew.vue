<template>
	<el-select v-model="values" clearable style="width:100%;" @visible-change="visiblechange">
		<template v-if="type==2 || type==3 || type==4 || type==5">
			<el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id">
			</el-option>

		</template>
		<template v-else>
			<el-option v-for="item in items" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</template>
	</el-select>
</template>

<script>
	import API from "@/api/base";
	import member from "@/api/member";
	import basic from "@/api/basic";
	export default {
		props: ['arg', 'default', 'type'],
		data() {
			return {
				items: null,
				values: ""
			};
		},
		watch: {
			type: function(newVal) {
				this.values = "";
				this.items = [];
			},
			default: function(newVal,oldVal) {
				if(newVal > -1)
				{
					this.values = newVal;
				}
			}
		},
		created() {
			this.values = "";
			this.init();
		},
		methods: {
			visiblechange(a) {
				if (a) {
					this.init();
				}
			},
			init() {
				//加载状态数据源
				var that = this;
				switch (that.type) {
					case "1": //商城字典表
						var p = {
							keyword: that.arg
						};
						API.getdictlist(p).then(function(res) {
							if (res.meta.success) {
								that.items = res.data;
							} else {
								console.log("获取失败");
							}
						});
						break;
					case "13": //会员分组
						var p = {
							keyword: that.arg
						};
						member.getmembergroup(p).then(function(res) {
							if (res.meta.success) {
								that.items = res.data;
							} else {
								console.log("获取失败");
							}
						});
						break;
					case "3": //仓库列表
						var p = {
							status: that.arg
						};
						member.getmemberstore(p).then(function(res) {
							if (res.meta.success) {
								that.items = res.data;
							} else {
								console.log("获取失败");
							}
						});
						break;
					case "6": //品牌列表
						basic.brand("LIST", "").then(function(res) {
							if (res.meta.success) {
								that.items = res.data;
							} else {
								console.log("获取失败");
							}
						});
						break;
					case "5": //员工列表
						API.getemployeelist("").then(function(res) {
							if (res.meta.success) {
								that.items = res.data.list;
							} else {
								console.log("获取失败");
							}
						});
						break;
					case "10": // 客户信息
						API.getcustomerlist({
							status: 1
						}).then(function(res) {
							if (res.meta.success) {
								that.items = res.data;
							} else {
								console.log("获取失败");
							}
						});
						break;
					case "12": // 机构信息
						API.getauthorganizationlist("").then(function(res) {
							if (res.meta.success) {
								that.items = res.data;
							} else {
								console.log("获取失败");
							}
						});
						break;
					default:
						//加载状态数据源
						var that = this;
						this.get("/common/dic/list", 1, {
							dictionaryTypeId: this.type
						}).then(res => {
							if (res.meta.success) {
								that.items = [];
								res.data.forEach(row => {
										let it = {name:row.name,code:row.dictionaryCode};
										that.items.push(it);
								});
							} else {
								console.log("获取失败");
							}
						});

				}
			}
		}
	};
</script>
