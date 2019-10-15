<template>
	<div>
		<el-row class="topsercah">
			<el-form :inline="true" class="el-form-class" :model="listQuery">
				<el-form-item :label="item.title" v-for="(item,index) in searchlist" :key="index">
					<el-date-picker  v-if="item.controlType == 'date'" type="date" v-model="listQuery[item.filedName]" value-format="yyyy-MM-dd"
					style="width: 100%;">
					</el-date-picker>
					
					<el-date-picker  v-else-if="item.controlType == 'year'" type="year" v-model="listQuery[item.filedName]" value-format="yyyy"
					style="width: 100%;">
					</el-date-picker>
					
					<select-list v-else-if="item.controlType === 'select'" :ref="item.filedName" :default="listQuery[item.filedName]" :type="item.dataSource"></select-list>
					
					<tool-scategorylist v-else-if="item.controlType === 'scategory'" :ref="item.filedName" :datatype="item.dataSource"></tool-scategorylist>
					
					<tool-checkbox v-else-if="item.controlType === 'checkbox'" :ref="item.filedName" :code="listQuery[item.filedName]" :type="item.dataSource"></tool-checkbox>
					
					<el-input v-else-if="item.controlType === 'goods'" :readonly="true" @focus="chosegoods" v-model="listQuery[item.filedName]"></el-input>
					
					<el-input v-else v-model="listQuery[item.filedName]" :placeholder="item.titleTip"></el-input>
					
				</el-form-item>
				
				<el-button type="info" v-on:click="search" plain class="queryBtn">查询</el-button>
			</el-form>
		</el-row>
		<serach-goods @checkgoods="checkgoods" :limit="1"></serach-goods>
	</div>
</template>

<script>
	import selectlist from "@/components/toolselectnew";
	import toolscategorylist from "@/components/toolscategorylist";
	import toolcheckbox from "@/components/toolcheckbox";
	import toolsearchgoods from "@/components/toolsearchgoods";
	import { mapState, mapActions } from "vuex";
	
	export default {
		props: {
			searchlist: Array
		},
		data() {
			return {
				listQuery: {
					keyword: ''
				},
			}
		},
		components: {
			"select-list": selectlist,
			"tool-scategorylist":toolscategorylist,
			"tool-checkbox":toolcheckbox,
			"serach-goods": toolsearchgoods
		},
		computed: {
			...mapState({
				params: state => state.toolslist.params
			})
		},
		methods: {
			search()
			{
				if(this.initSearch())
				{
					this.$parent.search();
				}
			},
			initSearch()
			{
				let isSearch = true;
				this.searchlist.forEach(row => {
					if(row.controlType === 'select' || row.controlType === 'scategory' || row.controlType === 'checkbox')
					{
						if(this.$refs[row.filedName][0].values != undefined)
						{
							// console.log(row.filedName+":"+this.$refs[row.filedName][0].values);
							this.listQuery[row.filedName] =  this.$refs[row.filedName][0].values;
						}
						if(row.controlType === 'select')
						{
							if(this.listQuery[row.filedName].length == 0)
							{
								this.listQuery[row.filedName] = -1;
							}
						}else if(row.controlType === 'checkbox')
						{
							if(this.listQuery[row.filedName].length == 0)
							{
								this.$message({
									message: "复选框的条件必须选择一个!",
									type: "warning"
								});
								isSearch = false;
							}
						}
					}
				});
				return isSearch;
			},
			chosegoods() {
				this.$set(this.params, "goodsshow", true);
			},
			checkgoods(ids) {
				this.searchlist.forEach(row => {
					if(row.controlType === 'goods')
					{
						this.listQuery[row.filedName] = ids;
					}
				});
			}
		}
	}
</script>
