import * as API from '@/api'

export default {

	//商品发布列表
	release(operation, params) {
		let url = "/goods/release";
		return API.getResult(operation, url, 1, params);
	},

	//未发布商品列表
	notRelease: params => {
		return API.GET('/goods/release/notReleasePage', 1, params)
	},

	//商品上下架
	updateStatus: params => {
		return API.GET('/goods/release/updateStatus', 1, params);
	},

	//商品分类发布列表
	typeRelease(operation, params, method) {
		let url = "/goods/typeRelease" + method;
		return API.getResult(operation, url, 1, params);
	},

	//商品分类列表
	typeGoods(operation, params) {
		let url = "/goods/typeRelease/goodsType";
		return API.getResult(operation, url, 1, params);
	},
	//获取所有类型分类
	getAllType(params) {
		return API.GET('/other/type/list', 1, params)
	},


	//商品评论列表
	commentGoods: params => {
		return API.GET('/goods/comment/listPageByGoodsId', 1, params);
	},

	//商品评论显示
	commentStatus: params => {
		return API.GET('/goods/comment/updateByStatus', 1, params);
	},
}