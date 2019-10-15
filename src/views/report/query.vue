<template>
	<div class="zscy-list-container">
		<div ref="head">
			<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
			<search-data ref="search" :searchlist="searchlist"></search-data>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas">
					<list-data :columndata="columndatas" :issum="true" :bindata="listdata" :headHeight="headHeight"></list-data>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import list from '@/components/list'
	import search from '@/components/toolsearch'
	import toolsbtncustom from '@/components/toolsbtncustom';
	
	export default {
		components: {
			'list-data': list,
			'search-data':search,
			'btn-custom': toolsbtncustom
		},
		data() {
			return {
				columndatas: [],
				listdata: null,
				headHeight:0,
				searchlist:[],
				custombtn:[
					{ name: '返回',icoName:"back s-blue",fnHandler: 'return_click("/report/reportlist")'},
					{ name: '导出excel',icoName:"export s-green",fnHandler: '$parent.export_click()'},
					{ name: '打印',icoName:"export s-green",fnHandler: '$parent.print_click()'},
				],
				isCustomHeadr:1
			}
		},
		mounted() {
			this.headHeight = 200;
			this.init();
		},
		methods: {
			init() {
				let that = this;
				that.$refs.search.listQuery.keyword = this.$route.params.menuCode;
				this.get("/common/pubTableConfigQuery/search", 1,that.$refs.search.listQuery).then(res => {
					let query = new Object();
					query.keyword = that.$refs.search.listQuery.keyword;
					res.data.listSearch.forEach(row => {
						query[row.filedName] = "";
						if(row.controlType === 'date')
						{
							query[row.filedName] = that.getNowFormatDate(row.defaultValue);
						}else if(row.controlType === 'year')
						{
							var dateYear = new Date();
							query[row.filedName] = dateYear.getFullYear().toString();
						}else{
							query[row.filedName] = row.defaultValue;
						}
					});
					that.$refs.search.listQuery = query;
					that.searchlist = res.data.listSearch;
					that.isCustomHeadr = res.data.isCustomHeadr;
					if(res.data.isCustomHeadr === 1)
					{
						this.columndatas = [];
						
						res.data.listDetail.forEach(row => {
							let column = {label: row.headerName,prop: row.field,align: 'center',id:row.id,parentId:row.parentId};
							that.columndatas.push(column);
						});
						that.columndatas = that.toTree(that.columndatas, "parentId", "id", 0);
					}
					
					that.post("/common/pubTableConfigQuery/list", 1,that.$refs.search.listQuery).then(res1 => {
						if(res.data.isCustomHeadr === 0)
						{
							this.columndatas = [];
							let map =  res1.data[0];
							for(var k in map){
								let len = 100;
								if(map[k] != null)
								{
									len = map[k].length*6;
									if(len < 100)
									{
										len = 100;
									}
								}
								let column = {label: k,prop: k,align: 'center',width:len}
								that.columndatas.push(column);
							}
						}
						this.headHeight = this.$refs.head.offsetHeight-30;
						that.listdata =  res1.data;
					});
				});
			},
			search(){
				let that = this;
				that.post("/common/pubTableConfigQuery/list", 1,that.$refs.search.listQuery).then(res1 => {
					if(that.isCustomHeadr === 0)
					{
						that.columndatas = [];
						let map =  res1.data[0];
						let isNum =false;
						let colums = [];
						for(var k in map){
							let len = 100;
							if(map[k] != null)
							{
								len = map[k].length*6;
								if(len < 100)
								{
									len = 100;
								}
							}
							let column = {label: k,prop: k,align: 'center',width:len};
							if(!isNaN(k)){
								isNum = true;
							}
							colums.push(column);
						}
						if(isNum)
						{
							for(let i=colums.length-1;i>=0;i--)
							{
								if(isNaN(colums[i].label))
								{
									that.columndatas.splice(0,0,colums[i]);
								}
							}
							for(let i=0;i<colums.length;i++)
							{
								if(!isNaN(colums[i].label))
								{
									that.columndatas.push(colums[i]);
								}
							}
						}else{
							that.columndatas = colums;
						}
					}
					that.listdata =  res1.data;
				});
			},
			getNowFormatDate:function (day) {
				var date = new Date();
				date.setDate(date.getDate() - day);
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			},
			export_click:function(){
				if(this.$refs.search.initSearch())
				{
					this.post("/common/pubTableConfigQuery/excel", 1,this.$refs.search.listQuery).then(res => {
						this.location("/common/pubTableConfigQuery/uploadExcel",1,"?filePath="+res.data);
					});
				}
			},
			print_click:function(){
				var option = {
					report: "http://szbucket-1251289569.cosgz.myqcloud.com/Upload/grf/2018/5/20180529/201805291000-outNoteShudanjin.grf",
					data: ""
				}
				this.webapp_start(option);
			},
			//创建启动WEB报表客户端的URL协议参数
			webapp_href:function (opt) {
				return "grwebapp://" + (JSON ? JSON.stringify(opt) : $.stringify(opt))
			},
			//应用URL协议启动WEB报表客户端程序，根据参数 option 调用对应的功能
			webapp_start:function(option) {
				window.location.href = this.webapp_href(option);
			}
		},
		activated:function(){
			this.columndatas = [];
			this.listdata = [];
			this.init();
		}
	}
</script>
