import * as API from '@/api'
export default {
    //获取秒杀列表
    getseckilllist: params => {
        return API.GET('/activity/seckill/page', 1, params)
    },
    //获取秒杀活动明细
    getseckilldetailbyid: params => {
        return API.GET('/activity/seckill/' + params.id, 1)
    },
    //新增秒杀活动
    addseckill: params => {
        return API.POST('/activity/seckill', 1, params)
    },
    //更新秒杀活动信息
    updateseckill: params => {
        return API.PATCH('/activity/seckill', 1, params)
    },
    //删除秒杀活动信息
    deleteseckill: params => {
        return API.DELETE('/activity/seckill', 1, params)
    },
    //更新秒杀活动状态
    updateseckillstatus: params => {
        return API.GET('/activity/seckill/updateState', 1, params)
    },
    //获取秒杀活动二维码
    getseckillimg: params => {
        return API.GET('/activity/seckill/qrcode/' + params.id, 1)
    },
    //获取秒杀队列详情
    getseckillqueuedetail: params => {
        return API.GET('/activity/queue/page', 1,params)
    },
    //获取商品档案
    getgoodsunitbyid: params => {
        return API.GET('/goods/release/goodsUnit/' + params.id, 1);
    }

}