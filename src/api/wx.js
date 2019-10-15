import * as API from '@/api'

export default {
 //微信配置字典
 wxconfig(operation, params) {
 	let url = "/wx/config";
 	return API.getResult(operation,url,1,params);
 },
 //微信菜单
 wxmenu(operation, params){
	 let url = "/wx/menu";
	 return API.getResult(operation, url, 1, params);
 },
 //保存自设菜单
 savewxmenu(operation, params){
	 let url = "/wx/menu/saveMenu";
	 return API.getResult(operation, url, 1, params);
 },
 //一键创建标准菜单
 createmenu(operation, params){
	 let url = "/wx/menu/createMenu";
	 return API.getResult(operation, url, 1, params);
 },
 //上传文件
 uploadfile(operation, params)
 {
	let url = "/wx/config/uploadVailFile";
	return API.getResult(operation, url, 1, params);
 }
 
}
