import * as API from '@/api'

export default {
	//广告列表
	advertising(operation, params) {
		let url = "/basic/advertising";
		return API.getResult(operation,url,1,params);
	},
	//商城数据字典表
	dict(operation, params) {
		let url = "/basic/dict";
		return API.getResult(operation,url,1,params);
	},
	//系统公告(根据名称分页查找商城数据字典表列表)
	dictNotice(operation,params) {
		let url = "/basic/dict";
		return API.getResult("GET",url+operation, 1, params);
	},
	//品牌列表
	brand(operation, params) {
		let url = "/goods/goodsBrand";
		return API.getResult(operation,url,1,params);
	},
	//友情链接列表
	links(operation, params) {
		let url = "/basic/links";
		return API.getResult(operation,url,1,params);
	},
	//配置表
	config(operation, params) {
		let url = "/common/pubTableConfig";
		return API.getResult(operation,url,1,params);
	},
	//文章明细列表
	articledetail(operation, params){
		let url = "/basic/articleDetail";
		return API.getResult(operation, url, 1, params);
	},
	//文章分类
	articlecattree(operation, params){
		let url = "/basic/articlecat/tree";
		return API.getResult(operation, url, 1, params);
	},
	articlecat(operation, params){
		let url = "/basic/articlecat";
		return API.getResult(operation, url, 1, params);
	},
	articlecatfind(operation, params){
		let url = "/basic/articlecat/findTwoLevel";
		return API.getResult(operation, url, 1, params);
	},
	//商城导航菜单
	menu(operation, params){
		let url = "/basic/menu";
		return API.getResult(operation, url, 1, params);
	}
}
