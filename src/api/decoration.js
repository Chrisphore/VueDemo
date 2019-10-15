import * as API from '@/api'
export default {
    //获取首页楼层明细
    getplandetailist: params => {
        return API.GET('/basic/planDetail/list', 1, params)
    },
    getplanmodelbyid: params => {
        return API.GET('/basic/planDetail/' + params.id, 1)
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
    //获取楼层分类
    getplandetailbyid: params => {
        return API.GET('/basic/planDetail/getTypeGoods', 1, params)
    },
    //获取分类商品
    getplandetailgoodsbyid: params => {
        return API.GET('/basic/planDetail/getGoodsByType', 1, params)
    },
    //获取楼层区域明细
    getplanareadetail: params => {
        return API.GET('/basic/planDetail/areaSet', 1, params)
    },
    //获取楼层区域明细
    getgoodsdetail: params => {
        return API.GET('/goods/mallGoods/' + params.id, 1)
    },
    //获取楼层区域明细
    setfloorstyle: params => {
        return API.POST('/basic/planDetail/savePlanDetail', 1, params)
    },
    deletefloorbyid: params => {
        return API.DELETE('/basic/planDetail', 1, params)
    },
    //获取畅销分类
    getselltypelist: params => {
        return API.GET('/basic/sellType/list', 1, params);
    },
    //获取畅销分类明细
    getselltypedetailbyid: params => {
        return API.GET('/basic/sellType/' + params.id, 1);
    },
    updateselltypebyid: params => {
        return API.PATCH('/basic/sellType', 1, params)
    },
    deleteselltypebyid: params => {
        return API.DELETE('/basic/sellType', 1, params)
    },
    //获取畅销商品列表
    getsellgoodslist: params => {
        return API.GET('/basic/sellGoods/page', 1, params)
    },
    //新增畅销分类商品
    addsellgoods: params => {
        return API.GET('/basic/sellGoods', 1, params)
    },
    //新增畅销分类商品
   deletesellgoods: params => {
        return API.DELETE('/basic/sellGoods', 1, params)
    }
}