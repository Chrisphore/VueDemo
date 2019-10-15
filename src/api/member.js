import * as API from '@/api'
export default {
  //获取会员列表
  getmemberlist: params => {
    return API.GET('/member/info/list', 1, params)
  },
  //获取会员分组
  getmembergroup: params => {
    return API.GET('/member/group/list', 1, params)
  },
  //获取会员申请信息
  getmemberapply: params => {
    return API.GET('/member/apply/page', 1, params)
  },
  //获取会员仓库
  getmemberstore: params => {
    return API.GET('/basicData/organizationInfo', 2, params)
  },
  //根据id获取会员信息
  getmemberapplyinfo: params => {
    return API.GET('/member/apply/' + params.id, 1)
  },
  //获取客户档案列表
  getcustomerlist: params => {
    return API.GET('/basicData/customer/list', 2, params)
  },
  //审核商城会员
  auditmember: params => {
    return API.GET('/member/apply/check', 1, params)
  },
  //拒绝商城会员申请
  refusememberapply: params => {
    return API.GET('/member/apply/refused', 1, params);
  },
  //获取正式会员信息
  getmemberinfolist: params => {
    return API.GET('/member/info/page', 1, params);
  },
  //设置会员登录状态
  setmemberinfostu: params => {
    return API.GET('/member/info/updateStatus', 1, params);
  },
  //通过id获取正式会员详细信息
  getmemberinfobyid: params => {
    return API.GET('/member/info/' + params.id, 1);
  },
  //获取用户发布列表
  getcoustormlist: params => {
    return API.GET('/member/info/khPageList', 1, params);
  },
  //根据id获取客户档案信息
  getcoustorminfobyid: params => {
    return API.GET('/member/info/getKhByKhid/' + params.id, 1);
  }, 
  //根据id获取客户登陆日志
  getmemberlogbyid: params => {
    return API.GET('/count/visitorLog/page', 1,params);
  },   
  //根据id获取收藏商品
  getmembercollectbyid: params => {
    return API.GET('/member/collect/getListByMember', 1,params);
  },     
  //发布用户
  setcoustormrelease: params => {
    return API.POST('/member/info/saveCustomer', 1, params);
  },
  //更新会员信息
  updatememberinfobyid: params => {
    return API.POST('/member/info/update', 1, params);
  },
  //获取会员分组明细
  getgroupdetail: params => {
    return API.GET('/member/groupDetail/page', 1, params);
  },
  //会员分组
  group(operation, params) {
    let url = "/member/group";
    return API.getResult(operation, url, 1, params);
  },
  //会员分组明细
  groupdetail(operation, params) {
    let url = "/member/groupDetail";
    return API.getResult(operation, url, 1, params);
  },
  //保存会员明细
  addgroupdetail(operation, params) {
    let url = "/member/groupDetail/batchSave";
    return API.getResult(operation, url, 1, params);
  },
	//获取会员分组排除商品列表
	goodsremove(operation, url, params){
		return API.getResult(operation, url, 1, params);
	},
	//获取会员选择列表
	getmemberselectlist: params => {
		return API.GET('/member/groupDetail/memberList', 1, params);
	}
}