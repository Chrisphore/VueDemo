import * as API from '@/api'

export default {
	
	//订单列表
	orders(operation, params) {
		let url = "/goods/orders";
		return API.getResult(operation,url,1,params);
	},
	
	//订单详情
	getIdAll(params) {
		return API.GET("/goods/orders/all/"+params, 1, params);
	},
	
	//订单详情修改
	detail(operation, params) {
		let url = "/goods/ordersDetail";
		return API.getResult(operation,url,1,params);
	},
	
	//订单状态列表
	status: params => {
		return API.GET('/goods/orders/status',1,params)
	},
	
	//查询可以合并订单
	queryMerge: params => {
		return API.GET('/goods/orders/queryMerge',1,params)
	},
	
	//合并订单
	merge: params => {
		return API.GET('/goods/orders/merge',1,params)
	},
	
	
	//更改订单状态
	updateStatus: params => {
		return API.PATCH('/goods/orders/updateStatus',1,params)
	},
}