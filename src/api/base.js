import * as API from '@/api'

export default {
  //获取数据库信息
  getDbname: params => {
    let dbname= "y16500629269"
    return dbname
      // return API.GET('/getDbname', params)
  },
  //获取商城字典信息
  getdictlist: params => {
    return API.GET('/basic/dict/list',1,params)
  },
	
	//批量设置获取字典信息
	updatedict: params => {
		return API.PATCH('/basic/dict/updateList',1,params)
	},
	
	//获取文件信息
	getfilelist: params => {
		return API.GET('/other/uploadFile/list',1,params)
	},
	
	//删除文件信息
	delfile: params => {
		return API.DELETE('/other/uploadFile',1,params)
	},
	
	//获取员工信息
	getemployeelist: params => {
		return API.GET('/basicData/allEmployeesInfo',2,params)
	},
	
	//获取客户端字典信息
	getdictionnarylist: params => {
		return API.GET('/basedata/dictionnary/list',2,params)
	},
	
	
	//通过父级和子级获取字典值
	getdictbypcode: params => {
		return API.GET('/basic/dict/listByPcodeAndCode', 1, params)
	},

	//获取客户信息
	getcustomerlist: params => {
		return API.GET('/basicData/customer/list',2,params)
	},
	
	//获取机构信息
	getauthorganizationlist: params => {
		return API.GET('/basicData/authorganization/list',2,params)
	},
	
}
