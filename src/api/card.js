import * as API from '@/api'

export default {

	//卡券方案列表(常规)
	plan(operation, params) {
		let url = "/card/plan";
		return API.getResult(operation,url,1,params);
	},
	//卡券方案-特殊接口
	planBackUp(operation,params) {
		let url = "/card/plan";
		return API.getResult("GET",url+operation, 1, params);
	},
	//卡券指定商品列表
	plangoods(operation, params) {
		let url = "/goods/release";
		return API.getResult(operation,url,1,params);
	},
	//卡券精准投放(常规接口用)
	putIn(operation, params) {
		let url = "/card/log";
		return API.getResult(operation,url,1,params);
	},
	//卡券精准投放-(特殊接口用(回馈忠诚客户;查询投放记录;))
	log(operation,params) {
		let url = "/card/log";
		return API.getResult("GET",url+operation, 1, params);
	},
	//卡券领取-(特殊接口用(领取卡券二维码))
	planDetail(operation,params) {
		let url = "/card/detail";
		return API.getResult("GET",url+operation, 1, params);
	}
	
	
	
	
	
	
	
}
